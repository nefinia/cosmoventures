const LS_LANG   = "wikiwander_lang_v1";
const LS_SAVED  = "wikiwander_saved_v2";
const LS_RECENT = "wikiwander_recent_v2";
const LS_CHOICE = "wikiwander_choice_v2";
const LS_CUSTOM_QUERY = "wikiwander_custom_query_v1";

const el = (id) => document.getElementById(id);
const store = {
  get(k){ try { return localStorage.getItem(k); } catch { return null; } },
  set(k,v){ try { localStorage.setItem(k,v); } catch {} }
};
const t = (key) => (I18N[state.lang] && I18N[state.lang][key]) || I18N.en[key] || key;

const state = {
  lang: "en",
  choice: "random",
  customQuery: "",
  current: null,
  history: [],
  saved: [],
  recentTitles: [],
  isLoading: false,
  gen: 0,
  again: false,

  // Prefetch
  queue: [],
  prefetching: false,
  targetQueue: 4,
};

/* ---------- Language ---------- */
function applyLanguage(lang){
  if (!I18N[lang]) lang = "en";
  state.lang = lang;
  store.set(LS_LANG, lang);
  el("app").lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(node=>{
    const key = node.getAttribute("data-i18n");
    const v = I18N[lang][key];
    if (typeof v === "string") node.textContent = v;
  });

  // custom input strings
  el("customInput").placeholder = I18N[lang].customPlaceholder;
  el("customInput").setAttribute("aria-label", I18N[lang].customLabel);
  el("customApply").textContent = I18N[lang].customApply;
  el("customCancel").textContent = I18N[lang].customCancel;

  document.querySelectorAll(".lang-btn").forEach(btn=>{
    btn.classList.toggle("active", btn.dataset.lang === lang);
    btn.setAttribute("aria-pressed", String(btn.dataset.lang === lang));
  });

  renderChips();
  updateSaveButtonState();
  if (!state.current && !state.isLoading) setStatus(t("loading"));

  // Switch Wikipedia source: clear queue + reload content in the new language
  state.gen++;
  state.queue = [];
  state.history = [];
  next();
}

/* ---------- Wikipedia base ---------- */
function wikiBase(){
  // allow EN/ES/FR/DE
  const allowed = new Set(["en","es","fr","de"]);
  const lang = allowed.has(state.lang) ? state.lang : "en";
  return `https://${lang}.wikipedia.org`;
}

/* ---------- Helpers ---------- */
function escapeHtml(s){
  return String(s)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function loadLocal(){
  try { state.saved = JSON.parse(store.get(LS_SAVED) || "[]"); } catch { state.saved = []; }
  try { state.recentTitles = JSON.parse(store.get(LS_RECENT) || "[]"); } catch { state.recentTitles = []; }
  const c = store.get(LS_CHOICE);
  if (c && TOPICS.some(x => x.key === c)) state.choice = c;

  const lang = store.get(LS_LANG);
  if (lang && I18N[lang]) state.lang = lang;

  state.customQuery = store.get(LS_CUSTOM_QUERY) || "";
}

function saveLocal(){
  store.set(LS_SAVED, JSON.stringify(state.saved.slice(0, 1000)));
  store.set(LS_RECENT, JSON.stringify(state.recentTitles.slice(0, 500)));
  store.set(LS_CHOICE, state.choice);
  store.set(LS_CUSTOM_QUERY, state.customQuery || "");
}

function setStatus(text, isErr=false){
  const s = el("statusText");
  s.textContent = text;
  s.classList.toggle("err", !!isErr);
  el("savedCount").textContent = String(state.saved.length);
}

function setButtonsEnabled(enabled){
  el("back").disabled = !(enabled && state.history.length > 0);
  el("next").disabled = !enabled;
  el("open").disabled = !enabled;
  el("save").disabled = !enabled;
}

function setImage(url){
  const img = el("img");
  const media = el("media");
  if (url){
    img.src = url;
    media.hidden = false;
  } else {
    img.removeAttribute("src");
    media.hidden = true;
  }
}

/* ---------- Topics ---------- */
const TOPICS = [
  { key:"random",  label:{en:"Random", es:"Aleatorio", fr:"Aléatoire", de:"Zufall"}, query:null },
  { key:"space",   label:{en:"Astronomy", es:"Astronomía", fr:"Astronomie", de:"Astronomie"}, query:"astronomy OR astrophysics OR galaxy OR cosmology -astrology" },
  { key:"mind",    label:{en:"Mind", es:"Mente", fr:"Esprit", de:"Geist"}, query:"psychology OR neuroscience OR cognition" },
  { key:"history", label:{en:"History", es:"Historia", fr:"Histoire", de:"Geschichte"}, query:"history OR ancient OR medieval OR revolution" },
  { key:"philo",   label:{en:"Philosophy", es:"Filosofía", fr:"Philosophie", de:"Philosophie"}, query:"philosophy OR ethics OR metaphysics OR epistemology" },
  { key:"bio",     label:{en:"Biology", es:"Biología", fr:"Biologie", de:"Biologie"}, query:"biology OR evolution OR genetics OR ecology" },
  { key:"tech",    label:{en:"Tech", es:"Tecnología", fr:"Tech", de:"Technik"}, query:"computer science OR software OR algorithm OR engineering" },
  { key:"art",     label:{en:"Arts", es:"Artes", fr:"Arts", de:"Kunst"}, query:"art OR music OR literature OR cinema" },
  { key:"geo",     label:{en:"Earth", es:"Tierra", fr:"Terre", de:"Erde"}, query:"geology OR climate OR ocean OR volcano" },

  // user-defined search
  { key:"custom",  label:{en:"Custom", es:"Personal", fr:"Perso", de:"Eigene"}, query:"__CUSTOM__" },
];

function topicLabel(t){
  const L = t.label || {};
  return L[state.lang] || L.en || "Random";
}

function renderChips(){
  const row = el("chipRow");
  row.innerHTML = "";

  for (const t of TOPICS){
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip" + (state.choice === t.key ? " active" : "");
    chip.setAttribute("aria-pressed", String(state.choice === t.key));
    chip.textContent = topicLabel(t);
    chip.onclick = () => onTopicChange(t.key);
    row.appendChild(chip);
  }

  const current = TOPICS.find(t => t.key === state.choice) || TOPICS[0];
  const label = topicLabel(current);
  el("tag").textContent = label;

  // show/hide custom bar
  const showCustom = (current.key === "custom");
  el("customWrap").classList.toggle("show", showCustom);
  if (showCustom){
    el("customInput").value = state.customQuery || "";
    // focus only if user intentionally clicked custom (we’ll focus in onTopicChange too)
  }
}

/* ---------- Saved list ---------- */
function renderSaved(){
  const list = el("savedList");
  const empty = el("savedEmpty");

  if (!state.saved.length){
    empty.style.display = "";
    list.style.display = "none";
    list.innerHTML = "";
    return;
  }

  empty.style.display = "none";
  list.style.display = "";
  list.innerHTML = state.saved
    .slice(0, 40)
    .map(item => `<li><a href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.title)}</a></li>`)
    .join("");
}

function updateSaveButtonState(){
  const btn = el("save");
  const c = state.current;
  if (!c){ btn.classList.remove("saved"); btn.setAttribute("aria-pressed","false"); el("saveLabel").textContent = t("save"); el("saveStar").textContent = "☆"; return; }
  const isSaved = state.saved.some(x => x.url === c.url);
  btn.classList.toggle("saved", isSaved);
  btn.setAttribute("aria-pressed", String(isSaved));
  el("saveLabel").textContent = isSaved ? t("savedMsg") : t("save");
  el("saveStar").textContent = isSaved ? "★" : "☆";
}

/* ---------- Excerpt ---------- */
function leadParagraph(text){
  if (!text) return "";
  return text
    .split(/\n{2,}/g)
    .map(p => p.trim())
    .filter(Boolean)[0] || text.trim();
}

function clampWords(text, maxWords){
  const words = (text || "").trim().split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return (text || "").trim();
  return words.slice(0, maxWords).join(" ") + "…";
}

function adaptiveMaxWords(){
  const w = window.innerWidth;
  if (w < 420) return 120;
  if (w < 600) return 150;
  if (w < 900) return 180;
  return 210;
}

function adaptiveExcerpt(text){
  return clampWords(leadParagraph(text), adaptiveMaxWords());
}

window.addEventListener("resize", () => {
  if (state.current && el("card").dataset.state === "ready") el("concept").textContent = adaptiveExcerpt(state.current.extract);
});

/* ---------- De-dupe ---------- */
function rememberTitle(title){
  if (!title) return;
  state.recentTitles.unshift(title);
  state.recentTitles = [...new Set(state.recentTitles)].slice(0, 500);
  saveLocal();
}

/* ---------- Networking ---------- */
const FETCH_TIMEOUT_MS = 9000;
const MAX_ATTEMPTS = 30;
const MAX_NET_ERRORS = 3;
const BACKOFF_BASE_MS = 120;

async function fetchWithTimeout(url, options={}){
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try{
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(t);
  }
}

async function jsonOrThrow(res){
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return await res.json();
}

function isBadSummary(s){
  if (!s) return true;
  if (s.type === "disambiguation") return true;
  const t = s.title || "";
  if (/^(Category:|Help:|Wikipedia:|Template:|File:|Portal:|Draft:|Special:)/i.test(t)) return true;
  if (!s.extract) return true;
  return false;
}

async function fetchRandomTitle(){
  const url = new URL(`${wikiBase()}/w/api.php`);
  url.searchParams.set("action","query");
  url.searchParams.set("list","random");
  url.searchParams.set("rnnamespace","0");
  url.searchParams.set("rnlimit","1");
  url.searchParams.set("format","json");
  url.searchParams.set("origin","*");
  const res = await fetchWithTimeout(url.toString());
  const j = await jsonOrThrow(res);
  return j?.query?.random?.[0]?.title || null;
}

async function fetchSummaryByTitle(title){
  const url = `${wikiBase()}/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await fetchWithTimeout(url, { headers: { "accept":"application/json" }});
  return await jsonOrThrow(res);
}

async function searchTotalHits(query){
  const url = new URL(`${wikiBase()}/w/api.php`);
  url.searchParams.set("action","query");
  url.searchParams.set("list","search");
  url.searchParams.set("srsearch", query);
  url.searchParams.set("srnamespace","0");
  url.searchParams.set("srlimit","1");
  url.searchParams.set("format","json");
  url.searchParams.set("origin","*");
  const res = await fetchWithTimeout(url.toString());
  const j = await jsonOrThrow(res);
  return j?.query?.searchinfo?.totalhits || 0;
}

async function searchTitles(query, offset, limit=30){
  const url = new URL(`${wikiBase()}/w/api.php`);
  url.searchParams.set("action","query");
  url.searchParams.set("list","search");
  url.searchParams.set("srsearch", query);
  url.searchParams.set("srnamespace","0");
  url.searchParams.set("srlimit", String(limit));
  url.searchParams.set("sroffset", String(offset));
  url.searchParams.set("format","json");
  url.searchParams.set("origin","*");
  const res = await fetchWithTimeout(url.toString());
  const j = await jsonOrThrow(res);
  return (j?.query?.search || []).map(x => x.title);
}

async function makeCardFromSummary(summary){
  const title = summary.title;
  const url = summary?.content_urls?.desktop?.page || `${wikiBase()}/wiki/${encodeURIComponent(title)}`;
  const imageUrl = summary?.thumbnail?.source || summary?.originalimage?.source || null;
  return { title, extract: summary.extract, url, imageUrl, ts:new Date().toISOString() };
}

async function getNextCard(){
  const topic = TOPICS.find(t => t.key === state.choice) || TOPICS[0];

  let netErrors = 0;
  for (let attempt=0; attempt<MAX_ATTEMPTS; attempt++){
    try{
      let title = null;

      if (topic.key === "random" || !topic.query){
        title = await fetchRandomTitle();
      } else {
        const query = (topic.query === "__CUSTOM__") ? (state.customQuery || "").trim() : topic.query;

        if (topic.key === "custom" && !query){
          const err = new Error(t("customNeedsQuery"));
          err.code = "EMPTY_CUSTOM";
          throw err;
        }

        const total = await searchTotalHits(query);
        const cap = Math.min(total, 5000);
        const offset = cap > 0 ? Math.floor(Math.random() * cap) : 0;
        const titles = await searchTitles(query, offset, 30);
        title = titles.length ? titles[Math.floor(Math.random() * titles.length)] : await fetchRandomTitle();
      }

      if (!title) continue;
      if (state.recentTitles.includes(title)) continue;

      const s = await fetchSummaryByTitle(title);
      if (isBadSummary(s)) continue;

      const card = await makeCardFromSummary(s);
      rememberTitle(card.title);
      return card;

    } catch (e){
      // for custom empty query, rethrow immediately
      if (e && e.code === "EMPTY_CUSTOM") throw e;
      if (++netErrors >= MAX_NET_ERRORS){
        const err = new Error("unreachable");
        err.code = "UNREACHABLE";
        throw err;
      }
      await new Promise(r => setTimeout(r, BACKOFF_BASE_MS + attempt * 18));
      continue;
    }
  }
  const err = new Error("nothing found");
  err.code = "UNREACHABLE";
  throw err;
}

/* ---------- Prefetch queue ---------- */
function prefetchImage(url){
  if (!url) return;
  const img = new Image();
  img.decoding = "async";
  img.loading = "eager";
  img.src = url;
}

async function fillQueue(){
  if (state.prefetching) return;
  state.prefetching = true;
  try{
    while (state.queue.length < state.targetQueue){
      const card = await getNextCard();
      state.queue.push(card);
      if (state.queue.length <= 2) prefetchImage(card.imageUrl);
    }
  } finally {
    state.prefetching = false;
  }
}

function refillQueueSoon(){
  setTimeout(() => fillQueue().catch(()=>{}), 0);
}

/* ---------- Render ---------- */
function setCardState(mode, message){
  const card = el("card");
  card.dataset.state = mode;               // ready | loading | error | empty
  card.setAttribute("aria-busy", String(mode === "loading"));
  el("retry").hidden = mode !== "error";
  el("errorText").textContent = mode === "error" || mode === "empty" ? (message || "") : "";
}

function renderCard(){
  const c = state.current;
  if (!c) return;

  el("title").textContent = c.title;
  el("concept").textContent = adaptiveExcerpt(c.extract);
  el("openLink").href = c.url;
  setImage(c.imageUrl);

  setCardState("ready");
  setButtonsEnabled(!state.isLoading);
  updateSaveButtonState();
  setStatus(t("ready"));
  refillQueueSoon();
}

/* ---------- Actions ---------- */
async function next(){
  if (state.isLoading){ state.again = true; return; }
  state.isLoading = true;
  const gen = state.gen;
  setButtonsEnabled(false);
  setStatus(t("loading"));
  setCardState("loading");

  el("title").textContent = t("loading");
  el("concept").textContent = t("fetching");
  el("openLink").removeAttribute("href");
  setImage(null);

  try{
    let card = state.queue.shift();
    if (!card) card = await getNextCard();
    if (gen !== state.gen) return;   // topic or language changed meanwhile

    if (state.current) state.history.push(state.current);
    state.current = card;

    renderCard();
  } catch (e){
    if (gen !== state.gen) return;
    if (e && e.code === "EMPTY_CUSTOM"){
      el("title").textContent = t("customLabel");
      el("concept").textContent = t("customEmpty");
      setCardState("empty");
      setStatus(t("ready"));
    } else {
      el("title").textContent = t("errorTitle");
      el("concept").textContent = t("errorBody");
      setCardState("error");
      setStatus(t("errorTitle"), true);
    }
    el("openLink").removeAttribute("href");
    setImage(null);
  } finally {
    state.isLoading = false;
    setButtonsEnabled(true);
    if (el("card").dataset.state !== "ready") { el("open").disabled = true; el("save").disabled = true; }
    if (state.again){ state.again = false; next(); }
  }
}

function back(){
  if (state.isLoading) return;
  if (!state.history.length) return;
  state.current = state.history.pop();
  renderCard();
}

function openArticle(){
  const c = state.current;
  if (!c) return;
  window.open(c.url, "_blank", "noopener");
}

function saveCurrent(){
  const c = state.current;
  if (!c) return;

  const key = c.url;
  if (state.saved.some(x => x.url === key)){
    setStatus(t("alreadySaved"));
    updateSaveButtonState();
    return;
  }

  state.saved.unshift({
    title: c.title,
    url: c.url,
    savedAt: new Date().toISOString(),
    topic: state.choice,
    lang: state.lang
  });

  saveLocal();
  renderSaved();
  updateSaveButtonState();
  setStatus(t("savedMsg"));
}

function clearSaved(){
  state.saved = [];
  saveLocal();
  renderSaved();
  updateSaveButtonState();
  setStatus(t("cleared"));
}

/* ---------- Topic + Custom search UI ---------- */
function openCustomUI(){
  el("customWrap").classList.add("show");
  el("customInput").value = state.customQuery || "";
  setTimeout(()=> el("customInput").focus(), 0);
}

function closeCustomUI(){
  el("customWrap").classList.remove("show");
}

async function applyCustomQuery(){
  const q = (el("customInput").value || "").trim();
  state.customQuery = q;
  saveLocal();

  if (!q){
    setStatus(t("customNeedsQuery"), true);
    el("customInput").focus();
    return;
  }

  state.gen++;
  state.queue = [];
  state.history = [];
  setStatus(t("loading"));
  await next();
}

async function onTopicChange(key){
  if (!TOPICS.some(t => t.key === key)) return;
  state.choice = key;
  saveLocal();

  state.gen++;
  state.queue = [];
  state.history = [];

  renderChips();

  if (key === "custom"){
    openCustomUI();
    // Don't auto-next unless we already have a query
    await next();
    return;
  } else {
    closeCustomUI();
  }

  setStatus(t("loading"));
  await next();
}

/* ---------- Wiring ---------- */
el("next").onclick = next;
el("retry").onclick = next;
el("back").onclick = back;
el("open").onclick = openArticle;
el("save").onclick = saveCurrent;
el("clearSaved").onclick = clearSaved;

document.querySelectorAll(".lang-btn").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    applyLanguage(btn.dataset.lang);
  });
});

// Custom search bar
el("customApply").addEventListener("click", applyCustomQuery);
el("customCancel").addEventListener("click", ()=>{
  // revert to Random when canceling custom
  state.choice = "random";
  saveLocal();
  state.gen++;
  state.queue = [];
  state.history = [];
  closeCustomUI();
  renderChips();
  setStatus(t("loading"));
  next();
});

el("customInput").addEventListener("keydown", (ev)=>{
  if (ev.key === "Enter"){
    ev.preventDefault();
    applyCustomQuery();
  } else if (ev.key === "Escape"){
    ev.preventDefault();
    el("customCancel").click();
  }
});

/* ---------- Init ---------- */
(function init(){
  loadLocal();

  // Apply saved/default language and mark active button
  applyLanguage(state.lang);

  renderSaved();
  renderChips();

  // set input state
  el("customInput").value = state.customQuery || "";

  setStatus(t("loading"));
  el("savedCount").textContent = String(state.saved.length);

  // applyLanguage() above already loads the first card
})();
