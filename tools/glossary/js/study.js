/* Glossary Game, study side: a map of the starter words (with an A–Z list) and flip cards.
   The words and how they connect come from terms.js. Kept words come from the game's own glossary (window.GG, defined in app.js).
   Nothing is sent anywhere from here: the only network calls are the Wikipedia ones the game already makes. */
(function () {
  "use strict";
  var GG = window.GG, D = window.GLOSSARY, pane = document.getElementById("studyPane");
  if (!GG || !D || !pane) return;

  var TXT = {
    en: {
      intro: function (n) { return n + " starter words from consciousness, cosmology, quantum physics and entropy, joined to the ideas they connect to. Read a word, wander from it through Wikipedia, or keep it in your glossary."; },
      viewLabel: "Starter words view", viewMap: "Map", viewList: "A–Z", random: "Random word",
      search: function (n) { return "Search " + n + " words"; }, searchLabel: "Search the starter words", none: "No word matches that search.",
      topicLabel: "Topic", allTopics: "All topics", mapTitleAll: "All topics", mapNoteAll: "Choose a topic to open its map.",
      count: function (n) { return n === 1 ? "1 word" : n + " words"; },
      mapNote: function (n, m) { return (n === 1 ? "1 word" : n + " words") + (m ? " · " + m + " related from other topics" : ""); },
      mapHelp: "Tap a word for its meaning and what it connects to. Dashed words belong to other topics.",
      mapHelpAll: "Tap a topic to open its map. Lines show words that connect across topics.",
      mapAria: "Map of related words. Scroll to explore.", zoomIn: "Zoom in", zoomOut: "Zoom out", fit: "Fit",
      play: "Play cards on this topic", mapLink: "Open map", openMap: function (l) { return "Open the map: " + l; }, related: "Related words",
      wander: "Wander from here", keep: "☆ Keep in glossary", kept: "★ Kept", close: "Close",
      sep: "Stanford Encyclopedia (in English)", wiki: "Wikipedia", more: "Read more",
      deck: "Deck", deckKept: function (n) { return "My glossary (" + n + ")"; }, deckAll: "All starter words",
      side: "Which side comes first", mixed: "Mixed", termFirst: "Word first", defFirst: "Meaning first",
      roundLabel: "Round", cardsN: function (n) { return n + " cards"; }, all: "All",
      left: function (n) { return n + " left"; }, right: function (n) { return n + " right the first time"; },
      word: "Word", meaning: "Meaning", tap: "Tap to flip", flip: "Flip the card", again: "Again", got: "Got it",
      done: "Round complete", score: function (a, b) { return "You knew " + a + " of " + b + " the first time."; },
      newRound: "New round", missed: "Words to revisit", practise: "Practise these",
      emptyKept: "Your glossary is empty. Keep words while you wander, or from the starter map, and they become cards here.", goWander: "Start wandering", goMap: "Open the starter map"
    },
    es: {
      intro: function (n) { return n + " palabras de partida de la conciencia, la cosmología, la física cuántica y la entropía, unidas a las ideas con las que se conectan. Lee una palabra, pasea desde ella por Wikipedia o guárdala en tu glosario."; },
      viewLabel: "Vista de las palabras de partida", viewMap: "Mapa", viewList: "A–Z", random: "Palabra al azar",
      search: function (n) { return "Buscar entre " + n + " palabras"; }, searchLabel: "Buscar en las palabras de partida", none: "Ninguna palabra coincide con la búsqueda.",
      topicLabel: "Tema", allTopics: "Todos los temas", mapTitleAll: "Todos los temas", mapNoteAll: "Elige un tema para abrir su mapa.",
      count: function (n) { return n === 1 ? "1 palabra" : n + " palabras"; },
      mapNote: function (n, m) { return (n === 1 ? "1 palabra" : n + " palabras") + (m ? " · " + m + " relacionada" + (m > 1 ? "s" : "") + " de otros temas" : ""); },
      mapHelp: "Toca una palabra para ver su significado y sus conexiones. Las palabras punteadas son de otros temas.",
      mapHelpAll: "Toca un tema para abrir su mapa. Las líneas unen palabras que se conectan entre temas.",
      mapAria: "Mapa de palabras relacionadas. Desplázate para explorar.", zoomIn: "Acercar", zoomOut: "Alejar", fit: "Ver todo",
      play: "Jugar con las tarjetas de este tema", mapLink: "Ver el mapa", openMap: function (l) { return "Abrir el mapa: " + l; }, related: "Palabras relacionadas",
      wander: "Pasear desde aquí", keep: "☆ Guardar en el glosario", kept: "★ Guardada", close: "Cerrar",
      sep: "Stanford Encyclopedia (en inglés)", wiki: "Wikipedia", more: "Más información",
      deck: "Mazo", deckKept: function (n) { return "Mi glosario (" + n + ")"; }, deckAll: "Todas las palabras de partida",
      side: "Qué cara va primero", mixed: "Al azar", termFirst: "Primero la palabra", defFirst: "Primero el significado",
      roundLabel: "Ronda", cardsN: function (n) { return n + " tarjetas"; }, all: "Todas",
      left: function (n) { return n + (n > 1 ? " restantes" : " restante"); }, right: function (n) { return n + " acertada" + (n > 1 ? "s" : "") + " a la primera"; },
      word: "Palabra", meaning: "Significado", tap: "Toca para girar", flip: "Girar la tarjeta", again: "Repetir", got: "Lo sé",
      done: "Ronda completada", score: function (a, b) { return "Sabías " + a + " de " + b + " a la primera."; },
      newRound: "Nueva ronda", missed: "Palabras para repasar", practise: "Practicarlas",
      emptyKept: "Tu glosario está vacío. Guarda palabras mientras paseas, o desde el mapa de partida, y se convierten en tarjetas aquí.", goWander: "Empezar a pasear", goMap: "Abrir el mapa de partida"
    },
    fr: {
      intro: function (n) { return n + " mots de départ issus de la conscience, de la cosmologie, de la physique quantique et de l’entropie, reliés aux idées auxquelles ils se rattachent. Lisez un mot, partez de lui à travers Wikipédia ou gardez-le dans votre glossaire."; },
      viewLabel: "Vue des mots de départ", viewMap: "Réseau", viewList: "A–Z", random: "Mot au hasard",
      search: function (n) { return "Chercher parmi " + n + " mots"; }, searchLabel: "Chercher dans les mots de départ", none: "Aucun mot ne correspond à cette recherche.",
      topicLabel: "Thème", allTopics: "Tous les thèmes", mapTitleAll: "Tous les thèmes", mapNoteAll: "Choisissez un thème pour ouvrir son réseau.",
      count: function (n) { return n + (n > 1 ? " mots" : " mot"); },
      mapNote: function (n, m) { return n + (n > 1 ? " mots" : " mot") + (m ? " · " + m + " lié" + (m > 1 ? "s" : "") + " venant d’autres thèmes" : ""); },
      mapHelp: "Touchez un mot pour voir son sens et ses liens. Les mots en pointillés viennent d’autres thèmes.",
      mapHelpAll: "Touchez un thème pour ouvrir son réseau. Les lignes relient les mots qui se répondent d’un thème à l’autre.",
      mapAria: "Réseau des mots liés. Faites défiler pour explorer.", zoomIn: "Agrandir", zoomOut: "Réduire", fit: "Tout voir",
      play: "Jouer aux cartes de ce thème", mapLink: "Voir le réseau", openMap: function (l) { return "Ouvrir le réseau : " + l; }, related: "Mots liés",
      wander: "Partir de ce mot", keep: "☆ Garder dans le glossaire", kept: "★ Gardé", close: "Fermer",
      sep: "Stanford Encyclopedia (en anglais)", wiki: "Wikipédia", more: "En savoir plus",
      deck: "Paquet", deckKept: function (n) { return "Mon glossaire (" + n + ")"; }, deckAll: "Tous les mots de départ",
      side: "Quelle face d’abord", mixed: "Au hasard", termFirst: "Mot d’abord", defFirst: "Sens d’abord",
      roundLabel: "Manche", cardsN: function (n) { return n + " cartes"; }, all: "Toutes",
      left: function (n) { return n + (n > 1 ? " restantes" : " restante"); }, right: function (n) { return n + " réussie" + (n > 1 ? "s" : "") + " du premier coup"; },
      word: "Mot", meaning: "Sens", tap: "Touchez pour retourner", flip: "Retourner la carte", again: "À revoir", got: "Je sais",
      done: "Manche terminée", score: function (a, b) { return "Vous en saviez " + a + " sur " + b + " du premier coup."; },
      newRound: "Nouvelle manche", missed: "Mots à revoir", practise: "S’entraîner dessus",
      emptyKept: "Votre glossaire est vide. Gardez des mots en vous baladant, ou depuis le réseau de départ, et ils deviennent des cartes ici.", goWander: "Commencer la balade", goMap: "Ouvrir le réseau de départ"
    },
    de: {
      intro: function (n) { return n + " Startwörter aus Bewusstsein, Kosmologie, Quantenphysik und Entropie, verbunden mit den Ideen, an die sie anknüpfen. Lies ein Wort, wandere von dort aus durch Wikipedia oder behalte es in deinem Glossar."; },
      viewLabel: "Ansicht der Startwörter", viewMap: "Netz", viewList: "A–Z", random: "Zufälliges Wort",
      search: function (n) { return "Unter " + n + " Wörtern suchen"; }, searchLabel: "Startwörter durchsuchen", none: "Kein Wort passt zu dieser Suche.",
      topicLabel: "Thema", allTopics: "Alle Themen", mapTitleAll: "Alle Themen", mapNoteAll: "Wähle ein Thema, um sein Netz zu öffnen.",
      count: function (n) { return n === 1 ? "1 Wort" : n + " Wörter"; },
      mapNote: function (n, m) { return (n === 1 ? "1 Wort" : n + " Wörter") + (m ? " · " + m + " verwandte aus anderen Themen" : ""); },
      mapHelp: "Tippe ein Wort an, um seine Bedeutung und seine Verbindungen zu sehen. Gestrichelte Wörter gehören zu anderen Themen.",
      mapHelpAll: "Tippe ein Thema an, um sein Netz zu öffnen. Linien zeigen Wörter, die Themen verbinden.",
      mapAria: "Netz verwandter Wörter. Zum Erkunden scrollen.", zoomIn: "Vergrößern", zoomOut: "Verkleinern", fit: "Alles zeigen",
      play: "Karten zu diesem Thema spielen", mapLink: "Netz öffnen", openMap: function (l) { return "Netz öffnen: " + l; }, related: "Verwandte Wörter",
      wander: "Von hier aus wandern", keep: "☆ Im Glossar behalten", kept: "★ Behalten", close: "Schließen",
      sep: "Stanford Encyclopedia (auf Englisch)", wiki: "Wikipedia", more: "Mehr erfahren",
      deck: "Stapel", deckKept: function (n) { return "Mein Glossar (" + n + ")"; }, deckAll: "Alle Startwörter",
      side: "Welche Seite zuerst", mixed: "Gemischt", termFirst: "Wort zuerst", defFirst: "Bedeutung zuerst",
      roundLabel: "Runde", cardsN: function (n) { return n + " Karten"; }, all: "Alle",
      left: function (n) { return n + " übrig"; }, right: function (n) { return n + " gleich richtig"; },
      word: "Wort", meaning: "Bedeutung", tap: "Zum Umdrehen tippen", flip: "Karte umdrehen", again: "Nochmal", got: "Gewusst",
      done: "Runde geschafft", score: function (a, b) { return "Du wusstest " + a + " von " + b + " gleich beim ersten Mal."; },
      newRound: "Neue Runde", missed: "Wörter zum Wiederholen", practise: "Diese üben",
      emptyKept: "Dein Glossar ist leer. Behalte Wörter beim Wandern oder im Startnetz, und sie werden hier zu Karten.", goWander: "Losgehen", goMap: "Startnetz öffnen"
    }
  };
  var LANG, T, topics, words, byId, adj;
  var active = false, view = "map", wordView = "map", mapTopic = "all", mapSel = null, mapScale = 1, mapW = 0, mapH = 0, mapCore = { x: 0, y: 0 }, mapEls = {}, mapEdges = [], mapSig = "";
  var cfg = { dir: "mixed", deck: null, size: "10" }, deck = [], items = {}, round = null, flipped = false, focusNext = false, sheetKey = null, sheet = null;

  function setup() {
    LANG = GG.lang(); T = TXT[LANG] || TXT.en;
    topics = D.topics.map(function (t, i) { return { label: t[LANG] || t.en, hue: (215 + i * 67) % 360 }; });
    words = D.terms.map(function (t, i) { var l = t[LANG] || t.en; return { id: t.id, topic: t.topic, term: l[0], body: l[1], link: t.link || "", wiki: t.wiki || [], order: i, lang: LANG }; });
    byId = {}; adj = {};
    words.forEach(function (w) { byId[w.id] = w; adj[w.id] = []; });
    (D.edges || []).forEach(function (e) { if (byId[e[0]] && byId[e[1]]) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); } });
  }

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
  function $(sel, root) { return (root || pane).querySelector(sel); }
  function press(box, key, val) { box.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset[key] === val)); b.classList.toggle("active", b.dataset[key] === val); }); }
  function itemKey(it) { return it.id || it.key; }
  function hueOf(it) { return it.topic != null && topics[it.topic] ? topics[it.topic].hue : 230; }
  function bubble(it, big) {
    return '<button type="button" class="gl-bubble' + (big ? " big" : "") + '" style="--h:' + hueOf(it) + '" data-key="' + esc(itemKey(it)) + '" aria-haspopup="dialog">' + esc(it.term) + "</button>";
  }
  function chips(id, label, key, list, active) {
    return '<div class="gg-modes gl-chips" id="' + id + '" role="group" aria-label="' + esc(label) + '">' + list.map(function (it) {
      return '<button type="button" class="gg-chip' + (it[0] === active ? " active" : "") + '" data-' + key + '="' + it[0] + '" aria-pressed="' + (it[0] === active) + '">' + esc(it[1]) + "</button>";
    }).join("") + "</div>";
  }
  function topicOptions() { return topics.map(function (t, i) { return '<option value="' + i + '">' + esc(t.label) + "</option>"; }).join(""); }

  // kept words live in the game's glossary
  function keptList() { return GG.glossary(); }
  function keptItem(g) { return { key: "k|" + g.lang + "|" + g.title, term: g.title, body: GG.meaning(g), link: g.url || "", lang: g.lang, kept: true }; }
  function entryOf(it) { return { title: it.term, lang: it.lang || LANG, description: "", extract: it.body, url: it.link || "", starter: it.id || "" }; }
  function isKept(it) { return GG.isKept(it.term, it.lang || LANG); }
  function lookup(key) { return byId[key] || items[key] || null; }

  // ---- page skeleton ----------------------------------------------------
  function build() {
    pane.innerHTML =
      '<section class="gl-panel" id="glWords" aria-label="' + esc(T.viewLabel) + '">' +
        '<p class="gg-hint gl-intro" id="glIntro"></p>' +
        '<div class="gl-bar">' + chips("glWordView", T.viewLabel, "wv", [["map", T.viewMap], ["az", T.viewList]], wordView) +
          '<button type="button" class="gg-btn small" id="glRandom">' + esc(T.random) + "</button></div>" +
        '<div class="gl-sub" id="glMap">' +
          '<label class="gg-field gl-fieldrow"><span>' + esc(T.topicLabel) + '</span><select id="glMapTopic" class="gl-select"><option value="all">' + esc(T.allTopics) + "</option>" + topicOptions() + "</select></label>" +
          '<div class="gl-maphead"><h2 id="glMapTitle"></h2><p id="glMapNote"></p></div>' +
          '<div class="gl-maptools">' +
            '<button type="button" id="glZoomOut" aria-label="' + esc(T.zoomOut) + '">−</button>' +
            '<button type="button" id="glFit" class="wide">' + esc(T.fit) + "</button>" +
            '<button type="button" id="glZoomIn" aria-label="' + esc(T.zoomIn) + '">+</button></div>' +
          '<div class="gl-mapbox"><div class="gl-mapscroll" id="glMapScroll" tabindex="0" role="region" aria-label="' + esc(T.mapAria) + '"><div class="gl-mapsizer" id="glMapSizer"><div class="gl-mapcanvas" id="glMapCanvas"></div></div></div></div>' +
          '<p class="gl-maphelp" id="glMapHelp"></p>' +
          '<button type="button" class="gg-btn primary gl-wide" id="glMapPlay" hidden>' + esc(T.play) + "</button>" +
        "</div>" +
        '<div class="gl-sub" id="glListBox" hidden>' +
          '<input id="glSearch" class="gl-select" type="search" autocomplete="off" placeholder="' + esc(T.search(words.length)) + '" aria-label="' + esc(T.searchLabel) + '">' +
          '<div class="gl-list" id="glList"></div></div>' +
      "</section>" +
      '<section class="gl-panel" id="glCards" hidden aria-label="' + esc(T.deck) + '">' +
        '<div class="gl-setup">' +
          '<label class="gg-field"><span>' + esc(T.deck) + '</span><select id="glDeck" class="gl-select"></select></label>' +
          '<label class="gg-field"><span>' + esc(T.roundLabel) + '</span><select id="glSize" class="gl-select"><option value="10">' + esc(T.cardsN(10)) + '</option><option value="20">' + esc(T.cardsN(20)) + '</option><option value="all">' + esc(T.all) + "</option></select></label>" +
        "</div>" +
        chips("glDirs", T.side, "dir", [["mixed", T.mixed], ["term", T.termFirst], ["def", T.defFirst]], cfg.dir) +
        '<div class="gl-cardbox" id="glCard"></div>' +
      "</section>" +
      '<dialog class="gl-sheet" id="glSheet" aria-labelledby="glSheetTitle"><div class="gl-sheet-in"><div class="gl-sheet-body" id="glSheetBody"></div>' +
        '<div class="gl-sheet-actions"><button type="button" class="gg-btn primary" id="glWander">' + esc(T.wander) + '</button><button type="button" class="gg-btn" id="glKeep" aria-pressed="false"></button><button type="button" class="gg-btn gl-close" id="glClose">' + esc(T.close) + "</button></div></div></dialog>";
    sheet = $("#glSheet");
    $("#glIntro").textContent = T.intro(words.length);
    $("#glMapTopic").value = mapTopic;
    $("#glSize").value = cfg.size;
    refreshDeckOptions();
    renderList();
  }

  // ---- the list ---------------------------------------------------------
  function group(title, arr) {
    return '<section class="gl-group"><h3>' + esc(title) + " · " + arr.length + '</h3><div class="gl-bubbles">' + arr.map(function (w) { return bubble(w); }).join("") + "</div></section>";
  }
  function renderList() {
    var q = plain($("#glSearch").value.trim());
    var list = words.filter(function (w) { return !q || plain(w.term + " " + w.body + " " + topics[w.topic].label).indexOf(q) >= 0; });
    var html;
    if (!list.length) html = '<p class="gl-empty">' + esc(T.none) + "</p>";
    else {
      var sorted = list.slice().sort(function (a, b) { return sortKey(a).localeCompare(sortKey(b), LANG); });
      var letter = function (w) { return (sortKey(w).charAt(0) || "#").toUpperCase(); };
      var letters = []; sorted.forEach(function (w) { var l = letter(w); if (letters.indexOf(l) < 0) letters.push(l); });
      html = letters.map(function (l) { return group(l, sorted.filter(function (w) { return letter(w) === l; })); }).join("");
    }
    $("#glList").innerHTML = html;
  }

  // ---- the meaning sheet ------------------------------------------------
  function refreshSheetKeep() {
    var it = lookup(sheetKey), b = $("#glKeep"); if (!it || !b) return;
    var k = isKept(it);
    b.textContent = k ? T.kept : T.keep; b.setAttribute("aria-pressed", String(k)); b.classList.toggle("kept", k);
  }
  function openSheet(key) {
    var it = lookup(key); if (!it) return;
    sheetKey = key;
    var u = safeUrl(it.link), rel = it.id ? adj[it.id].map(function (r) { return byId[r]; }) : [];
    $("#glSheetBody").innerHTML =
      (it.id ? '<button type="button" class="gl-tag" style="--h:' + hueOf(it) + '" data-maptopic="' + it.topic + '" data-mapword="' + esc(it.id) + '" aria-label="' + esc(T.openMap(topics[it.topic].label)) + '">' + esc(topics[it.topic].label) + " →</button>" : "") +
      '<h2 id="glSheetTitle">' + esc(it.term) + "</h2><p>" + esc(it.body) + "</p>" +
      (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(linkLabel(u)) + " ↗</a>" : "") +
      (rel.length ? '<p class="gl-note">' + esc(T.related) + '</p><div class="gl-bubbles">' + rel.map(function (r) { return bubble(r); }).join("") + "</div>" : "");
    refreshSheetKeep();
    if (!sheet.open) { if (sheet.showModal) sheet.showModal(); else sheet.setAttribute("open", ""); }
    sheet.scrollTop = 0;
    if (view === "map" && wordView === "map" && it.id) selectNode(it.id);
  }
  function closeSheet() { if (sheet && sheet.open) { if (sheet.close) sheet.close(); else sheet.removeAttribute("open"); } }

  // ---- the map ----------------------------------------------------------
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  // A small force layout that knows how big each node is, so labels never sit on top of each other.
  function layout(nodes, edges, seed, tight, tall) {
    var n = nodes.length, rnd = rng(seed), PAD = tight ? 14 : 26, REST = tight ? 20 : 90, i, j, k;
    if (tall) {   // narrow screens: two columns of topics, ordered so that no line runs behind another topic
      var cw = 0, gap = 18;
      nodes.forEach(function (nd) { cw = Math.max(cw, nd.w); });
      var place = function (order) {
        var y = 0, pos = [], s0, A, B, two, rh;
        for (s0 = 0; s0 < order.length; s0 += 2) {
          A = order[s0]; B = order[s0 + 1]; two = B != null; rh = Math.max(nodes[A].h, two ? nodes[B].h : 0);
          pos[A] = { x: two ? -(cw / 2 + gap / 2) : 0, y: y + rh / 2 };
          if (two) pos[B] = { x: cw / 2 + gap / 2, y: y + rh / 2 + 20 };
          y += rh + gap + (two ? 10 : 0);
        }
        return pos;
      };
      var cost = function (pos) {
        var c = 0;
        edges.forEach(function (e) {
          var P = pos[e[0]], Q = pos[e[1]], dx = Q.x - P.x, dy = Q.y - P.y, q, t;
          c += Math.sqrt(dx * dx + dy * dy) * (e[2] || 1);
          for (q = 0; q < n; q++) {
            if (q === e[0] || q === e[1]) continue;
            for (t = 1; t < 16; t++) {
              if (Math.abs(P.x + dx * t / 16 - pos[q].x) < nodes[q].w / 2 + 6 && Math.abs(P.y + dy * t / 16 - pos[q].y) < nodes[q].h / 2 + 6) { c += 5000; break; }
            }
          }
        });
        return c;
      };
      var best = nodes.map(function (_, q) { return q; }), bestCost = Infinity;
      if (n <= 8) {
        var perm = function (arr, m) {
          if (m === arr.length) { var c = cost(place(arr)); if (c < bestCost) { bestCost = c; best = arr.slice(); } return; }
          for (var q = m; q < arr.length; q++) { var t0 = arr[m]; arr[m] = arr[q]; arr[q] = t0; perm(arr, m + 1); t0 = arr[m]; arr[m] = arr[q]; arr[q] = t0; }
        };
        perm(best.slice(), 0);
      }
      var fin = place(best);
      for (i = 0; i < n; i++) { nodes[i].x = fin[i].x; nodes[i].y = fin[i].y; }
      return;
    }
    for (i = 0; i < n; i++) {
      var a = i * 2.39996 + rnd() * 0.5, r = 120 * Math.sqrt(i + 1);
      nodes[i].x = Math.cos(a) * r * 1.3; nodes[i].y = Math.sin(a) * r;
      nodes[i].r = Math.max(nodes[i].w, nodes[i].h) / 2;
    }
    function separate(strength) {
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
        var A = nodes[i], B = nodes[j], dx = B.x - A.x, dy = B.y - A.y;
        var ox = (A.w + B.w) / 2 + PAD - Math.abs(dx), oy = (A.h + B.h) / 2 + PAD - Math.abs(dy);
        if (ox > 0 && oy > 0) {
          if (ox < oy) { var sx = (dx >= 0 ? 1 : -1) * ox * strength; A.x -= sx; B.x += sx; }
          else { var sy = (dy >= 0 ? 1 : -1) * oy * strength; A.y -= sy; B.y += sy; }
        }
      }
    }
    var ITER = 520;
    for (k = 0; k < ITER; k++) {
      var step = 0.25 + 0.75 * (1 - k / ITER);
      for (i = 0; i < n; i++) { nodes[i].fx = -nodes[i].x * 0.004; nodes[i].fy = -nodes[i].y * 0.006; }
      edges.forEach(function (e) {
        var A = nodes[e[0]], B = nodes[e[1]], dx = B.x - A.x, dy = B.y - A.y, d = Math.sqrt(dx * dx + dy * dy) || 1;
        var rest = (A.r + B.r) * 0.7 + REST, f = (d - rest) * 0.02 * (e[2] || 1);
        A.fx += dx / d * f; A.fy += dy / d * f; B.fx -= dx / d * f; B.fy -= dy / d * f;
      });
      for (i = 0; i < n; i++) for (j = i + 1; j < n; j++) {
        var P = nodes[i], Q = nodes[j], ddx = Q.x - P.x, ddy = Q.y - P.y, d2 = ddx * ddx + ddy * ddy + 1, dd = Math.sqrt(d2);
        if (dd < 520) { var rf = 16000 / d2; P.fx -= ddx / dd * rf; P.fy -= ddy / dd * rf; Q.fx += ddx / dd * rf; Q.fy += ddy / dd * rf; }
      }
      for (i = 0; i < n; i++) {
        nodes[i].x += Math.max(-36, Math.min(36, nodes[i].fx * step * 6));
        nodes[i].y += Math.max(-36, Math.min(36, nodes[i].fy * step * 6));
      }
      separate(0.5);
    }
    for (k = 0; k < 120; k++) separate(0.55);
  }

  function nodeHtml(nd) { return nd.html; }

  function renderMap() {
    var canvas = $("#glMapCanvas"), nodes = [], edges = [], idx = {}, seed;
    var all = mapTopic === "all", ti = +mapTopic;
    function add(nd) { idx[nd.id] = nodes.length; nodes.push(nd); }

    if (all) {
      seed = 99;
      var cross = {};
      (D.edges || []).forEach(function (e) {
        var a = byId[e[0]].topic, b = byId[e[1]].topic;
        if (a !== b) { var key = Math.min(a, b) + "-" + Math.max(a, b); cross[key] = (cross[key] || 0) + 1; }
      });
      topics.forEach(function (t, i) {
        var n = words.filter(function (w) { return w.topic === i; }).length;
        add({ id: "t" + i, core: true, html: '<button type="button" class="gl-node hub" style="--h:' + t.hue + '" data-maptopic="' + i + '" aria-label="' + esc(T.openMap(t.label)) + '">' + esc(t.label) + "<small>" + esc(T.count(n)) + "</small></button>" });
      });
      Object.keys(cross).forEach(function (key) {
        var p = key.split("-"); edges.push([idx["t" + p[0]], idx["t" + p[1]], 0.4 + cross[key] * 0.25, cross[key]]);
      });
    } else {
      seed = ti + 1;
      var core = words.filter(function (w) { return w.topic === ti; }), outer = [], level = {};
      core.forEach(function (w) { level[w.id] = 0; });
      core.forEach(function (w) { adj[w.id].forEach(function (r) { if (level[r] == null) { level[r] = 1; outer.push(byId[r]); } }); });
      // a topic with only a few words of its own also shows the neighbours of its neighbours, so the map is never bare
      var wide = core.length < 5;
      if (wide) {
        var cand = {};
        outer.slice().forEach(function (o) { adj[o.id].forEach(function (r) { if (level[r] == null) cand[r] = (cand[r] || 0) + 1; }); });
        Object.keys(cand).sort(function (a, b) { return cand[b] - cand[a] || (a < b ? -1 : 1); }).slice(0, 8).forEach(function (r) { level[r] = 2; outer.push(byId[r]); });
      }
      core.forEach(function (w) { add({ id: w.id, core: true, html: '<button type="button" class="gl-node" style="--h:' + topics[w.topic].hue + '" data-id="' + esc(w.id) + '" aria-haspopup="dialog">' + esc(w.term) + "</button>" }); });
      outer.forEach(function (w) { add({ id: w.id, core: false, html: '<button type="button" class="gl-node out" style="--h:' + topics[w.topic].hue + '" data-id="' + esc(w.id) + '" aria-haspopup="dialog">' + esc(w.term) + "</button>" }); });
      (D.edges || []).forEach(function (e) {
        if (level[e[0]] != null && level[e[1]] != null && Math.min(level[e[0]], level[e[1]]) <= (wide ? 1 : 0)) edges.push([idx[e[0]], idx[e[1]], 1, 0, e[0], e[1]]);
      });
      $("#glMapTitle").textContent = topics[ti].label;
      $("#glMapNote").textContent = T.mapNote(core.length, outer.length);
    }
    if (all) { $("#glMapTitle").textContent = T.mapTitleAll; $("#glMapNote").textContent = T.mapNoteAll; }
    $("#glMapHelp").textContent = all ? T.mapHelpAll : T.mapHelp;
    $("#glMapPlay").hidden = all;

    // measure the real size of every label, then lay the nodes out
    canvas.className = "gl-mapcanvas measuring";
    canvas.style.width = "2400px"; canvas.style.height = "1600px"; canvas.style.transform = "none";
    canvas.innerHTML = nodes.map(nodeHtml).join("");
    var els = canvas.querySelectorAll(".gl-node");
    nodes.forEach(function (nd, i) { nd.el = els[i]; nd.w = els[i].offsetWidth; nd.h = els[i].offsetHeight; });
    layout(nodes, edges, seed, all, all && window.innerWidth <= 640);

    var minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9, M = 36;
    nodes.forEach(function (nd) {
      minX = Math.min(minX, nd.x - nd.w / 2); maxX = Math.max(maxX, nd.x + nd.w / 2);
      minY = Math.min(minY, nd.y - nd.h / 2); maxY = Math.max(maxY, nd.y + nd.h / 2);
    });
    mapW = Math.ceil(maxX - minX + M * 2); mapH = Math.ceil(maxY - minY + M * 2);
    mapEls = {}; mapEdges = [];
    var cx0 = 1e9, cy0 = 1e9, cx1 = -1e9, cy1 = -1e9;
    nodes.forEach(function (nd) {
      nd.x = nd.x - minX + M; nd.y = nd.y - minY + M;   // x, y are now the node's centre inside the canvas
      nd.el.style.left = Math.round(nd.x - nd.w / 2) + "px";
      nd.el.style.top = Math.round(nd.y - nd.h / 2) + "px";
      mapEls[nd.id] = nd.el;
      if (nd.core) { cx0 = Math.min(cx0, nd.x); cx1 = Math.max(cx1, nd.x); cy0 = Math.min(cy0, nd.y); cy1 = Math.max(cy1, nd.y); }
    });
    mapCore = { x: (cx0 + cx1) / 2, y: (cy0 + cy1) / 2 };
    if (!all && core.length === 1) mapCore = { x: mapW / 2, y: mapH / 2 };   // a lone word: centre the view on the whole map
    var lines = edges.map(function (e) {
      var A = nodes[e[0]], B = nodes[e[1]], cls = "gl-edge";
      if (all) return '<line class="' + cls + '" x1="' + A.x.toFixed(1) + '" y1="' + A.y.toFixed(1) + '" x2="' + B.x.toFixed(1) + '" y2="' + B.y.toFixed(1) + '" stroke-width="' + (1.4 + e[3] * 0.7).toFixed(1) + '"></line>';
      var a = byId[e[4]], b = byId[e[5]];
      if (a.topic !== b.topic) cls += " cross";
      mapEdges.push({ a: e[4], b: e[5] });
      return '<line class="' + cls + '" style="--h:' + topics[ti].hue + '" data-a="' + esc(e[4]) + '" data-b="' + esc(e[5]) + '" x1="' + A.x.toFixed(1) + '" y1="' + A.y.toFixed(1) + '" x2="' + B.x.toFixed(1) + '" y2="' + B.y.toFixed(1) + '"></line>';
    }).join("");
    canvas.insertAdjacentHTML("afterbegin", '<svg class="gl-edges" width="' + mapW + '" height="' + mapH + '" viewBox="0 0 ' + mapW + " " + mapH + '" aria-hidden="true">' + lines + "</svg>");
    canvas.className = "gl-mapcanvas";
    canvas.style.width = mapW + "px"; canvas.style.height = mapH + "px";
    selectNode(mapSel && mapEls[mapSel] ? mapSel : null);
    fitMap(true, all);
  }

  function viewSize() { var s = $("#glMapScroll"); return { w: s.clientWidth, h: s.clientHeight }; }
  function applyScale(s, keepCentre) {
    var sc = $("#glMapScroll"), v = viewSize(), cx, cy;
    if (keepCentre) { cx = (sc.scrollLeft + v.w / 2) / mapScale; cy = (sc.scrollTop + v.h / 2) / mapScale; }
    mapScale = Math.max(0.3, Math.min(1.6, s));
    $("#glMapCanvas").style.transform = "scale(" + mapScale + ")";
    $("#glMapSizer").style.width = Math.ceil(mapW * mapScale) + "px";
    $("#glMapSizer").style.height = Math.ceil(mapH * mapScale) + "px";
    if (keepCentre) { sc.scrollLeft = cx * mapScale - v.w / 2; sc.scrollTop = cy * mapScale - v.h / 2; }
  }
  // exact = show the whole map; otherwise a readable size, centred on the topic's own words
  function fitMap(first, exact) {
    var sc = $("#glMapScroll"), w = sc.clientWidth; if (!w) return;
    var phone = window.innerWidth <= 640, root = document.documentElement, z = root.hasAttribute("data-ds-size") ? (parseFloat(root.style.getPropertyValue("--ds-zoom")) || 1) : 1;   // the reader's text size zooms the page, so the screen limits are divided by it
    var cap = Math.min(window.innerHeight * (phone ? 0.6 : 0.7), phone ? 500 : 560) / z;
    var fit = Math.min(w / mapW, cap / mapH), s = exact ? Math.min(1, fit) : Math.min(1, Math.max(0.6, fit));
    applyScale(s, false);
    sc.scrollLeft = mapCore.x * mapScale - sc.clientWidth / 2; sc.scrollTop = mapCore.y * mapScale - sc.clientHeight / 2;
  }

  function selectNode(id) {
    mapSel = id && mapEls[id] ? id : null;
    var canvas = $("#glMapCanvas"), rel = mapSel ? adj[mapSel] : [];
    Object.keys(mapEls).forEach(function (k) {
      var el = mapEls[k];
      el.classList.toggle("sel", k === mapSel);
      el.classList.toggle("rel", rel.indexOf(k) >= 0);
    });
    canvas.classList.toggle("has-sel", !!mapSel);
    canvas.querySelectorAll(".gl-edge[data-a]").forEach(function (l) {
      l.classList.toggle("on", !!mapSel && (l.dataset.a === mapSel || l.dataset.b === mapSel));
    });
  }

  function showMap(topicValue, wordId) {
    if (topicValue != null) { mapTopic = String(topicValue); mapSel = wordId || null; }
    wordView = "map";
    GG.setView("map");
  }

  // marks the words that are in the glossary, on the map, in the list and in the sheet
  function markKept() {
    Object.keys(mapEls).forEach(function (k) { if (byId[k]) mapEls[k].classList.toggle("kept", isKept(byId[k])); });
    pane.querySelectorAll(".gl-bubble[data-key]").forEach(function (b) { var it = lookup(b.dataset.key); b.classList.toggle("kept", !!it && isKept(it)); });
  }

  function renderWords() {
    press($("#glWordView"), "wv", wordView);
    $("#glMap").hidden = wordView !== "map"; $("#glListBox").hidden = wordView !== "az";
    $("#glMapTopic").value = mapTopic;
    if (wordView === "map") { mapSig = displaySig(); renderMap(); } else renderList();
    markKept();
  }

  // ---- cards ------------------------------------------------------------
  function refreshDeckOptions() {
    var sel = $("#glDeck"); if (!sel) return;
    var cur = cfg.deck == null ? "" : String(cfg.deck);
    sel.innerHTML = '<option value="kept">' + esc(T.deckKept(keptList().length)) + '</option><option value="all">' + esc(T.deckAll) + "</option>" + topicOptions();
    if (cur) sel.value = cur;
  }
  function ensureDeck() {
    if (cfg.deck == null) cfg.deck = keptList().length ? "kept" : "all";
    $("#glDeck").value = cfg.deck;
  }
  function newRound(keys) {
    if (!keys) {
      var pool = cfg.deck === "kept" ? keptList().map(keptItem)
        : words.filter(function (w) { return cfg.deck === "all" || w.topic === +cfg.deck; });
      items = {};
      pool.forEach(function (it) { items[itemKey(it)] = it; });
      var n = cfg.size === "all" ? pool.length : Math.min(+cfg.size, pool.length);
      keys = shuffle(pool.map(itemKey)).slice(0, n);
    } else keys = shuffle(keys);
    deck = keys;
    round = { total: deck.length, firstTry: 0, missed: [] };
    showCard();
  }
  function showCard() {
    var box = $("#glCard");
    if (!round || !round.total) {
      box.innerHTML = '<div class="gl-done"><p>' + esc(T.emptyKept) + '</p><div class="gl-answer"><button type="button" class="gg-btn" id="glGoMap">' + esc(T.goMap) + '</button><button type="button" class="gg-btn primary" id="glGoWander">' + esc(T.goWander) + "</button></div></div>";
      return;
    }
    if (!deck.length) {
      box.innerHTML = '<div class="gl-done"><div class="gl-big">' + esc(T.done) + "</div><p>" + esc(T.score(round.firstTry, round.total)) + "</p>" +
        (round.missed.length ? '<p class="gl-note">' + esc(T.missed) + '</p><div class="gl-bubbles center">' + round.missed.map(function (k) { return bubble(lookup(k)); }).join("") + "</div>" : "") +
        '<div class="gl-answer"><button type="button" class="gg-btn' + (round.missed.length ? "" : " primary") + '" id="glAgain">' + esc(T.newRound) + "</button>" +
        (round.missed.length ? '<button type="button" class="gg-btn primary" id="glPractise">' + esc(T.practise) + "</button>" : "") + "</div></div>";
      markKept();
      return;
    }
    var it = lookup(deck[0]);
    var termFirst = cfg.dir === "mixed" ? Math.random() < 0.5 : cfg.dir === "term";
    var u = safeUrl(it.link);
    var meaning = '<span class="gl-label">' + esc(T.meaning) + '</span><p class="gl-text">' + esc(it.body) + "</p>";
    var word = '<span class="gl-label">' + esc(T.word) + '</span><div class="gl-big' + (it.term.length > 26 ? " long" : "") + '">' + esc(it.term) + "</div>";
    var tag = it.topic != null ? topics[it.topic].label : (it.lang && it.lang !== LANG ? it.lang.toUpperCase() : "");
    var back = termFirst ? meaning + (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(linkLabel(u)) + " ↗</a>" : "")
      : word + (tag ? '<span class="gl-hint">' + esc(tag) + "</span>" : "");
    flipped = false;
    box.innerHTML = '<div class="gl-stats" aria-live="polite"><span>' + esc(T.left(deck.length)) + "</span><span>" + esc(T.right(round.firstTry)) + "</span></div>" +
      '<div class="gl-flip" id="glFlip" role="button" tabindex="0" aria-pressed="false" aria-label="' + esc(T.flip) + '"><div class="gl-flip-in">' +
        '<div class="gl-face front" aria-hidden="false">' + (termFirst ? word : meaning) + '<span class="gl-hint">' + esc(T.tap) + "</span></div>" +
        '<div class="gl-face back" aria-hidden="true">' + back + "</div></div></div>" +
      '<div class="gl-answer" id="glAnswer" hidden><button type="button" class="gg-btn" data-ans="0">' + esc(T.again) + '</button><button type="button" class="gg-btn primary" data-ans="1">' + esc(T.got) + "</button></div>";
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
    var k = deck.shift();
    focusNext = true;
    if (ok) { if (round.missed.indexOf(k) < 0) round.firstTry++; }
    else { if (round.missed.indexOf(k) < 0) round.missed.push(k); deck.push(k); }
    showCard();
  }

  // ---- views and events -------------------------------------------------
  // after a topic is chosen, bring the top of the game to the top of the screen so the map or the card is what the reader sees
  function reveal() {
    var calm = document.documentElement.hasAttribute("data-ds-calm") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    var y = document.getElementById("app").getBoundingClientRect().top + window.pageYOffset - 64;
    try { window.scrollTo({ top: Math.max(0, y), behavior: calm ? "auto" : "smooth" }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
  }
  function show(v) {
    active = true; view = v;
    $("#glWords").hidden = v !== "map"; $("#glCards").hidden = v !== "cards";
    if (v === "map") renderWords();
    else { ensureDeck(); if (round) showCard(); else newRound(); }
  }

  pane.addEventListener("click", function (e) {
    if (e.target.id === "glSheet") { closeSheet(); return; }
    var b = e.target.closest("button, a");
    if (!b) {
      if (e.target.closest("#glFlip")) flipCard();
      else if (e.target.closest("#glMapCanvas")) selectNode(null);
      return;
    }
    if (b.dataset.maptopic != null) {
      if (b.classList.contains("gl-tag")) closeSheet();
      var fromHub = b.classList.contains("hub"), word = b.dataset.mapword || null;
      showMap(b.dataset.maptopic, word);
      if (!fromHub) reveal();
      if (word && mapEls[word]) { var el = mapEls[word], sc = $("#glMapScroll"); sc.scrollLeft = el.offsetLeft * mapScale - viewSize().w / 2 + el.offsetWidth * mapScale / 2; sc.scrollTop = el.offsetTop * mapScale - viewSize().h / 2 + el.offsetHeight * mapScale / 2; }
      return;
    }
    if (b.classList.contains("gl-bubble") || b.classList.contains("gl-node")) { openSheet(b.dataset.key || b.dataset.id); return; }
    if (b.dataset.wv) { wordView = b.dataset.wv; renderWords(); return; }
    if (b.dataset.dir) { cfg.dir = b.dataset.dir; press($("#glDirs"), "dir", cfg.dir); newRound(); return; }
    if (b.dataset.ans) { answer(b.dataset.ans === "1"); return; }
    var it;
    switch (b.id) {
      case "glRandom": var pick = shuffle(words)[0]; if (pick) openSheet(pick.id); break;
      case "glClose": closeSheet(); break;
      case "glKeep": it = lookup(sheetKey); if (it) GG.toggle(entryOf(it)); break;
      case "glWander":
        it = lookup(sheetKey); closeSheet();
        if (it) { if (it.id) GG.wanderStarter(it.term, it.wiki); else GG.wanderFrom(it.term, it.lang); }
        break;
      case "glAgain": focusNext = true; newRound(); break;
      case "glPractise": focusNext = true; newRound(round.missed.slice()); break;
      case "glZoomIn": applyScale(mapScale * 1.25, true); break;
      case "glZoomOut": applyScale(mapScale / 1.25, true); break;
      case "glFit": fitMap(false, true); break;
      case "glMapPlay": cfg.deck = mapTopic; focusNext = false; round = null; GG.setView("cards"); reveal(); break;
      case "glGoMap": wordView = "map"; GG.setView("map"); break;
      case "glGoWander": GG.setView("wander"); break;
    }
  });
  pane.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.id === "glFlip") { e.preventDefault(); flipCard(); }
  });
  pane.addEventListener("input", function (e) { if (e.target.id === "glSearch") renderList(); });
  pane.addEventListener("change", function (e) {
    var el = e.target;
    if (el.id === "glDeck") {
      var v = el.value;
      if (v === "kept" || v === "all") { cfg.deck = v; newRound(); return; }
      el.value = cfg.deck;   // a topic opens its map first; Play there starts the cards
      showMap(v, null); reveal();
    } else if (el.id === "glSize") { cfg.size = el.value; newRound(); }
    else if (el.id === "glMapTopic") { mapTopic = el.value; mapSel = null; renderMap(); markKept(); }
  });

  // the map is laid out again when the width or the reader's display settings (font, size, spacing) change, not when a phone's address bar slides away
  var resizeTimer;
  function displaySig() { var r = document.documentElement; return [window.innerWidth, r.getAttribute("data-ds-font"), r.style.getPropertyValue("--ds-zoom"), r.style.getPropertyValue("--ds-ls"), r.style.getPropertyValue("--ds-lh")].join("|"); }
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { var sig = displaySig(); if (active && view === "map" && wordView === "map" && sig !== mapSig) { mapSig = sig; renderMap(); markKept(); } }, 200);
  });

  // the game announces its views, its language and changes to the glossary
  document.addEventListener("gg:view", function (e) {
    var v = e.detail;
    if (v === "map" || v === "cards") show(v); else { active = false; closeSheet(); }
  });
  document.addEventListener("gg:lang", function () {
    closeSheet(); setup(); build(); round = null; deck = []; items = {}; mapSel = null;
    if (active) show(view);
  });
  document.addEventListener("gg:glossary", function () { refreshDeckOptions(); markKept(); refreshSheetKeep(); });

  window.GGStudy = {
    openCards: function (d) { cfg.deck = d; round = null; focusNext = false; GG.setView("cards"); reveal(); }
  };

  setup(); build();
  var v0 = GG.view();
  if (v0 === "map" || v0 === "cards") show(v0);
})();
