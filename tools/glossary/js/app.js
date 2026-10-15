/* Glossary Game. Terms, definitions and links come live from Wikipedia (CC BY-SA). Nothing is stored on a server;
   the glossary lives in this browser (localStorage "cv-glossary"). */
(function () {
  "use strict";

  var UI = {
    en: {
      modeWander: "Free wander", modeConnect: "Connect two terms", startLabel: "Start term", targetLabel: "Target term",
      go: "Start", random: "Surprise me", phStart: "For example: pulsar", phTarget: "For example: music",
      hintWander: "Pick a term, then follow the links that interest you. Keep the terms you want in your glossary.",
      hintConnect: "Pick two terms and the game finds the shortest chain of links between them, then you can explore around it.", searching: "Searching for the shortest path…", noPath: "No path found within the search limits. Try two other terms.", morePaths: " · {k} other shortest path(s) shown", pathFound: "Shortest path ({n} steps): {p}",
      legVisited: "Visited", legCurrent: "Current", legNear: "Next steps", legKept: "Kept",
      back: "← Back", keep: "☆ Keep in glossary", kept: "★ Kept", article: "Article ↗", nextSteps: "Where to next",
      glossaryTitle: "Your glossary", export: "Download as Markdown", clear: "Clear", glossaryEmpty: "Terms you keep will appear here, with their definitions.",
      remove: "Remove", loading: "Loading from Wikipedia…", errNet: "Wikipedia cannot be reached. Check your connection and try again.",
      errNotFound: "No article found for “{t}”. Try another word.", needStart: "Type a start term, or press Surprise me.", needTarget: "Type a target term for the second field.",
      noNeighbours: "No links found in the opening of this article.", stepsFmt: "Step {n}", targetIs: "Target: {t}",
      win: "You reached {t} in {n} steps.", confirmClear: "Remove every term from your glossary?", graphLabel: "Graph of the terms you have visited",
      exportTitle: "My glossary", exportBy: "Made with the Glossary Game by CosmoVentures: https://cosmoventures.fr/tools/glossary/", exportSrc: "Definitions from Wikipedia, available under CC BY-SA 4.0.", visit: "Visit"
    },
    es: {
      modeWander: "Paseo libre", modeConnect: "Conectar dos términos", startLabel: "Término de inicio", targetLabel: "Término objetivo",
      go: "Empezar", random: "Sorpréndeme", phStart: "Por ejemplo: púlsar", phTarget: "Por ejemplo: música",
      hintWander: "Elige un término y sigue los enlaces que te interesen. Guarda en tu glosario los términos que quieras.",
      hintConnect: "Elige dos términos y el juego encuentra la cadena de enlaces más corta entre ellos; después puedes explorar a su alrededor.", searching: "Buscando el camino más corto…", noPath: "No se encontró un camino dentro de los límites de búsqueda. Prueba con otros términos.", morePaths: " · se muestran {k} camino(s) más corto(s) alternativo(s)", pathFound: "Camino más corto ({n} pasos): {p}",
      legVisited: "Visitado", legCurrent: "Actual", legNear: "Próximos pasos", legKept: "Guardado",
      back: "← Atrás", keep: "☆ Guardar en el glosario", kept: "★ Guardado", article: "Artículo ↗", nextSteps: "Hacia dónde seguir",
      glossaryTitle: "Tu glosario", export: "Descargar en Markdown", clear: "Vaciar", glossaryEmpty: "Los términos que guardes aparecerán aquí, con sus definiciones.",
      remove: "Quitar", loading: "Cargando desde Wikipedia…", errNet: "No se puede acceder a Wikipedia. Revisa tu conexión e inténtalo de nuevo.",
      errNotFound: "No hay artículo para «{t}». Prueba con otra palabra.", needStart: "Escribe un término de inicio o pulsa Sorpréndeme.", needTarget: "Escribe un término objetivo en el segundo campo.",
      noNeighbours: "No hay enlaces en la apertura de este artículo.", stepsFmt: "Paso {n}", targetIs: "Objetivo: {t}",
      win: "Llegaste a {t} en {n} pasos.", confirmClear: "¿Quitar todos los términos de tu glosario?", graphLabel: "Grafo de los términos que has visitado",
      exportTitle: "Mi glosario", exportBy: "Hecho con el Glossary Game de CosmoVentures: https://cosmoventures.fr/tools/glossary/", exportSrc: "Definiciones de Wikipedia, disponibles bajo CC BY-SA 4.0.", visit: "Visitar"
    },
    fr: {
      modeWander: "Balade libre", modeConnect: "Relier deux termes", startLabel: "Terme de départ", targetLabel: "Terme cible",
      go: "Commencer", random: "Surprenez-moi", phStart: "Par exemple : pulsar", phTarget: "Par exemple : musique",
      hintWander: "Choisissez un terme, puis suivez les liens qui vous intéressent. Gardez dans votre glossaire les termes que vous voulez.",
      hintConnect: "Choisissez deux termes : le jeu trouve la chaîne de liens la plus courte entre eux, puis vous pouvez explorer autour.", searching: "Recherche du chemin le plus court…", noPath: "Aucun chemin trouvé dans les limites de la recherche. Essayez deux autres termes.", morePaths: " · {k} autre(s) chemin(s) le(s) plus court(s) affiché(s)", pathFound: "Chemin le plus court ({n} étapes) : {p}",
      legVisited: "Visité", legCurrent: "Actuel", legNear: "Étapes suivantes", legKept: "Gardé",
      back: "← Retour", keep: "☆ Garder dans le glossaire", kept: "★ Gardé", article: "Article ↗", nextSteps: "Où aller ensuite",
      glossaryTitle: "Votre glossaire", export: "Télécharger en Markdown", clear: "Vider", glossaryEmpty: "Les termes que vous gardez apparaîtront ici, avec leurs définitions.",
      remove: "Retirer", loading: "Chargement depuis Wikipédia…", errNet: "Wikipédia est inaccessible. Vérifiez votre connexion et réessayez.",
      errNotFound: "Aucun article trouvé pour « {t} ». Essayez un autre mot.", needStart: "Saisissez un terme de départ, ou appuyez sur Surprenez-moi.", needTarget: "Saisissez un terme cible dans le second champ.",
      noNeighbours: "Aucun lien dans l'introduction de cet article.", stepsFmt: "Étape {n}", targetIs: "Cible : {t}",
      win: "Vous avez atteint {t} en {n} étapes.", confirmClear: "Retirer tous les termes de votre glossaire ?", graphLabel: "Graphe des termes visités",
      exportTitle: "Mon glossaire", exportBy: "Réalisé avec le Glossary Game de CosmoVentures : https://cosmoventures.fr/tools/glossary/", exportSrc: "Définitions issues de Wikipédia, sous licence CC BY-SA 4.0.", visit: "Visiter"
    },
    de: {
      modeWander: "Freies Wandern", modeConnect: "Zwei Begriffe verbinden", startLabel: "Startbegriff", targetLabel: "Zielbegriff",
      go: "Starten", random: "Überrasch mich", phStart: "Zum Beispiel: Pulsar", phTarget: "Zum Beispiel: Musik",
      hintWander: "Wähle einen Begriff und folge den Links, die dich interessieren. Behalte die Begriffe, die du willst, in deinem Glossar.",
      hintConnect: "Wähle zwei Begriffe: Das Spiel findet die kürzeste Linkkette dazwischen, danach kannst du die Umgebung erkunden.", searching: "Suche den kürzesten Weg…", noPath: "Innerhalb der Suchgrenzen wurde kein Weg gefunden. Versuche zwei andere Begriffe.", morePaths: " · {k} weitere kürzeste(r) Weg(e) angezeigt", pathFound: "Kürzester Weg ({n} Schritte): {p}",
      legVisited: "Besucht", legCurrent: "Aktuell", legNear: "Nächste Schritte", legKept: "Behalten",
      back: "← Zurück", keep: "☆ Im Glossar behalten", kept: "★ Behalten", article: "Artikel ↗", nextSteps: "Wohin als Nächstes",
      glossaryTitle: "Dein Glossar", export: "Als Markdown herunterladen", clear: "Leeren", glossaryEmpty: "Begriffe, die du behältst, erscheinen hier mit ihren Definitionen.",
      remove: "Entfernen", loading: "Lade von Wikipedia …", errNet: "Wikipedia ist nicht erreichbar. Prüfe deine Verbindung und versuche es erneut.",
      errNotFound: "Kein Artikel für „{t}“ gefunden. Versuche ein anderes Wort.", needStart: "Gib einen Startbegriff ein oder drücke Überrasch mich.", needTarget: "Gib im zweiten Feld einen Zielbegriff ein.",
      noNeighbours: "Keine Links in der Einleitung dieses Artikels.", stepsFmt: "Schritt {n}", targetIs: "Ziel: {t}",
      win: "Du hast {t} in {n} Schritten erreicht.", confirmClear: "Alle Begriffe aus deinem Glossar entfernen?", graphLabel: "Graph der besuchten Begriffe",
      exportTitle: "Mein Glossar", exportBy: "Erstellt mit dem Glossary Game von CosmoVentures: https://cosmoventures.fr/tools/glossary/", exportSrc: "Definitionen aus Wikipedia, verfügbar unter CC BY-SA 4.0.", visit: "Besuchen"
    }
  };

  var $ = function (id) { return document.getElementById(id); };
  var S = { lang: "en", mode: "wander", path: [], moves: 0, cur: null, target: null, won: false, nodes: {}, edges: {}, near: [], ctx: {}, hidden: {}, solution: null, req: 0 };
  var cacheSum = {}, cacheLinks = {};
  var glossary = loadGlossary();

  function t(k, v) {
    var s = (UI[S.lang] || UI.en)[k] || UI.en[k] || k;
    if (v) Object.keys(v).forEach(function (n) { s = s.replace("{" + n + "}", v[n]); });
    return s;
  }
  function loadGlossary() { try { var a = JSON.parse(localStorage.getItem("cv-glossary")); return Array.isArray(a) ? a : []; } catch (e) { return []; } }
  function saveGlossary() { try { localStorage.setItem("cv-glossary", JSON.stringify(glossary)); } catch (e) {} }
  function gkey(lang, title) { return lang + "|" + title; }
  function isKept(title) { return glossary.some(function (g) { return g.lang === S.lang && g.title === title; }); }

  /* ---------- Wikipedia ---------- */
  function base() { return "https://" + S.lang + ".wikipedia.org"; }
  function api(url) {
    return fetch(url, { headers: { Accept: "application/json" } }).then(function (r) {
      if (!r.ok) { var e = new Error("http " + r.status); e.status = r.status; throw e; }
      return r.json();
    });
  }
  function summary(title) {
    var k = gkey(S.lang, title);
    if (cacheSum[k]) return Promise.resolve(cacheSum[k]);
    return api(base() + "/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_")) + "?redirect=true").then(function (j) {
      var s = {
        title: j.title || title, description: j.description || "", extract: j.extract || "",
        url: (j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page) || (base() + "/wiki/" + encodeURIComponent((j.title || title).replace(/ /g, "_")))
      };
      cacheSum[k] = s; cacheSum[gkey(S.lang, s.title)] = s;
      return s;
    });
  }
  var NOISE = /^(\d{1,4}( \(.*\))?|(January|February|March|April|May|June|July|August|September|October|November|December|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre|Januar|Februar|März|Juni|Juli|Dezember) \d{1,2}|\d{1,2} (de )?[a-zéûäü]+( de \d{4})?)$/i;
  function addOut(out, seen, n, title) {
    if (!n || seen[n] || n === title || NOISE.test(n)) return;
    seen[n] = 1; out.push(n);
  }
  function htmlLinks(html, title) {
    var doc = new DOMParser().parseFromString(html, "text/html"), out = [], seen = {};
    doc.querySelectorAll(".infobox, .navbox, .hatnote, .shortdescription, .mw-ref, sup, style, table.sidebar, .metadata").forEach(function (e) { e.remove(); });
    doc.querySelectorAll("a[href]").forEach(function (a) {
      if (a.classList.contains("new")) return;
      var h = a.getAttribute("href") || "", m = h.match(/^(?:\.\/|\/wiki\/)([^#?]+)/);
      if (!m) return;
      var n; try { n = decodeURIComponent(m[1]).replace(/_/g, " "); } catch (e) { return; }
      if (n.indexOf(":") >= 0) return;
      addOut(out, seen, n, title);
    });
    return out;
  }
  function leadLinks(title) {
    var k = gkey(S.lang, title);
    if (cacheLinks[k]) return Promise.resolve(cacheLinks[k]);
    var q = base() + "/w/api.php?action=parse&page=" + encodeURIComponent(title) + "&redirects=1&format=json&formatversion=2&origin=*";
    return api(q + "&prop=text&section=0&disableeditsection=1&disabletoc=1").then(function (j) {
      return htmlLinks((j.parse && j.parse.text) || "", title);
    }).catch(function () { return []; }).then(function (lead) {
      if (lead.length >= 6) return lead;
      return api(q + "&prop=links").then(function (j) {
        var seen = {}, out = lead.slice(); out.forEach(function (n) { seen[n] = 1; });
        ((j.parse && j.parse.links) || []).forEach(function (l) {
          if (l.ns !== 0 || l.exists === false) return;
          addOut(out, seen, l.title, title);
        });
        return out;
      }).catch(function () { return lead; });
    }).then(function (out) {
      if (out.length >= 6) return out;
      return api(base() + "/w/api.php?action=query&list=search&srsearch=" + encodeURIComponent("morelike:" + title) + "&srlimit=12&srnamespace=0&format=json&formatversion=2&origin=*").then(function (j) {
        var seen = {}; out.forEach(function (n) { seen[n] = 1; });
        ((j.query && j.query.search) || []).forEach(function (r) { addOut(out, seen, r.title, title); });
        return out;
      }).catch(function () { return out; });
    }).then(function (out) {
      out = out.slice(0, 14);
      if (out.length) cacheLinks[k] = out;
      return out;
    });
  }

  /* ---------- shortest path (bidirectional breadth-first search over Wikipedia links) ---------- */
  function expandBatch(titles, dir) {
    var prop = dir === "f" ? "links" : "linkshere", pre = dir === "f" ? "pl" : "lh", found = [], pages = 0;
    var u = base() + "/w/api.php?action=query&format=json&formatversion=2&origin=*&prop=" + prop + "&" + pre + "namespace=0&" + pre + "limit=max" + (dir === "b" ? "&lhprop=title" : "") + "&titles=" + titles.map(encodeURIComponent).join("%7C");
    function go(extra) {
      return api(u + extra).then(function (j) {
        ((j.query && j.query.pages) || []).forEach(function (p) {
          (p[prop] || []).forEach(function (l) { found.push([p.title, l.title]); });
        });
        if (j.continue && ++pages < 3) {
          var ex = ""; Object.keys(j.continue).forEach(function (k) { ex += "&" + k + "=" + encodeURIComponent(j.continue[k]); });
          return go(ex);
        }
      });
    }
    return go("").then(function () { return found; });
  }
  function expandSide(frontier, seen, dir) {
    var take = frontier.slice(0, 60), batches = [];
    for (var i = 0; i < take.length; i += 15) batches.push(take.slice(i, i + 15));
    return Promise.all(batches.map(function (b) { return expandBatch(b, dir).catch(function () { return []; }); })).then(function (res) {
      var fresh = [], inFresh = {};
      res.forEach(function (pairs) {
        pairs.forEach(function (pr) {
          var from = pr[0], to = pr[1];
          if (inFresh[to]) { if (seen[to].indexOf(from) < 0 && seen[to].length < 6) seen[to].push(from); return; }
          if (seen[to] !== undefined || NOISE.test(to)) return;
          seen[to] = [from]; inFresh[to] = 1; fresh.push(to);
        });
      });
      return fresh;
    });
  }
  function findPath(a, b, token) {
    if (a === b) return Promise.resolve([[a]]);
    var F = {}, B = {}, fF = [a], fB = [b]; F[a] = null; B[b] = null;
    function chains(node, map) {
      var ps = map[node];
      if (ps === null) return [[node]];
      var out = [];
      ps.forEach(function (p) { chains(p, map).forEach(function (c) { if (out.length < 12) out.push(c.concat([node])); }); });
      return out;
    }
    function build(ms) {
      var all = [];
      ms.forEach(function (m) {
        chains(m, F).forEach(function (l) {
          chains(m, B).forEach(function (r) { if (all.length < 40) all.push(l.concat(r.reverse().slice(1))); });
        });
      });
      return all;
    }
    function meet(list, other) { var r = []; list.forEach(function (x) { if (other[x] !== undefined) r.push(x); }); return r; }
    function round(n) {
      if (n > 8 || token !== S.req) return Promise.resolve(null);
      var fwd = fF.length <= fB.length;
      return expandSide(fwd ? fF : fB, fwd ? F : B, fwd ? "f" : "b").then(function (fresh) {
        if (fwd) fF = fresh; else fB = fresh;
        var m = meet(fresh, fwd ? B : F);
        if (m.length) return build(m);
        if (!fF.length && !fB.length) return null;
        return round(n + 1);
      });
    }
        return round(0);
  }
  function resolveTerm(term) {
    var q = term.trim();
    return api(base() + "/w/api.php?action=opensearch&search=" + encodeURIComponent(q) + "&limit=1&namespace=0&format=json&origin=*").then(function (j) {
      var hit = j && j[1] && j[1][0];
      if (!hit) { var e = new Error("notfound"); e.notfound = q; throw e; }
      return hit;
    });
  }
  function randomTerm() { return api(base() + "/api/rest_v1/page/random/summary").then(function (j) { return j.title; }); }

  /* ---------- state ---------- */
  function resetGame() {
    S.path = []; S.moves = 0; S.cur = null; S.won = false; S.nodes = {}; S.edges = {}; S.near = []; S.solution = null; S.hidden = {}; S.solutions = []; S.solCount = {}; S.ctx = {}; S.req++;
    $("play").hidden = true; $("graph").innerHTML = "";
  }
  function addEdge(a, b, kind) {
    if (a === b) return;
    var k = a < b ? a + "\u0001" + b : b + "\u0001" + a;
    var e = S.edges[k];
    if (!e) S.edges[k] = { a: a, b: b, kind: kind };
    else if (kind === "path") e.kind = "path";
  }
  function ensureNode(title, near) {
    var n = S.nodes[title];
    if (!n) {
      var p = near && S.nodes[near];
      n = S.nodes[title] = { title: title, x: (p ? p.x : 360) + (Math.random() - .5) * 60, y: (p ? p.y : 260) + (Math.random() - .5) * 60, vx: 0, vy: 0, visited: false };
    }
    return n;
  }

  function visit(title) {
    var my = ++S.req;
    setStatus(t("loading"));
    return Promise.all([summary(title), leadLinks(title).catch(function () { return []; })]).then(function (res) {
      if (my !== S.req) return;
      var s = res[0], links = res[1], key = s.title, prev = S.cur;
      var node = ensureNode(key, prev); node.visited = true; S.hidden[key] = false;
      if (prev && prev !== key) { addEdge(prev, key, "path"); S.moves++; }
      S.path.push(key); S.cur = key; S.near = links;
      Object.keys(S.nodes).forEach(function (v) {
        if (v === key || !S.nodes[v].visited) return;
        var vl = cacheLinks[gkey(S.lang, v)] || [];
        if (links.indexOf(v) >= 0 || vl.indexOf(key) >= 0) addEdge(key, v, "link");
      });
      if (S.target && !S.solution && key.toLowerCase() === S.target.title.toLowerCase()) S.won = true;
      $("play").hidden = false;
      render();
    }).catch(function (e) {
      if (my !== S.req) return;
      setStatus(t("errNet"), "err");
    });
  }

  /* ---------- render ---------- */
  function setStatus(text, cls) {
    var el = $("status"); el.textContent = ""; if (!text) return;
    var sp = document.createElement("span"); if (cls) sp.className = cls; sp.textContent = text; el.appendChild(sp);
  }
  function updateStatus() {
    var parts = [];
    if (S.target) parts.push(t("targetIs", { t: S.target.title + (S.target.description ? " (" + S.target.description + ")" : "") }));
    if (S.solution) setStatus(t("pathFound", { n: S.solution.length - 1, p: S.solution.join(" → ") }) + (S.solutions.length > 1 ? t("morePaths", { k: S.solutions.length - 1 }) : ""), "win");
    else if (S.won) setStatus(t("win", { t: S.target.title, n: S.moves }), "win");
    else setStatus(parts.join(" · "));
  }
  function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }

  function render() {
    var s = cacheSum[gkey(S.lang, S.cur)];
    $("steps").textContent = t("stepsFmt", { n: S.moves });
    $("termTitle").textContent = s.title;
    $("termDesc").textContent = s.description;
    $("termExtract").textContent = s.extract;
    $("wikiLink").href = s.url;
    $("backBtn").disabled = S.path.length < 2;
    var kept = isKept(S.cur);
    $("keepBtn").textContent = kept ? t("kept") : t("keep");
    $("keepBtn").classList.toggle("kept", kept);
    $("keepBtn").setAttribute("aria-pressed", String(kept));
    var ul = $("near"); ul.innerHTML = "";
    if (!S.near.length) { var li = document.createElement("li"); li.className = "none"; li.textContent = t("noNeighbours"); ul.appendChild(li); }
    S.near.forEach(function (n) {
      var li = document.createElement("li"), b = document.createElement("button");
      b.type = "button"; b.textContent = n;
      if (S.nodes[n] && S.nodes[n].visited) b.className = "seen";
      b.addEventListener("click", function () { visit(n); });
      li.appendChild(b); ul.appendChild(li);
    });
    updateStatus();
    drawGraph();
    renderGlossary();
  }

  /* graph: a small force layout over visited terms plus the next steps of the current one */
  function visible() {
    var list = {}, edges = [];
    Object.keys(S.nodes).forEach(function (k) { if (S.nodes[k].visited) list[k] = S.nodes[k]; });
    var nearShown = S.hidden[S.cur] ? [] : S.near;
    nearShown.forEach(function (n) { list[n] = ensureNode(n, S.cur); });
    if (S.target) list[S.target.title] = ensureNode(S.target.title, S.cur);
    var extra = [];
    Object.keys(S.ctx || {}).forEach(function (o) {
      if (!list[o] || S.hidden[o]) return;
      S.ctx[o].forEach(function (n) { if (!list[n]) { list[n] = ensureNode(n, o); } if (!(S.nodes[n] && S.nodes[n].visited) && !(S.target && n === S.target.title)) extra.push({ a: o, b: n, kind: "ghost" }); });
    });
    Object.keys(S.edges).forEach(function (k) { var e = S.edges[k]; if (list[e.a] && list[e.b]) edges.push(e); });
    extra.forEach(function (e) { edges.push(e); });
    nearShown.forEach(function (n) { if (!(S.nodes[n] && S.nodes[n].visited)) edges.push({ a: S.cur, b: n, kind: "ghost" }); });
    return { list: list, edges: edges };
  }
  function dims() { return window.innerWidth < 640 ? { w: 380, h: 520 } : { w: 720, h: 520 }; }
  function layout(v) {
    var names = Object.keys(v.list), W = dims().w, H = dims().h, pin = {};
    if (S.target && S.path.length) {
      var s0 = S.path[0], t0 = S.target.title, vert = W < 500;
      if (v.list[s0] && v.list[t0] && s0 !== t0) {
        pin[s0] = vert ? [W / 2, 70] : [95, H / 2]; pin[t0] = vert ? [W / 2, H - 70] : [W - 95, H / 2];
        v.list[s0].x = pin[s0][0]; v.list[s0].y = pin[s0][1]; v.list[t0].x = pin[t0][0]; v.list[t0].y = pin[t0][1];
      }
    }
    for (var it = 0; it < 260; it++) {
      for (var i = 0; i < names.length; i++) {
        var a = v.list[names[i]];
        for (var j = i + 1; j < names.length; j++) {
          var b = v.list[names[j]], dx = a.x - b.x, dy = a.y - b.y, d2 = Math.max(dx * dx + dy * dy, 25), f = 7000 / d2, d = Math.sqrt(d2);
          dx = dx / d * f; dy = dy / d * f; a.vx += dx; a.vy += dy; b.vx -= dx; b.vy -= dy;
        }
        a.vx += (W / 2 - a.x) * 0.002; a.vy += (H / 2 - a.y) * 0.002;
      }
      v.edges.forEach(function (e) {
        var a = v.list[e.a], b = v.list[e.b], dx = b.x - a.x, dy = b.y - a.y, d = Math.max(Math.sqrt(dx * dx + dy * dy), 1), L = e.kind === "ghost" ? 130 : 160, f = (d - L) * 0.03;
        dx = dx / d * f; dy = dy / d * f; a.vx += dx; a.vy += dy; b.vx -= dx; b.vy -= dy;
      });
      names.forEach(function (k) {
        var n = v.list[k];
        if (pin[k]) { n.x = pin[k][0]; n.y = pin[k][1]; n.vx = n.vy = 0; return; }
        n.vx *= 0.82; n.vy *= 0.82; n.x += n.vx; n.y += n.vy;
        n.x = Math.min(W - 70, Math.max(70, n.x)); n.y = Math.min(H - 30, Math.max(30, n.y));
      });
    }
  }
  function unvisit(k) {
    var n = S.nodes[k];
    if (!n) return;
    if (k === S.path[0] || (S.solCount && S.solCount[k]) || (S.target && k === S.target.title)) { S.hidden[k] = !S.hidden[k]; drawGraph(); return; }
    var my = ++S.req;
    n.visited = false;
    Object.keys(S.edges).forEach(function (e) { var x = S.edges[e]; if (x.a === k || x.b === k) delete S.edges[e]; });
    delete S.ctx[k];
    S.path = S.path.filter(function (p) { return p !== k; });
    S.moves = Math.max(0, S.moves - 1);
    var prev = S.path[S.path.length - 1];
    leadLinks(prev).catch(function () { return []; }).then(function (l) {
      if (my !== S.req) return;
      S.cur = prev; S.near = l; S.won = false; render();
    });
  }
  function drawGraph() {
    var v = visible(); layout(v);
    var svg = $("graph"), NS = "http://www.w3.org/2000/svg", W = dims().w, H = dims().h; svg.innerHTML = "";
    svg.setAttribute("aria-label", t("graphLabel")); svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    function el(n, attrs, parent) { var e = document.createElementNS(NS, n); Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); }); (parent || svg).appendChild(e); return e; }
    var defs = el("defs", {});
    var bg = el("radialGradient", { id: "ggBg", cx: "50%", cy: "45%", r: "75%" }, defs);
    el("stop", { offset: "0", "stop-color": "#1b2150" }, bg); el("stop", { offset: "1", "stop-color": "#080a1c" }, bg);
    var f = el("filter", { id: "ggGlow", x: "-80%", y: "-80%", width: "260%", height: "260%" }, defs);
    el("feGaussianBlur", { stdDeviation: "4", result: "b" }, f);
    var mg = el("feMerge", {}, f); el("feMergeNode", { "in": "b" }, mg); el("feMergeNode", { "in": "SourceGraphic" }, mg);
    el("rect", { width: W, height: H, fill: "url(#ggBg)" });
    var seed = 7; function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    for (var i = 0; i < 70; i++) el("circle", { cx: (rnd() * W).toFixed(0), cy: (rnd() * H).toFixed(0), r: (rnd() * 1.1 + .3).toFixed(2), "class": "star", style: "animation-delay:" + (rnd() * 4).toFixed(1) + "s" });
    v.edges.forEach(function (e) {
      var a = v.list[e.a], b = v.list[e.b];
      el("line", { "class": "edge " + (e.kind === "path" ? "path" : e.kind === "ghost" ? "ghost" : "link"), x1: a.x.toFixed(1), y1: a.y.toFixed(1), x2: b.x.toFixed(1), y2: b.y.toFixed(1) });
    });
    var sol = S.solCount || {};
    Object.keys(v.list).forEach(function (k) {
      var n = v.list[k], cls = "node", isT = S.target && k === S.target.title, isS = S.solution ? k === S.solution[0] : (S.path.length && k === S.path[0] && S.target);
      if (isT) cls += " target"; else if (isS) cls += " start";
      if (k === S.cur) cls += " current"; else if (n.visited) cls += " visited"; else cls += " near";
      if (sol[k]) cls += " onpath"; if (sol[k] > 1 && !isT && !isS) cls += " shared";
      if (isKept(k)) cls += " kept";
      var g = el("g", { "class": cls, tabindex: "0", role: "button", "aria-label": t("visit") + " " + k, transform: "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")" });
      var r = (isT || isS) ? 19 : k === S.cur ? 12 : sol[k] > 1 ? 11 : sol[k] ? 9 : n.visited ? 8 : 5.5;
      if (isT || isS || k === S.cur) el("circle", { r: r + 8, "class": "halo" }, g);
      el("circle", { r: r, "class": "dot", filter: "url(#ggGlow)" }, g);
      var tx = el("text", { x: r + 6, y: 4 }, g); tx.textContent = truncate(k, 26);
      var vert = W < 500;
      if (n.x > W * 0.68 && !(vert && (isT || isS))) { tx.setAttribute("x", -(r + 6)); tx.setAttribute("text-anchor", "end"); }
      if (vert && (isT || isS)) { tx.setAttribute("x", 0); tx.setAttribute("text-anchor", "middle"); tx.setAttribute("y", isT ? -(r + 12) : r + 20); }
      g.addEventListener("click", function () { if (k === S.cur) unvisit(k); else visit(k); });
      g.addEventListener("keydown", function (ev) { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); if (k === S.cur) unvisit(k); else visit(k); } });
    });
  }

  /* ---------- glossary ---------- */
  function renderGlossary() {
    var dl = $("glossaryList"); dl.innerHTML = "";
    $("glossaryEmpty").hidden = glossary.length > 0;
    $("exportBtn").disabled = $("clearBtn").disabled = glossary.length === 0;
    glossary.forEach(function (g, i) {
      var d = document.createElement("div"), dt = document.createElement("dt"), dd = document.createElement("dd");
      var name = document.createElement("span"); name.textContent = g.title + (g.lang !== S.lang ? " (" + g.lang + ")" : "");
      var rm = document.createElement("button"); rm.type = "button"; rm.textContent = t("remove"); rm.setAttribute("aria-label", t("remove") + " " + g.title);
      rm.addEventListener("click", function () { glossary.splice(i, 1); saveGlossary(); if (S.cur) render(); else renderGlossary(); });
      dt.appendChild(name); dt.appendChild(rm);
      dd.textContent = g.description ? g.description + ". " + firstSentence(g.extract) : firstSentence(g.extract);
      d.appendChild(dt); d.appendChild(dd); dl.appendChild(d);
    });
  }
  function firstSentence(x) { var m = (x || "").match(/^.*?[.!?](\s|$)/); return (m ? m[0] : x || "").trim(); }
  function toggleKeep() {
    var s = cacheSum[gkey(S.lang, S.cur)]; if (!s) return;
    var i = -1; glossary.forEach(function (g, n) { if (g.lang === S.lang && g.title === s.title) i = n; });
    if (i >= 0) glossary.splice(i, 1);
    else glossary.push({ title: s.title, lang: S.lang, description: s.description, extract: s.extract, url: s.url });
    saveGlossary(); render();
  }
  function exportMd() {
    var L = [ "# " + t("exportTitle"), "", t("exportBy"), "", t("exportSrc"), "" ];
    glossary.forEach(function (g) { L.push("## " + g.title, "", g.extract || g.description || "", "", g.url, ""); });
    var blob = new Blob([L.join("\n")], { type: "text/markdown;charset=utf-8" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "glossary.md"; document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  /* ---------- controls ---------- */
  function applyLang() {
    document.documentElement.lang = S.lang;
    document.querySelectorAll("[data-i]").forEach(function (e) { if (e.id !== "keepBtn" || !S.cur) e.textContent = t(e.getAttribute("data-i")); });
    document.querySelectorAll("[data-ph]").forEach(function (e) { e.placeholder = t(e.getAttribute("data-ph")); });
    $("modeHint").textContent = S.mode === "connect" ? t("hintConnect") : t("hintWander");
    document.querySelectorAll(".gg-lang").forEach(function (b) { var on = b.getAttribute("data-lang") === S.lang; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
    if (S.cur) render(); else renderGlossary();
  }
  function setMode(m) {
    S.mode = m;
    document.querySelectorAll(".gg-chip").forEach(function (b) { var on = b.getAttribute("data-mode") === m; b.classList.toggle("active", on); b.setAttribute("aria-pressed", String(on)); });
    $("targetField").hidden = m !== "connect";
    $("modeHint").textContent = m === "connect" ? t("hintConnect") : t("hintWander");
  }
  function start(startTerm, targetTerm) {
    resetGame();
    var tgt = S.mode === "connect" ? targetTerm : "";
    var my = S.req;
    setStatus(t("loading"));
    var pStart = resolveTerm(startTerm);
    var pTarget = tgt ? resolveTerm(tgt).then(function (n) { return summary(n); }) : Promise.resolve(null);
    return Promise.all([pStart, pTarget]).then(function (r) {
      S.target = r[1] || null;
      if (!S.target) return visit(r[0]);
      return visit(r[0]).then(function () {
        if (my + 1 !== S.req) return;
        my = S.req;
        var a0 = S.cur; setStatus(t("searching"));
        leadLinks(S.target.title).then(function (l) { if (my === S.req) { S.ctx[S.target.title] = l.slice(0, 8); drawGraph(); } }).catch(function () {});
        return findPath(a0, S.target.title, my).then(function (paths) {
          if (my !== S.req) return;
          if (!paths || !paths.length) { setStatus(t("noPath"), "err"); return; }
          var seenP = {}; paths = paths.filter(function (p) { var k = p.join("|"); if (seenP[k]) return false; seenP[k] = 1; return true; }).slice(0, 8);
          var path = paths[0], all = {}; paths.forEach(function (p) { p.forEach(function (x) { all[x] = (all[x] || 0) + 1; }); });
          return Promise.all(Object.keys(all).map(function (p) { return summary(p).catch(function () {}); })).then(function () {
            if (my !== S.req) return;
            S.solution = path; S.solutions = paths; S.solCount = all;
            Object.keys(all).forEach(function (p) { if (p !== path[0] && p !== S.target.title) leadLinks(p).then(function (l) { S.ctx[p] = l.filter(function (x) { return !all[x]; }).slice(0, 2); drawGraph(); }).catch(function () {}); });
            paths.forEach(function (pp) {
              pp.forEach(function (p, i) {
                var n = ensureNode(p, i ? pp[i - 1] : null); n.visited = true;
                if (i) addEdge(pp[i - 1], p, "path");
              });
            });
            render();
          });
        });
      });
    }).catch(function (e) {
      if (e && e.notfound) setStatus(t("errNotFound", { t: e.notfound }), "err"); else setStatus(t("errNet"), "err");
    });
  }

  document.querySelectorAll(".gg-chip").forEach(function (b) { b.addEventListener("click", function () { setMode(b.getAttribute("data-mode")); }); });
  document.querySelectorAll(".gg-lang").forEach(function (b) { b.addEventListener("click", function () { S.lang = b.getAttribute("data-lang"); resetGame(); setStatus(""); applyLang(); }); });
  $("startForm").addEventListener("submit", function (ev) {
    ev.preventDefault();
    var a = $("startInput").value.trim(), b = $("targetInput").value.trim();
    if (!a) { setStatus(t("needStart"), "err"); $("startInput").focus(); return; }
    if (S.mode === "connect" && !b) { setStatus(t("needTarget"), "err"); $("targetInput").focus(); return; }
    start(a, b);
  });
  $("randomBtn").addEventListener("click", function () {
    resetGame(); setStatus(t("loading"));
    var jobs = [randomTerm()]; if (S.mode === "connect") jobs.push(randomTerm());
    Promise.all(jobs).then(function (r) {
      $("startInput").value = r[0]; if (r[1]) $("targetInput").value = r[1];
      return start(r[0], r[1] || "");
    }).catch(function () { setStatus(t("errNet"), "err"); });
  });
  $("backBtn").addEventListener("click", function () {
    if (S.path.length < 2) return;
    S.path.pop(); var k = S.path[S.path.length - 1]; S.moves = Math.max(0, S.moves - 1); var my = ++S.req;
    summary(k).then(function () { return leadLinks(k); }).then(function (l) {
      if (my !== S.req) return;
      S.cur = k; S.near = l; S.won = false; render();
    }).catch(function () { setStatus(t("errNet"), "err"); });
  });
  $("keepBtn").addEventListener("click", toggleKeep);
  $("exportBtn").addEventListener("click", exportMd);
  $("clearBtn").addEventListener("click", function () { if (glossary.length && window.confirm(t("confirmClear"))) { glossary = []; saveGlossary(); if (S.cur) render(); else renderGlossary(); } });

  /* ?lang=fr&start=pulsar opens the game on a term */
  try {
    var q = new URLSearchParams(location.search), l = q.get("lang");
    if (l && UI[l]) S.lang = l;
    applyLang();
    var st = q.get("start"), tg = q.get("target");
    if (st) { $("startInput").value = st; if (tg) { setMode("connect"); $("targetInput").value = tg; } start(st, tg || ""); }
  } catch (e) { applyLang(); }
})();
