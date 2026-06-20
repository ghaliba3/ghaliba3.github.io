/* AWS Generative AI Developer — practice exam (vanilla JS, no build step) */

const LS_KEY = "aws-genai-quiz-progress-v1";

const state = {
  all: [],          // every question
  view: [],         // filtered/shuffled subset currently in play
  idx: 0,
  mode: "practice",
  // per-question record keyed by question id: { selected:[], checked:bool, correct:bool }
  records: {},
};

const $ = (id) => document.getElementById(id);
const LETTERS = ["A", "B", "C", "D", "E", "F"];

async function load() {
  try {
    const res = await fetch("data/questions.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    state.all = data.map((q, i) => ({ ...q, id: q.id ?? i + 1 }));
  } catch (e) {
    $("q-text").textContent = "Could not load questions.json — " + e.message;
    $("foot-status").textContent = "Load error";
    return;
  }
  restore();
  buildCategoryFilter();
  applyFilter();
  wire();
  $("foot-status").textContent = `${state.all.length} questions loaded`;
}

function restore() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || "{}");
    if (saved && saved.records) state.records = saved.records;
  } catch { /* ignore */ }
}
function persist() {
  localStorage.setItem(LS_KEY, JSON.stringify({ records: state.records }));
}

function buildCategoryFilter() {
  const cats = Array.from(new Set(state.all.map((q) => q.category))).sort();
  const sel = $("category-filter");
  sel.innerHTML = `<option value="__all">All categories (${state.all.length})</option>`;
  for (const c of cats) {
    const n = state.all.filter((q) => q.category === c).length;
    const o = document.createElement("option");
    o.value = c; o.textContent = `${c} (${n})`;
    sel.appendChild(o);
  }
}

function applyFilter() {
  const cat = $("category-filter").value || "__all";
  state.view = cat === "__all" ? [...state.all] : state.all.filter((q) => q.category === cat);
  state.idx = 0;
  $("exam-result").hidden = true;
  render();
}

function shuffle() {
  for (let i = state.view.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [state.view[i], state.view[j]] = [state.view[j], state.view[i]];
  }
  state.idx = 0;
  render();
}

function current() { return state.view[state.idx]; }
function recOf(q) {
  if (!state.records[q.id]) state.records[q.id] = { selected: [], checked: false, correct: false };
  return state.records[q.id];
}

function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  const s = [...a].sort(), t = [...b].sort();
  return s.every((v, i) => v === t[i]);
}

function render() {
  const q = current();
  if (!q) return;
  const rec = recOf(q);
  const multi = q.type === "multiple" || (q.correct && q.correct.length > 1);

  $("q-category").textContent = q.category;
  $("q-index").textContent = `Question ${state.idx + 1} of ${state.view.length}`;
  $("q-text").textContent = q.question;
  $("q-hint").textContent = multi ? `Select ${q.correct.length}.` : "";

  const form = $("options-form");
  form.innerHTML = "";
  const revealed = rec.checked && state.mode === "practice";

  q.options.forEach((opt, i) => {
    const label = document.createElement("label");
    label.className = "option";
    const input = document.createElement("input");
    input.type = multi ? "checkbox" : "radio";
    input.name = "opt";
    input.value = String(i);
    input.checked = rec.selected.includes(i);
    if (revealed) { input.disabled = true; label.classList.add("disabled"); }
    input.addEventListener("change", () => onSelect(i, multi));

    const letter = document.createElement("span");
    letter.className = "opt-letter";
    letter.textContent = LETTERS[i];
    const text = document.createElement("span");
    text.textContent = opt;

    label.append(input, letter, text);

    if (revealed) {
      if (q.correct.includes(i)) label.classList.add("correct");
      else if (rec.selected.includes(i)) label.classList.add("wrong");
    }
    form.appendChild(label);
  });

  // feedback
  const fb = $("feedback");
  if (revealed) {
    fb.hidden = false;
    fb.className = "feedback " + (rec.correct ? "right" : "wrong");
    fb.innerHTML = `<span class="verdict">${rec.correct ? "✓ Correct" : "✗ Incorrect"}</span>
      <span class="explain">${escapeHtml(q.explanation || "")}</span>`;
  } else {
    fb.hidden = true;
  }

  $("check-btn").textContent = revealed ? "Checked" : "Check answer";
  $("check-btn").disabled = revealed || rec.selected.length === 0;
  $("prev-btn").disabled = state.idx === 0;
  $("next-btn").disabled = state.idx === state.view.length - 1;

  updateStats();
  updateProgress();
  buildNav();
}

function onSelect(i, multi) {
  const q = current();
  const rec = recOf(q);
  if (rec.checked && state.mode === "practice") return;
  if (multi) {
    rec.selected = rec.selected.includes(i)
      ? rec.selected.filter((x) => x !== i)
      : [...rec.selected, i];
  } else {
    rec.selected = [i];
  }
  persist();
  $("check-btn").disabled = rec.selected.length === 0;
}

function check() {
  const q = current();
  const rec = recOf(q);
  if (rec.selected.length === 0) return;
  rec.checked = true;
  rec.correct = arraysEqual(rec.selected, q.correct);
  persist();
  render();
}

function go(delta) {
  const ni = state.idx + delta;
  if (ni < 0 || ni >= state.view.length) return;
  state.idx = ni;
  render();
}

function updateStats() {
  const recs = Object.values(state.records).filter((r) => r.checked);
  const answered = recs.length;
  const correct = recs.filter((r) => r.correct).length;
  $("stat-answered").textContent = answered;
  $("stat-correct").textContent = correct;
  $("stat-accuracy").textContent = answered ? Math.round((correct / answered) * 100) + "%" : "—";
}

function updateProgress() {
  const checkedInView = state.view.filter((q) => state.records[q.id]?.checked).length;
  const pct = state.view.length ? (checkedInView / state.view.length) * 100 : 0;
  $("progress-fill").style.width = pct + "%";
  $("progress-text").textContent = `${checkedInView} / ${state.view.length}`;
}

function buildNav() {
  const grid = $("nav-grid");
  grid.innerHTML = "";
  state.view.forEach((q, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    const rec = state.records[q.id];
    if (i === state.idx) b.classList.add("current");
    else if (rec?.checked) b.classList.add(rec.correct ? "correct" : "wrong");
    b.addEventListener("click", () => { state.idx = i; render(); });
    grid.appendChild(b);
  });
}

function gradeExam() {
  const total = state.view.length;
  let answered = 0, correct = 0;
  state.view.forEach((q) => {
    const rec = recOf(q);
    rec.checked = true;
    rec.correct = arraysEqual(rec.selected, q.correct);
    if (rec.selected.length) answered++;
    if (rec.correct) correct++;
  });
  persist();
  const pct = total ? Math.round((correct / total) * 100) : 0;
  const pass = pct >= 70;
  const box = $("exam-result");
  box.hidden = false;
  box.innerHTML = `<h2>Exam results</h2>
    <p class="score-big">${pct}%</p>
    <p>${correct} / ${total} correct · ${answered} answered ·
       <strong style="color:${pass ? "var(--green)" : "var(--red)"}">${pass ? "PASS" : "BELOW PASS"}</strong>
       (passing ≈ 70%)</p>
    <p style="color:var(--muted)">Switch back to Practice mode to review explanations per question.</p>`;
  box.scrollIntoView({ behavior: "smooth" });
  render();
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function wire() {
  $("check-btn").addEventListener("click", () => {
    if (state.mode === "exam") gradeExam();
    else check();
  });
  $("prev-btn").addEventListener("click", () => go(-1));
  $("next-btn").addEventListener("click", () => go(1));
  $("shuffle-btn").addEventListener("click", shuffle);
  $("category-filter").addEventListener("change", applyFilter);
  $("mode-select").addEventListener("change", (e) => {
    state.mode = e.target.value;
    $("check-btn").textContent = state.mode === "exam" ? "Submit exam" : "Check answer";
    $("exam-result").hidden = true;
    render();
  });
  $("reset-btn").addEventListener("click", () => {
    if (!confirm("Reset all progress and answers?")) return;
    state.records = {};
    persist();
    state.idx = 0;
    render();
  });
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "SELECT") return;
    if (e.key === "ArrowLeft") go(-1);
    if (e.key === "ArrowRight") go(1);
    if (e.key === "Enter") $("check-btn").click();
    if (["1","2","3","4","5","6"].includes(e.key)) {
      const i = +e.key - 1;
      const q = current();
      if (q && i < q.options.length) {
        onSelect(i, q.type === "multiple" || q.correct.length > 1);
        render();
      }
    }
  });
  // reflect initial mode
  state.mode = $("mode-select").value;
}

load();
