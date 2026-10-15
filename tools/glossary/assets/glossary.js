/* Glossary Game: browse the words as bubbles, or learn them with flip cards.
   The page language comes from <html lang> (en, fr or es); the words come from terms.js.
   Nothing is sent anywhere and nothing is stored: a round lives in the page until it is closed. */
(function () {
  "use strict";
  var D = window.GLOSSARY, app = document.getElementById("app");
  if (!D || !app) return;

  var LANG = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
  if (!/^(en|fr|es)$/.test(LANG)) LANG = "en";

  var TXT = {
    en: {
      view: "Glossary view", explore: "Explore", cards: "Cards",
      random: "Random words", shuffle: "Shuffle",
      search: function (n) { return "Search " + n + " words"; }, searchLabel: "Search the glossary",
      order: "Order", az: "A–Z", topic: "By topic", newest: "Newest", mix: "Mix",
      none: "No word matches that search.",
      side: "Which side comes first", mixed: "Mixed", termFirst: "Word first", defFirst: "Meaning first",
      topicLabel: "Topic", allTopics: "All topics", roundLabel: "Round", cardsN: function (n) { return n + " cards"; }, all: "All",
      left: function (n) { return n + " left"; }, right: function (n) { return n + " right the first time"; },
      word: "Word", meaning: "Meaning", tap: "Tap to flip", flip: "Flip the card",
      again: "Again", got: "Got it",
      done: "Round complete", score: function (a, b) { return "You knew " + a + " of " + b + " the first time."; },
      newRound: "New round", missed: "Words to revisit", practise: "Practise these",
      another: "Another word", close: "Close",
      sep: "Stanford Encyclopedia (in English)", wiki: "Wikipedia (in English)", more: "Read more"
    },
    fr: {
      view: "Vue du glossaire", explore: "Explorer", cards: "Cartes",
      random: "Mots au hasard", shuffle: "Mélanger",
      search: function (n) { return "Chercher parmi " + n + " mots"; }, searchLabel: "Chercher dans le glossaire",
      order: "Ordre", az: "A–Z", topic: "Par thème", newest: "Récents", mix: "Mélange",
      none: "Aucun mot ne correspond à cette recherche.",
      side: "Quelle face d’abord", mixed: "Au hasard", termFirst: "Mot d’abord", defFirst: "Sens d’abord",
      topicLabel: "Thème", allTopics: "Tous les thèmes", roundLabel: "Manche", cardsN: function (n) { return n + " cartes"; }, all: "Toutes",
      left: function (n) { return n + (n > 1 ? " restantes" : " restante"); }, right: function (n) { return n + " réussie" + (n > 1 ? "s" : "") + " du premier coup"; },
      word: "Mot", meaning: "Sens", tap: "Touchez pour retourner", flip: "Retourner la carte",
      again: "À revoir", got: "Je sais",
      done: "Manche terminée", score: function (a, b) { return "Vous en saviez " + a + " sur " + b + " du premier coup."; },
      newRound: "Nouvelle manche", missed: "Mots à revoir", practise: "S’entraîner dessus",
      another: "Un autre mot", close: "Fermer",
      sep: "Stanford Encyclopedia (en anglais)", wiki: "Wikipédia (en anglais)", more: "En savoir plus"
    },
    es: {
      view: "Vista del glosario", explore: "Explorar", cards: "Tarjetas",
      random: "Palabras al azar", shuffle: "Mezclar",
      search: function (n) { return "Buscar entre " + n + " palabras"; }, searchLabel: "Buscar en el glosario",
      order: "Orden", az: "A–Z", topic: "Por tema", newest: "Recientes", mix: "Mezcla",
      none: "Ninguna palabra coincide con la búsqueda.",
      side: "Qué cara va primero", mixed: "Al azar", termFirst: "Primero la palabra", defFirst: "Primero el significado",
      topicLabel: "Tema", allTopics: "Todos los temas", roundLabel: "Ronda", cardsN: function (n) { return n + " tarjetas"; }, all: "Todas",
      left: function (n) { return n + (n > 1 ? " restantes" : " restante"); }, right: function (n) { return n + " acertada" + (n > 1 ? "s" : "") + " a la primera"; },
      word: "Palabra", meaning: "Significado", tap: "Toca para girar", flip: "Girar la tarjeta",
      again: "Repetir", got: "Lo sé",
      done: "Ronda completada", score: function (a, b) { return "Sabías " + a + " de " + b + " a la primera."; },
      newRound: "Nueva ronda", missed: "Palabras para repasar", practise: "Practicarlas",
      another: "Otra palabra", close: "Cerrar",
      sep: "Stanford Encyclopedia (en inglés)", wiki: "Wikipedia (en inglés)", more: "Más información"
    }
  };
  var T = TXT[LANG];

  // ---- data -------------------------------------------------------------
  var topics = D.topics.map(function (t, i) { return { label: t[LANG], hue: (215 + i * 67) % 360 }; });
  var words = D.terms.map(function (t, i) {
    return { id: t.id, topic: t.topic, term: t[LANG][0], body: t[LANG][1], link: t.link || "", order: i };
  });
  var byId = {};
  words.forEach(function (w) { byId[w.id] = w; });

  // ---- helpers ----------------------------------------------------------
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function plain(s) { return String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase(); }
  function sortKey(w) { return plain(w.term.replace(/^[^\p{L}\p{N}]+/u, "")); }
  function safeUrl(u) { return /^https:\/\//.test(u || "") ? u : ""; }
  function linkLabel(u) {
    try {
      var h = new URL(u).hostname.replace(/^www\./, "");
      return h === "plato.stanford.edu" ? T.sep : /(^|\.)wikipedia\.org$/.test(h) ? T.wiki : h;
    } catch (e) { return T.more; }
  }
  function $(sel, root) { return (root || app).querySelector(sel); }
  function press(box, key, val) { box.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset[key] === val)); }); }
  function bubble(w, big) {
    return '<button type="button" class="gl-bubble' + (big ? " big" : "") + '" style="--h:' + topics[w.topic].hue + '" data-id="' + esc(w.id) + '" aria-haspopup="dialog">' + esc(w.term) + "</button>";
  }
  function seg(id, label, key, items, active) {
    return '<div class="gl-seg" id="' + id + '" role="group" aria-label="' + esc(label) + '">' + items.map(function (it) {
      return '<button type="button" data-' + key + '="' + it[0] + '" aria-pressed="' + (it[0] === active) + '">' + esc(it[1]) + "</button>";
    }).join("") + "</div>";
  }

  // ---- page skeleton ----------------------------------------------------
  app.innerHTML =
    seg("glModes", T.view, "mode", [["explore", T.explore], ["cards", T.cards]], "explore") +
    '<div class="gl-pane" id="glExplore">' +
      '<div class="gl-today" id="glToday"><div class="gl-head"><h2>' + esc(T.random) + '</h2><button type="button" class="gl-small" id="glShuffle">' + esc(T.shuffle) + '</button></div><div class="gl-bubbles" id="glTodayList"></div></div>' +
      '<input id="glSearch" class="gl-input" type="search" autocomplete="off" placeholder="' + esc(T.search(words.length)) + '" aria-label="' + esc(T.searchLabel) + '">' +
      seg("glSorts", T.order, "sort", [["az", T.az], ["topic", T.topic], ["new", T.newest], ["mix", T.mix]], "az") +
      '<div class="gl-pane" id="glList"></div>' +
    "</div>" +
    '<div class="gl-pane" id="glCards" hidden>' +
      seg("glDirs", T.side, "dir", [["mixed", T.mixed], ["term", T.termFirst], ["def", T.defFirst]], "mixed") +
      '<div class="gl-setup">' +
        '<label><span>' + esc(T.topicLabel) + '</span><select id="glTopic" class="gl-input"><option value="all">' + esc(T.allTopics) + "</option>" +
          topics.map(function (t, i) { return '<option value="' + i + '">' + esc(t.label) + "</option>"; }).join("") + "</select></label>" +
        '<label><span>' + esc(T.roundLabel) + '</span><select id="glSize" class="gl-input"><option value="10">' + esc(T.cardsN(10)) + '</option><option value="20">' + esc(T.cardsN(20)) + '</option><option value="all">' + esc(T.all) + "</option></select></label>" +
      "</div>" +
      '<div class="gl-pane" id="glCard"></div>' +
    "</div>" +
    '<dialog class="gl-sheet" id="glSheet" aria-labelledby="glSheetTitle"><div class="gl-sheet-in"><div class="gl-sheet-body" id="glSheetBody"></div>' +
      '<div class="gl-sheet-actions"><button type="button" class="gl-btn" id="glAnother">' + esc(T.another) + '</button><button type="button" class="gl-btn primary" id="glClose">' + esc(T.close) + "</button></div></div></dialog>";

  var sheet = $("#glSheet"), sheetId = null;
  var sortMode = "az", mix = shuffle(words).map(function (w) { return w.id; }), today = [];
  var cfg = { dir: "mixed", topic: "all", size: "10" }, deck = [], round = null, flipped = false, focusNext = false;

  // ---- explore ----------------------------------------------------------
  function pickToday() {
    today = shuffle(words).slice(0, 5).map(function (w) { return w.id; });
    $("#glTodayList").innerHTML = today.map(function (id) { return bubble(byId[id], true); }).join("");
  }
  function group(title, arr) {
    return '<section class="gl-group"><h3>' + esc(title) + " · " + arr.length + '</h3><div class="gl-bubbles">' + arr.map(function (w) { return bubble(w); }).join("") + "</div></section>";
  }
  function renderList() {
    var q = plain($("#glSearch").value.trim());
    $("#glToday").hidden = !!q;
    var list = words.filter(function (w) { return !q || plain(w.term + " " + w.body + " " + topics[w.topic].label).indexOf(q) >= 0; });
    var html;
    if (!list.length) html = '<p class="gl-empty">' + esc(T.none) + "</p>";
    else if (sortMode === "topic") {
      html = topics.map(function (t, i) { var a = list.filter(function (w) { return w.topic === i; }); return a.length ? group(t.label, a) : ""; }).join("");
    } else if (sortMode === "az") {
      var sorted = list.slice().sort(function (a, b) { return sortKey(a).localeCompare(sortKey(b), LANG); });
      var letter = function (w) { return (sortKey(w).charAt(0) || "#").toUpperCase(); };
      var letters = []; sorted.forEach(function (w) { var l = letter(w); if (letters.indexOf(l) < 0) letters.push(l); });
      html = letters.map(function (l) { return group(l, sorted.filter(function (w) { return letter(w) === l; })); }).join("");
    } else {
      var arr = sortMode === "new" ? list.slice().sort(function (a, b) { return b.order - a.order; })
        : mix.map(function (id) { return byId[id]; }).filter(function (w) { return list.indexOf(w) >= 0; });
      html = '<div class="gl-bubbles">' + arr.map(function (w) { return bubble(w); }).join("") + "</div>";
    }
    $("#glList").innerHTML = html;
  }

  // ---- the meaning sheet ------------------------------------------------
  function openSheet(id) {
    var w = byId[id]; if (!w) return;
    sheetId = id;
    var u = safeUrl(w.link);
    $("#glSheetBody").innerHTML = '<span class="gl-tag" style="--h:' + topics[w.topic].hue + '">' + esc(topics[w.topic].label) + '</span><h2 id="glSheetTitle">' + esc(w.term) + "</h2><p>" + esc(w.body) + "</p>" +
      (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(linkLabel(u)) + " ↗</a>" : "");
    if (!sheet.open) { if (sheet.showModal) sheet.showModal(); else sheet.setAttribute("open", ""); }
  }
  function closeSheet() { if (sheet.close) sheet.close(); else sheet.removeAttribute("open"); }

  // ---- cards ------------------------------------------------------------
  function newRound(ids) {
    if (!ids) {
      var pool = words.filter(function (w) { return cfg.topic === "all" || w.topic === +cfg.topic; });
      var n = cfg.size === "all" ? pool.length : Math.min(+cfg.size, pool.length);
      ids = shuffle(pool).slice(0, n).map(function (w) { return w.id; });
    } else ids = shuffle(ids);
    deck = ids;
    round = { total: deck.length, firstTry: 0, missed: [] };
    showCard();
  }
  function showCard() {
    var box = $("#glCard");
    if (!deck.length) {
      box.innerHTML = '<div class="gl-done"><div class="gl-big">' + esc(T.done) + "</div><p>" + esc(T.score(round.firstTry, round.total)) + "</p>" +
        (round.missed.length ? '<p class="gl-note">' + esc(T.missed) + '</p><div class="gl-bubbles center">' + round.missed.map(function (id) { return bubble(byId[id]); }).join("") + "</div>" : "") +
        '<div class="gl-answer"><button type="button" class="gl-btn' + (round.missed.length ? "" : " primary") + '" id="glAgain">' + esc(T.newRound) + "</button>" +
        (round.missed.length ? '<button type="button" class="gl-btn primary" id="glPractise">' + esc(T.practise) + "</button>" : "") + "</div></div>";
      return;
    }
    var w = byId[deck[0]];
    var termFirst = cfg.dir === "mixed" ? Math.random() < 0.5 : cfg.dir === "term";
    var u = safeUrl(w.link);
    var meaning = '<span class="gl-label">' + esc(T.meaning) + '</span><p class="gl-text">' + esc(w.body) + "</p>";
    var word = '<span class="gl-label">' + esc(T.word) + '</span><div class="gl-big' + (w.term.length > 26 ? " long" : "") + '">' + esc(w.term) + "</div>";
    var back = termFirst ? meaning + (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(linkLabel(u)) + " ↗</a>" : "")
      : word + '<span class="gl-hint">' + esc(topics[w.topic].label) + "</span>";
    flipped = false;
    box.innerHTML = '<div class="gl-stats" aria-live="polite"><span>' + esc(T.left(deck.length)) + "</span><span>" + esc(T.right(round.firstTry)) + "</span></div>" +
      '<div class="gl-flip" id="glFlip" role="button" tabindex="0" aria-pressed="false" aria-label="' + esc(T.flip) + '"><div class="gl-flip-in">' +
        '<div class="gl-face front" aria-hidden="false">' + (termFirst ? word : meaning) + '<span class="gl-hint">' + esc(T.tap) + "</span></div>" +
        '<div class="gl-face back" aria-hidden="true">' + back + "</div></div></div>" +
      '<div class="gl-answer" id="glAnswer" hidden><button type="button" class="gl-btn" data-ans="0">' + esc(T.again) + '</button><button type="button" class="gl-btn primary" data-ans="1">' + esc(T.got) + "</button></div>";
    if (focusNext) { focusNext = false; $("#glFlip").focus({ preventScroll: true }); }
  }
  function flipCard() {
    var f = $("#glFlip"); if (!f) return;
    flipped = !flipped;
    f.classList.toggle("flipped", flipped);
    f.setAttribute("aria-pressed", String(flipped));
    $(".front", f).setAttribute("aria-hidden", String(flipped));
    $(".back", f).setAttribute("aria-hidden", String(!flipped));
    if (flipped) $("#glAnswer").hidden = false;
  }
  function answer(ok) {
    var id = deck.shift();
    focusNext = true;
    if (ok) { if (round.missed.indexOf(id) < 0) round.firstTry++; }
    else { if (round.missed.indexOf(id) < 0) round.missed.push(id); deck.push(id); }
    showCard();
  }

  // ---- modes and events -------------------------------------------------
  function setMode(m, keepHash) {
    press($("#glModes"), "mode", m);
    $("#glExplore").hidden = m !== "explore";
    $("#glCards").hidden = m !== "cards";
    if (m === "cards" && !round) newRound();
    if (!keepHash && window.history && history.replaceState) { try { history.replaceState(null, "", m === "cards" ? "#cards" : location.pathname + location.search); } catch (e) {} }
  }

  app.addEventListener("click", function (e) {
    var b = e.target.closest("button, a");
    if (!b) { if (e.target.closest("#glFlip")) flipCard(); return; }
    if (b.classList.contains("gl-bubble")) { openSheet(b.dataset.id); return; }
    if (b.dataset.mode) { setMode(b.dataset.mode); return; }
    if (b.dataset.sort) { sortMode = b.dataset.sort; press($("#glSorts"), "sort", sortMode); if (sortMode === "mix") mix = shuffle(words).map(function (w) { return w.id; }); renderList(); return; }
    if (b.dataset.dir) { cfg.dir = b.dataset.dir; press($("#glDirs"), "dir", cfg.dir); newRound(); return; }
    if (b.dataset.ans) { answer(b.dataset.ans === "1"); return; }
    switch (b.id) {
      case "glShuffle": pickToday(); break;
      case "glAnother": var pick = shuffle(words.filter(function (w) { return w.id !== sheetId; }))[0]; if (pick) openSheet(pick.id); break;
      case "glClose": closeSheet(); break;
      case "glAgain": focusNext = true; newRound(); break;
      case "glPractise": focusNext = true; newRound(round.missed.slice()); break;
    }
  });
  app.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.id === "glFlip") { e.preventDefault(); flipCard(); }
  });
  sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });
  $("#glSearch").addEventListener("input", renderList);
  $("#glTopic").addEventListener("change", function (e) { cfg.topic = e.target.value; newRound(); });
  $("#glSize").addEventListener("change", function (e) { cfg.size = e.target.value; newRound(); });

  pickToday();
  renderList();
  if (location.hash === "#cards") setMode("cards", true);
  window.addEventListener("hashchange", function () { setMode(location.hash === "#cards" ? "cards" : "explore", true); });
})();
