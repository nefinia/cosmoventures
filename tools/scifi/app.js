const state = {
  authors: window.BENCHMARK_DATA.authors,
  predictions: window.BENCHMARK_DATA.predictions,
  matches: window.BENCHMARK_DATA.matches,
  selectedAuthor: null,
  selectedPrediction: null,
  domain: "",
  yearMax: 2000,
};

function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function label(value) {
  const text = String(value).replaceAll("_", " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function percent(value) {
  return `${Math.max(0, Math.min(100, value * 100)).toFixed(1)}%`;
}

function scorePct(value) {
  return (value * 100).toFixed(1);
}

function filteredPredictions() {
  return state.predictions.filter((prediction) =>
    (!state.domain || prediction.technology_domain === state.domain) && prediction.year <= state.yearMax);
}

function focusAfter(selector) {
  const el = document.querySelector(selector);
  if (el) el.focus();
}

function renderLeaderboard() {
  const container = document.getElementById("leaderboard");
  const filtered = filteredPredictions();

  const authorScores = state.authors
    .map((author) => {
      const items = filtered.filter((prediction) => prediction.author === author.author);
      if (!items.length) return null;
      const average = items.reduce((sum, item) => sum + item.score, 0) / items.length;
      return { ...author, filteredAverage: average, filteredCount: items.length };
    })
    .filter(Boolean)
    .sort((left, right) => right.filteredAverage - left.filteredAverage);

  document.getElementById("resultCount").textContent =
    `${filtered.length} of ${state.predictions.length} predictions, ${authorScores.length} authors`;

  if (!authorScores.length) {
    container.innerHTML = `<li class="sf-empty">No authors match the current filters.</li>`;
    return;
  }

  container.innerHTML = authorScores.map((author, index) => `
    <li>
      <button type="button" class="sf-row${state.selectedAuthor === author.author ? " active" : ""}" data-author="${esc(author.author)}" aria-pressed="${state.selectedAuthor === author.author}">
        <span class="sf-rank"><span class="sf-visually">Rank </span>${index + 1}</span>
        <span class="sf-row-main">
          <span class="sf-row-name">${esc(author.author)}</span>
          <span class="sf-row-meta">${author.filteredCount} of ${author.prediction_count} predictions &middot; ${author.domain_count} domains</span>
          <span class="sf-track" aria-hidden="true"><span class="sf-fill" style="width:${percent(author.filteredAverage)}"></span></span>
        </span>
        <span class="sf-score">${scorePct(author.filteredAverage)}<span class="sf-visually"> out of 100</span></span>
      </button>
    </li>
  `).join("");

  container.querySelectorAll(".sf-row").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedAuthor = button.dataset.author;
      state.selectedPrediction = null;
      renderAuthorProfile();
      renderLeaderboard();
      renderPredictionList();
      renderMatchDetail(null);
      focusAfter(`.sf-row[data-author="${CSS.escape(state.selectedAuthor)}"]`);
    });
  });
}

function renderSubscoreBar(name, value) {
  return `
    <div class="sf-bar">
      <dt>${name}</dt>
      <dd>
        <span class="sf-track" aria-hidden="true"><span class="sf-fill" style="width:${percent(value)}"></span></span>
        <span class="sf-bar-val">${scorePct(value)}</span>
      </dd>
    </div>
  `;
}

function renderAuthorProfile() {
  const container = document.getElementById("authorProfile");
  const author = state.authors.find((item) => item.author === state.selectedAuthor);
  if (!author) {
    container.className = "sf-empty";
    container.textContent = "Select an author from the leaderboard.";
    return;
  }

  container.className = "sf-profile";
  container.innerHTML = `
    <h3>${esc(author.author)}</h3>
    <p class="sf-note">${author.prediction_count} seeded predictions spanning ${author.domain_count} domains. Profile figures cover all of them, whatever the filters.</p>
    <dl class="sf-metrics">
      <div><dt>Overall score</dt><dd>${author.normalized_score.toFixed(1)}</dd></div>
      <div><dt>Mean prediction score</dt><dd>${scorePct(author.mean_prediction_score)}</dd></div>
    </dl>
    <h4>Average subscore breakdown</h4>
    <dl class="sf-bars">
      ${renderSubscoreBar("Existence", author.average_existence_match)}
      ${renderSubscoreBar("Functional", author.average_functional_match)}
      ${renderSubscoreBar("Mechanistic", author.average_mechanistic_match)}
      ${renderSubscoreBar("Societal", author.average_societal_match)}
    </dl>
    <h4>Domain strengths</h4>
    <ul class="sf-chips">
      ${author.domains.map((domain) => `<li>${esc(label(domain))}</li>`).join("")}
    </ul>
  `;
}

function statusChip(annotation) {
  return annotation && annotation.status ? `<li class="sf-status">${esc(label(annotation.status))}</li>` : "";
}

function renderPredictionList() {
  const container = document.getElementById("predictionList");
  const predictions = filteredPredictions()
    .filter((prediction) => !state.selectedAuthor || prediction.author === state.selectedAuthor)
    .sort((left, right) => right.score - left.score);

  if (!predictions.length) {
    container.innerHTML = `<li class="sf-empty">No predictions match the current filters.</li>`;
    return;
  }

  container.innerHTML = predictions.map((prediction) => `
    <li>
      <button type="button" class="sf-pred${state.selectedPrediction === prediction.id ? " active" : ""}" data-id="${esc(prediction.id)}" aria-pressed="${state.selectedPrediction === prediction.id}">
        <span class="sf-pred-top">
          <span class="sf-pred-title">${esc(prediction.work)}</span>
          <span class="sf-score">${scorePct(prediction.score)}<span class="sf-visually"> out of 100</span></span>
        </span>
        <span class="sf-row-meta">${esc(prediction.author)} &middot; ${prediction.year}</span>
        <span class="sf-chips-inline">
          <span>${esc(label(prediction.technology_domain))}</span>
          <span>${esc(prediction.matched_technology_name)}</span>
          ${prediction.annotation && prediction.annotation.status ? `<span class="sf-status">${esc(label(prediction.annotation.status))}</span>` : ""}
        </span>
      </button>
    </li>
  `).join("");

  container.querySelectorAll(".sf-pred").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedPrediction = button.dataset.id;
      renderPredictionList();
      renderMatchDetail(button.dataset.id);
      focusAfter(`.sf-pred[data-id="${CSS.escape(button.dataset.id)}"]`);
    });
  });
}

function renderMatchDetail(predictionId) {
  const container = document.getElementById("matchDetail");
  const payload = predictionId ? state.matches[predictionId] : null;
  if (!payload) {
    container.className = "sf-detail sf-empty";
    container.textContent = "Select a prediction to view the top candidate match and subscore breakdown.";
    return;
  }
  const { prediction, score, top_match, candidates } = payload;
  const annotation = prediction.annotation || state.predictions.find((p) => p.id === predictionId)?.annotation;
  container.className = "sf-detail";
  container.innerHTML = `
    <div class="sf-detail-head">
      <h3>${esc(prediction.work)}</h3>
      <span class="sf-final"><span class="sf-final-num">${scorePct(score.final_score)}</span><span class="sf-final-lbl">Final score, out of 100</span></span>
    </div>
    <p><strong>${esc(prediction.author)}</strong> predicted a ${esc(label(prediction.technology_domain).toLowerCase())} concept in ${prediction.year}.</p>
    <p class="sf-excerpt">${esc(prediction.excerpt)}</p>
    <ul class="sf-chips">
      <li>Type: ${esc(label(prediction.prediction_type))}</li>
      <li>Specificity: ${scorePct(prediction.specificity_score)}</li>
      ${statusChip(annotation)}
    </ul>
    <h4>Top matched technology</h4>
    <p><strong>${esc(score.matched_technology_name)}</strong> (${score.matched_technology_year}) with combined match score ${scorePct(top_match.combined_score)}.</p>
    <dl class="sf-bars">
      ${renderSubscoreBar("Existence", score.existence_match)}
      ${renderSubscoreBar("Functional", score.functional_match)}
      ${renderSubscoreBar("Mechanistic", score.mechanistic_match)}
      ${renderSubscoreBar("Societal", score.societal_match)}
    </dl>
    <h4>Comparison details</h4>
    <dl class="sf-facts">
      <div><dt>Description</dt><dd>${esc(prediction.description)}</dd></div>
      <div><dt>Mechanism</dt><dd>${esc(prediction.mechanism)}</dd></div>
      <div><dt>Societal role</dt><dd>${esc(prediction.societal_role)}</dd></div>
      <div><dt>Lead time</dt><dd>${score.lead_time_years} years</dd></div>
    </dl>
    <h4>Candidate matches</h4>
    <ol class="sf-cands">
      ${candidates.map((candidate) => `<li><span>${esc(candidate.technology_name)}</span><span class="sf-cand-val">${scorePct(candidate.combined_score)}</span></li>`).join("")}
    </ol>
  `;
}

function hydrateFilters() {
  const domainSelect = document.getElementById("domainFilter");
  domainSelect.innerHTML = `<option value="">All domains</option>${window.BENCHMARK_DATA.domains.map((domain) => `<option value="${esc(domain)}">${esc(label(domain))}</option>`).join("")}`;
  domainSelect.addEventListener("change", () => {
    state.domain = domainSelect.value;
    refresh();
  });

  const yearSlider = document.getElementById("yearSlider");
  const yearLabel = document.getElementById("yearLabel");
  yearSlider.addEventListener("input", () => {
    state.yearMax = Number(yearSlider.value);
    yearLabel.textContent = yearSlider.value;
    refresh();
  });
}

function refresh() {
  renderLeaderboard();
  renderPredictionList();
  if (state.selectedPrediction && !document.querySelector(`.sf-pred[data-id="${CSS.escape(state.selectedPrediction)}"]`)) {
    state.selectedPrediction = null;
    renderMatchDetail(null);
  }
}

function init() {
  hydrateFilters();
  state.selectedAuthor = state.authors[0]?.author ?? null;
  renderLeaderboard();
  renderAuthorProfile();
  renderPredictionList();
}

try {
  init();
} catch (error) {
  const app = document.getElementById("app");
  if (app) app.innerHTML = `<div class="sf-panel"><h2>Application error</h2><p>${esc(error.message)}</p></div>`;
}
