/* Glossary Game: browse the words as bubbles, open a topic as a map of related words, or learn them with flip cards.
   The page language comes from <html lang> (en, fr or es); the words and their connections come from terms.js.
   Nothing is sent anywhere and nothing is stored: a round lives in the page until it is closed. */
(function () {
  "use strict";
  var D = window.GLOSSARY, app = document.getElementById("app");
  if (!D || !app) return;

  var LANG = (document.documentElement.lang || "en").slice(0, 2).toLowerCase();
  if (!/^(en|fr|es)$/.test(LANG)) LANG = "en";

  var TXT = {
    en: {
      view: "Glossary view", explore: "Explore", map: "Map", cards: "Cards",
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
      sep: "Stanford Encyclopedia (in English)", wiki: "Wikipedia (in English)", more: "Read more",
      mapLink: "Open map", related: "Related words",
      openMap: function (l) { return "Open the map: " + l; },
      mapTitleAll: "All topics", mapNoteAll: "Choose a topic to open its map.",
      count: function (n) { return n === 1 ? "1 word" : n + " words"; },
      mapNote: function (n, m) { return (n === 1 ? "1 word" : n + " words") + (m ? " · " + m + " related from other topics" : ""); },
      mapHelp: "Tap a word for its meaning and what it connects to. Dashed words belong to other topics.",
      mapHelpAll: "Tap a topic to open its map. Lines show words that connect across topics.",
      mapAria: "Map of related words. Scroll to explore.",
      play: "Play cards on this topic", zoomIn: "Zoom in", zoomOut: "Zoom out", fit: "Fit"
    },
    fr: {
      view: "Vue du glossaire", explore: "Explorer", map: "Réseau", cards: "Cartes",
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
      sep: "Stanford Encyclopedia (en anglais)", wiki: "Wikipédia (en anglais)", more: "En savoir plus",
      mapLink: "Voir le réseau", related: "Mots liés",
      openMap: function (l) { return "Ouvrir le réseau : " + l; },
      mapTitleAll: "Tous les thèmes", mapNoteAll: "Choisissez un thème pour ouvrir son réseau.",
      count: function (n) { return n + (n > 1 ? " mots" : " mot"); },
      mapNote: function (n, m) { return n + (n > 1 ? " mots" : " mot") + (m ? " · " + m + " lié" + (m > 1 ? "s" : "") + " venant d’autres thèmes" : ""); },
      mapHelp: "Touchez un mot pour voir son sens et ses liens. Les mots en pointillés viennent d’autres thèmes.",
      mapHelpAll: "Touchez un thème pour ouvrir son réseau. Les lignes relient les mots qui se répondent d’un thème à l’autre.",
      mapAria: "Réseau des mots liés. Faites défiler pour explorer.",
      play: "Jouer aux cartes de ce thème", zoomIn: "Agrandir", zoomOut: "Réduire", fit: "Tout voir"
    },
    es: {
      view: "Vista del glosario", explore: "Explorar", map: "Mapa", cards: "Tarjetas",
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
      sep: "Stanford Encyclopedia (en inglés)", wiki: "Wikipedia (en inglés)", more: "Más información",
      mapLink: "Ver el mapa", related: "Palabras relacionadas",
      openMap: function (l) { return "Abrir el mapa: " + l; },
      mapTitleAll: "Todos los temas", mapNoteAll: "Elige un tema para abrir su mapa.",
      count: function (n) { return n === 1 ? "1 palabra" : n + " palabras"; },
      mapNote: function (n, m) { return (n === 1 ? "1 palabra" : n + " palabras") + (m ? " · " + m + " relacionada" + (m > 1 ? "s" : "") + " de otros temas" : ""); },
      mapHelp: "Toca una palabra para ver su significado y sus conexiones. Las palabras punteadas son de otros temas.",
      mapHelpAll: "Toca un tema para abrir su mapa. Las líneas unen palabras que se conectan entre temas.",
      mapAria: "Mapa de palabras relacionadas. Desplázate para explorar.",
      play: "Jugar con las tarjetas de este tema", zoomIn: "Acercar", zoomOut: "Alejar", fit: "Ver todo"
    }
  };
  var T = TXT[LANG];

  // ---- data -------------------------------------------------------------
  var topics = D.topics.map(function (t, i) { return { label: t[LANG], hue: (215 + i * 67) % 360 }; });
  var words = D.terms.map(function (t, i) {
    return { id: t.id, topic: t.topic, term: t[LANG][0], body: t[LANG][1], link: t.link || "", order: i };
  });
  var byId = {}, adj = {};
  words.forEach(function (w) { byId[w.id] = w; adj[w.id] = []; });
  (D.edges || []).forEach(function (e) {
    if (byId[e[0]] && byId[e[1]]) { adj[e[0]].push(e[1]); adj[e[1]].push(e[0]); }
  });

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
  function topicOptions() { return topics.map(function (t, i) { return '<option value="' + i + '">' + esc(t.label) + "</option>"; }).join(""); }

  // ---- page skeleton ----------------------------------------------------
  app.innerHTML =
    seg("glModes", T.view, "mode", [["explore", T.explore], ["map", T.map], ["cards", T.cards]], "explore") +
    '<div class="gl-pane" id="glExplore">' +
      '<div class="gl-today" id="glToday"><div class="gl-head"><h2>' + esc(T.random) + '</h2><button type="button" class="gl-small" id="glShuffle">' + esc(T.shuffle) + '</button></div><div class="gl-bubbles" id="glTodayList"></div></div>' +
      '<input id="glSearch" class="gl-input" type="search" autocomplete="off" placeholder="' + esc(T.search(words.length)) + '" aria-label="' + esc(T.searchLabel) + '">' +
      seg("glSorts", T.order, "sort", [["az", T.az], ["topic", T.topic], ["new", T.newest], ["mix", T.mix]], "az") +
      '<div class="gl-pane" id="glList"></div>' +
    "</div>" +
    '<div class="gl-pane" id="glMap" hidden>' +
      '<label class="gl-field"><span>' + esc(T.topicLabel) + '</span><select id="glMapTopic" class="gl-input"><option value="all">' + esc(T.allTopics) + "</option>" + topicOptions() + "</select></label>" +
      '<div class="gl-maphead"><h2 id="glMapTitle"></h2><p id="glMapNote"></p></div>' +
      '<div class="gl-maptools">' +
        '<button type="button" id="glZoomOut" aria-label="' + esc(T.zoomOut) + '">−</button>' +
        '<button type="button" id="glFit" class="wide">' + esc(T.fit) + "</button>" +
        '<button type="button" id="glZoomIn" aria-label="' + esc(T.zoomIn) + '">+</button></div>' +
      '<div class="gl-mapbox">' +
        '<div class="gl-mapscroll" id="glMapScroll" tabindex="0" role="region" aria-label="' + esc(T.mapAria) + '"><div class="gl-mapsizer" id="glMapSizer"><div class="gl-mapcanvas" id="glMapCanvas"></div></div></div></div>' +
      '<p class="gl-maphelp" id="glMapHelp"></p>' +
      '<button type="button" class="gl-btn primary" id="glMapPlay" hidden>' + esc(T.play) + "</button>" +
    "</div>" +
    '<div class="gl-pane" id="glCards" hidden>' +
      seg("glDirs", T.side, "dir", [["mixed", T.mixed], ["term", T.termFirst], ["def", T.defFirst]], "mixed") +
      '<div class="gl-setup">' +
        '<label><span>' + esc(T.topicLabel) + '</span><select id="glTopic" class="gl-input"><option value="all">' + esc(T.allTopics) + "</option>" + topicOptions() + "</select></label>" +
        '<label><span>' + esc(T.roundLabel) + '</span><select id="glSize" class="gl-input"><option value="10">' + esc(T.cardsN(10)) + '</option><option value="20">' + esc(T.cardsN(20)) + '</option><option value="all">' + esc(T.all) + "</option></select></label>" +
      "</div>" +
      '<div class="gl-pane" id="glCard"></div>' +
    "</div>" +
    '<dialog class="gl-sheet" id="glSheet" aria-labelledby="glSheetTitle"><div class="gl-sheet-in"><div class="gl-sheet-body" id="glSheetBody"></div>' +
      '<div class="gl-sheet-actions"><button type="button" class="gl-btn" id="glAnother">' + esc(T.another) + '</button><button type="button" class="gl-btn primary" id="glClose">' + esc(T.close) + "</button></div></div></dialog>";

  var sheet = $("#glSheet"), sheetId = null, mode = "explore";
  var sortMode = "az", mix = shuffle(words).map(function (w) { return w.id; }), today = [];
  var cfg = { dir: "mixed", topic: "all", size: "10" }, deck = [], round = null, flipped = false, focusNext = false;
  var mapTopic = "all", mapSel = null, mapScale = 1, mapW = 0, mapH = 0, mapCore = null, mapEls = {}, mapEdges = [];

  // ---- explore ----------------------------------------------------------
  function pickToday() {
    today = shuffle(words).slice(0, 5).map(function (w) { return w.id; });
    $("#glTodayList").innerHTML = today.map(function (id) { return bubble(byId[id], true); }).join("");
  }
  function group(title, arr, topicIndex) {
    return '<section class="gl-group"><h3><span>' + esc(title) + " · " + arr.length + "</span>" +
      (topicIndex != null ? '<button type="button" class="gl-maplink" data-maptopic="' + topicIndex + '" aria-label="' + esc(T.openMap(title)) + '">' + esc(T.mapLink) + " →</button>" : "") +
      '</h3><div class="gl-bubbles">' + arr.map(function (w) { return bubble(w); }).join("") + "</div></section>";
  }
  function renderList() {
    var q = plain($("#glSearch").value.trim());
    $("#glToday").hidden = !!q;
    var list = words.filter(function (w) { return !q || plain(w.term + " " + w.body + " " + topics[w.topic].label).indexOf(q) >= 0; });
    var html;
    if (!list.length) html = '<p class="gl-empty">' + esc(T.none) + "</p>";
    else if (sortMode === "topic") {
      html = topics.map(function (t, i) { var a = list.filter(function (w) { return w.topic === i; }); return a.length ? group(t.label, a, i) : ""; }).join("");
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
    var u = safeUrl(w.link), rel = adj[id].map(function (r) { return byId[r]; });
    $("#glSheetBody").innerHTML =
      '<button type="button" class="gl-tag" style="--h:' + topics[w.topic].hue + '" data-maptopic="' + w.topic + '" data-mapword="' + esc(id) + '" aria-label="' + esc(T.openMap(topics[w.topic].label)) + '">' + esc(topics[w.topic].label) + " →</button>" +
      '<h2 id="glSheetTitle">' + esc(w.term) + "</h2><p>" + esc(w.body) + "</p>" +
      (u ? '<a href="' + esc(u) + '" target="_blank" rel="noopener">' + esc(linkLabel(u)) + " ↗</a>" : "") +
      (rel.length ? '<p class="gl-note">' + esc(T.related) + '</p><div class="gl-bubbles">' + rel.map(function (r) { return bubble(r); }).join("") + "</div>" : "");
    if (!sheet.open) { if (sheet.showModal) sheet.showModal(); else sheet.setAttribute("open", ""); }
    $("#glSheet").scrollTop = 0;
    if (mode === "map") selectNode(id);
  }
  function closeSheet() { if (sheet.close) sheet.close(); else sheet.removeAttribute("open"); }

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
    var phone = window.innerWidth <= 640, cap = Math.min(window.innerHeight * (phone ? 0.6 : 0.7), phone ? 500 : 560);
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
    if (topicValue != null) { mapTopic = String(topicValue); $("#glMapTopic").value = mapTopic; mapSel = wordId || null; }
    setMode("map");
  }

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
  // after a click on a mode or a topic, bring the top of the game to the top of the screen so the map or the card is what the reader sees
  function reveal() {
    var calm = document.documentElement.hasAttribute("data-ds-calm") || (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches);
    var y = app.getBoundingClientRect().top + window.pageYOffset - 64;
    try { window.scrollTo({ top: Math.max(0, y), behavior: calm ? "auto" : "smooth" }); } catch (e) { window.scrollTo(0, Math.max(0, y)); }
  }
  function setMode(m, keepHash) {
    mode = m;
    press($("#glModes"), "mode", m);
    $("#glExplore").hidden = m !== "explore";
    $("#glMap").hidden = m !== "map";
    $("#glCards").hidden = m !== "cards";
    if (m === "map") { mapSig = displaySig(); renderMap(); }
    if (!keepHash) reveal();
    if (m === "cards" && !round) newRound();
    if (!keepHash && window.history && history.replaceState) { try { history.replaceState(null, "", m === "explore" ? location.pathname + location.search : "#" + m); } catch (e) {} }
  }

  app.addEventListener("click", function (e) {
    var b = e.target.closest("button, a");
    if (!b) {
      if (e.target.closest("#glFlip")) flipCard();
      else if (e.target.closest("#glMapCanvas")) selectNode(null);
      return;
    }
    if (b.dataset.maptopic != null) {
      if (b.classList.contains("gl-tag")) closeSheet();
      showMap(b.dataset.maptopic, b.dataset.mapword || null);
      if (b.dataset.mapword && mapEls[b.dataset.mapword]) { var el = mapEls[b.dataset.mapword], sc = $("#glMapScroll"); sc.scrollLeft = el.offsetLeft * mapScale - viewSize().w / 2 + el.offsetWidth * mapScale / 2; sc.scrollTop = el.offsetTop * mapScale - viewSize().h / 2 + el.offsetHeight * mapScale / 2; }
      return;
    }
    if (b.classList.contains("gl-bubble") || b.classList.contains("gl-node")) { openSheet(b.dataset.id); return; }
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
      case "glZoomIn": applyScale(mapScale * 1.25, true); break;
      case "glZoomOut": applyScale(mapScale / 1.25, true); break;
      case "glFit": fitMap(false, true); break;
      case "glMapPlay": cfg.topic = mapTopic; $("#glTopic").value = mapTopic; focusNext = false; setMode("cards"); newRound(); break;
    }
  });
  app.addEventListener("keydown", function (e) {
    if ((e.key === "Enter" || e.key === " ") && e.target.id === "glFlip") { e.preventDefault(); flipCard(); }
  });
  sheet.addEventListener("click", function (e) { if (e.target === sheet) closeSheet(); });
  $("#glSearch").addEventListener("input", renderList);
  // choosing a topic opens its map; "All topics" starts a round straight away
  $("#glTopic").addEventListener("change", function (e) {
    var v = e.target.value;
    if (v === "all") { cfg.topic = "all"; newRound(); return; }
    e.target.value = cfg.topic;
    showMap(v, null);
  });
  $("#glMapTopic").addEventListener("change", function (e) { mapTopic = e.target.value; mapSel = null; renderMap(); });
  $("#glSize").addEventListener("change", function (e) { cfg.size = e.target.value; newRound(); });

  // the map is laid out again when the width or the reader's display settings (font, size, spacing) change, not when a phone's address bar slides away
  var resizeTimer, mapSig = "";
  function displaySig() { var r = document.documentElement; return [window.innerWidth, r.getAttribute("data-ds-font"), r.style.getPropertyValue("--ds-zoom"), r.style.getPropertyValue("--ds-ls"), r.style.getPropertyValue("--ds-lh")].join("|"); }
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { var sig = displaySig(); if (mode === "map" && sig !== mapSig) { mapSig = sig; renderMap(); } }, 200);
  });
  mapSig = displaySig();

  pickToday();
  renderList();
  function fromHash() { var h = location.hash.replace("#", ""); return h === "cards" || h === "map" ? h : "explore"; }
  if (fromHash() !== "explore") setMode(fromHash(), true);
  window.addEventListener("hashchange", function () { setMode(fromHash(), true); });
})();
