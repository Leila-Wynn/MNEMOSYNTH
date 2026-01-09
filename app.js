import { STORY } from "./data/story.js";
import { QUESTION_SETS } from "./data/questions.js";

/* -----------------------------
   Small utilities
----------------------------- */
const $ = (sel) => document.querySelector(sel);

function pad2(n){ return String(n).padStart(2,"0"); }
function formatMMSS(totalSeconds){
  const m = Math.floor(totalSeconds/60);
  const s = totalSeconds % 60;
  return `${pad2(m)}:${pad2(s)}`;
}
function clamp(n,min,max){ return Math.max(min, Math.min(max,n)); }

function setBodyEffect(className, on){
  document.body.classList.toggle(className, !!on);
}

function activateEffect(effectName, durationMs){
  // Turn on
  if(effectName === "fear"){
    state.effects.fear = true;
    setBodyEffect("fear", true);
    if(state.effects.fearTimer) clearTimeout(state.effects.fearTimer);
    state.effects.fearTimer = setTimeout(() => {
      state.effects.fear = false;
      setBodyEffect("fear", false);
    }, durationMs);
  }

  if(effectName === "memoryGlitch"){
    state.effects.memoryGlitch = true;
    setBodyEffect("memoryGlitch", true);
    if(state.effects.glitchTimer) clearTimeout(state.effects.glitchTimer);
    state.effects.glitchTimer = setTimeout(() => {
      state.effects.memoryGlitch = false;
      setBodyEffect("memoryGlitch", false);
      // re-render story node cleanly after glitch ends
      renderNode(state.save.nodeId);
    }, durationMs);
  }
}

// Light, readable “corruption” (keeps words mostly intact)
function distortText(text, intensity = 0.08){
  const chars = text.split("");
  const glyphs = ["▯","▮","▒","░","≋","≈","∷","⋯","⟡","⟠"];
  return chars.map(ch => {
    if(ch === " " || ch === "\n") return ch;
    if(Math.random() < intensity){
      return glyphs[Math.floor(Math.random() * glyphs.length)];
    }
    return ch;
  }).join("");
}

function microLessonFor(concept){
  const lessons = {
    "Amygdala":
      "Amygdala = threat detection and fear processing. It assigns emotional significance and helps trigger fight-or-flight responses.",

    "Hippocampus":
      "Hippocampus = forming new long-term memories (especially episodic and spatial). Damage causes difficulty creating new memories."
  };
  return lessons[concept] ?? null;
}

function applyConceptConsequence(concept, wasCorrect){
  if(wasCorrect) return;

  // Only trigger consequences during active study phases
  // (baseline/final are fine; we want the atmosphere during the learning loop)
  const durationFear = 16000;   // 16s threat spike
  const durationGlitch = 14000; // 14s memory corruption

  if(concept === "Amygdala"){
  logLine("⚠ THREAT RESPONSE SPIKE: amygdala misfire detected.", "logWarn");

  const lesson = microLessonFor(concept);
  if(lesson) logLine(`↳ ${lesson}`, "logSys");

  activateEffect("fear", durationFear);
  // Optional: harsher audio cue
  beep(140, 0.12, 0.05);
  beep(220, 0.10, 0.04);
}
  }

  if(concept === "Hippocampus"){
  logLine("⚠ MEMORY CORRUPTION: hippocampal index mismatch.", "logWarn");

  const lesson = microLessonFor(concept);
  if(lesson) logLine(`↳ ${lesson}`, "logSys");

  activateEffect("memoryGlitch", durationGlitch);
}


function shuffle(arr){
  const a = [...arr];
  for(let i=a.length-1; i>0; i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(arr, n){
  return shuffle(arr).slice(0, Math.min(n, arr.length));
}

const STORAGE_KEY = "mnemosynth_save_v1";
function loadSave(){
  try{
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? {
      lastScore: null,
      stability: 62,
      nodeId: STORY.startNodeId,
      soundOn: true,
      history: []
    };
  }catch{
    return { lastScore:null, stability:62, nodeId: STORY.startNodeId, soundOn:true, history:[] };
  }
}
function saveNow(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.save));
}

/* -----------------------------
   Audio (simple WebAudio beeps)
----------------------------- */
let audioCtx = null;
function beep(freq=440, dur=0.08, gain=0.03){
  if(!state.save.soundOn) return;
  audioCtx ??= new (window.AudioContext || window.webkitAudioContext)();
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = "sine";
  o.frequency.value = freq;
  g.gain.value = gain;
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + dur);
}

/* -----------------------------
   App state
----------------------------- */
const state = {
  save: loadSave(),

  // timer
  mode: "focus", // focus | short | long
  durations: { focus: 25*60, short: 5*60, long: 15*60 },
  remaining: 25*60,
  ticking: false,
  timerId: null,

  // session phase
  phase: "IDLE", // IDLE | BASELINE | FOCUS | BREAK | FINAL | RESULTS
  quiz: null,
  effects: {
  fear: false,
  memoryGlitch: false,
  fearTimer: null,
  glitchTimer: null
},

};

/* -----------------------------
   DOM refs
----------------------------- */
const timeReadout = $("#timeReadout");
const sessionStatePill = $("#sessionStatePill");
const stabilityFill = $("#stabilityFill");
const stabilityValue = $("#stabilityValue");

const baselineTag = $("#baselineTag");
const focusTag = $("#focusTag");
const auditTag = $("#auditTag");
const lastScoreValue = $("#lastScoreValue");

const panelTitle = $("#panelTitle");
const panelBody  = $("#panelBody");
const choicesEl  = $("#choices");
const chapterChip = $("#chapterChip");

const quizCard = $("#quizCard");
const quizTitle = $("#quizTitle");
const quizProgress = $("#quizProgress");
const quizQuestion = $("#quizQuestion");
const quizOptions = $("#quizOptions");
const quizNextBtn = $("#quizNextBtn");
const quizBackBtn = $("#quizBackBtn");
const hintText = $("#hintText");

const resultsCard = $("#resultsCard");
const resultsPercent = $("#resultsPercent");
const resultsBig = $("#resultsBig");
const resultsSmall = $("#resultsSmall");
const breakdownEl = $("#breakdown");

const terminal = $("#terminal");

const startBtn = $("#startBtn");
const pauseBtn = $("#pauseBtn");
const skipBtn  = $("#skipBtn");
const resetBtn = $("#resetBtn");
const soundToggle = $("#soundToggle");

/* -----------------------------
   Rendering
----------------------------- */
function logLine(text, cls="logSys"){
  const div = document.createElement("div");
  div.className = `logLine ${cls}`;
  div.textContent = text;
  terminal.prepend(div);
}
function setStability(n){
  state.save.stability = clamp(Math.round(n), 0, 100);
  stabilityFill.style.width = `${state.save.stability}%`;
  stabilityValue.textContent = `${state.save.stability}%`;
  saveNow();
}
function setPhase(phase){
  state.phase = phase;
  sessionStatePill.textContent = phase;
  baselineTag.textContent = (phase === "BASELINE") ? "ACTIVE" : (phase === "IDLE" ? "LOCKED" : "DONE");
  focusTag.textContent    = (phase === "FOCUS") ? "ACTIVE" : (phase === "IDLE" ? "LOCKED" : (phase === "BASELINE" ? "LOCKED" : "READY"));
  auditTag.textContent    = (phase === "FINAL") ? "ACTIVE" : (phase === "RESULTS" ? "DONE" : "LOCKED");
}
function setMode(mode){
  state.mode = mode;
  state.remaining = state.durations[mode];
  timeReadout.textContent = formatMMSS(state.remaining);

  document.querySelectorAll(".tab").forEach(btn=>{
    const isActive = btn.dataset.mode === mode;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-selected", isActive ? "true" : "false");
  });
}
function setLastScoreUI(){
  lastScoreValue.textContent = state.save.lastScore == null ? "—" : `${state.save.lastScore}%`;
}
function showStory(){
  quizCard.classList.add("hidden");
  resultsCard.classList.add("hidden");
  choicesEl.classList.remove("hidden");
}
function showQuiz(){
  quizCard.classList.remove("hidden");
  resultsCard.classList.add("hidden");
  choicesEl.classList.add("hidden");
}
function showResults(){
  resultsCard.classList.remove("hidden");
  quizCard.classList.add("hidden");
  choicesEl.classList.add("hidden");
}

/* -----------------------------
   Story system
----------------------------- */
function renderNode(nodeId){
  state.save.nodeId = nodeId;
  saveNow();

  const node = STORY.nodes[nodeId];
  if(state.effects.memoryGlitch){
  panelTitle.textContent = distortText(node.title, 0.12);
  panelBody.textContent  = distortText(node.body, 0.07);
} else {
  panelTitle.textContent = node.title;
  panelBody.textContent  = node.body;
}
  chapterChip.textContent = STORY.zoneName;

  choicesEl.innerHTML = "";
  (node.choices ?? []).forEach((c, idx)=>{
    const btn = document.createElement("button");
    btn.className = "choiceBtn";
    btn.innerHTML = `
      <div class="choiceTop">CHOICE ${idx+1}</div>
      <div class="choiceMain">${c.label}</div>
    `;
    btn.addEventListener("click", ()=>{
      beep(520,0.06,0.025);
      if(c.action === "BEGIN_BASELINE_QUIZ"){
        beginQuiz("baseline");
        return;
      }
      if(c.to){
        renderNode(c.to);
        return;
      }
    });
    choicesEl.appendChild(btn);
  });
}

/* -----------------------------
   Quiz system
----------------------------- */
function beginQuiz(kind){
  // Pull from the bank
  const pool = QUESTION_SETS[kind];

  // Decide how many questions per quiz
  // (You can tune these numbers anytime)
  const counts = {
    baseline: 7, // start-of-pomodoro
    final: 12    // end-of-pomodoro
  };

  const targetCount = counts[kind] ?? pool.length;

// Pull questions whose concept you previously missed
const missed = pool.filter(q => state.missedConcepts.has(q.concept));
const rest   = pool.filter(q => !state.missedConcepts.has(q.concept));

// Always include up to 3 missed-concept questions first (spaced repetition)
const picked = [
  ...pickN(missed, Math.min(3, targetCount)),
  ...pickN(rest, targetCount)
].slice(0, targetCount);

logLine(`FOCUS: prioritizing ${Math.min(3, missed.length)} missed concept(s).`, "logSys");

  state.quiz = {
    kind,
    idx: 0,
    selectedIndex: null,
    answers: [],      // {id, correct, concept}
    startedAt: Date.now(),
    questions: picked // <-- the sampled quiz list
  };

  if(kind === "baseline"){
    setPhase("BASELINE");
    logLine("BASELINE CALIBRATION: initiating diagnostic…", "logSys");
  }else{
    setPhase("FINAL");
    logLine("COGNITIVE AUDIT: compiling recall integrity…", "logWarn");
  }

  showQuiz();
  renderQuizQuestion();
}

function renderQuizQuestion(){
  const q = state.quiz.questions[state.quiz.idx];

  quizTitle.textContent =
    state.quiz.kind === "baseline"
      ? "BASELINE CALIBRATION"
      : "COGNITIVE AUDIT";

  quizProgress.textContent =
    `${state.quiz.idx + 1} / ${state.quiz.questions.length}`;

  quizQuestion.textContent = q.prompt;
  hintText.textContent = q.hint ?? "No hint available.";

  quizOptions.innerHTML = "";
  state.quiz.selectedIndex = null;
  quizNextBtn.disabled = true;

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "optionBtn";
    btn.textContent = opt;

    btn.addEventListener("click", () => {
      state.quiz.selectedIndex = i;
      quizNextBtn.disabled = false;

      quizOptions
        .querySelectorAll(".optionBtn")
        .forEach(b => b.classList.remove("selected"));

      btn.classList.add("selected");
    });

    quizOptions.appendChild(btn);
  });

  quizNextBtn.textContent =
    state.quiz.idx === state.quiz.questions.length - 1
      ? "Submit"
      : "Confirm";
}

function submitCurrentAnswer(){
  const q = state.quiz.questions[state.quiz.idx];
  const correct = state.quiz.selectedIndex === q.answerIndex;

  state.quiz.answers.push({
    id: q.id,
    concept: q.concept,
    correct
  });

  if(correct){
    // ✅ IF CORRECT → remove from missed list
    state.missedConcepts.delete(q.concept);

    logLine(`✔ ${q.concept}: integrity confirmed.`, "logOk");
    setStability(state.save.stability + 3);
    beep(720,0.08,0.03);
  } else {
    // ❌ IF WRONG → add to missed list
    state.missedConcepts.add(q.concept);

    logLine(`✖ ${q.concept}: mismatch detected.`, "logWarn");
    setStability(state.save.stability - 5);
    beep(180,0.10,0.035);
  }

  applyConceptConsequence(q.concept, correct);
  state.missedConcepts = new Set();
}

function finishQuiz(){
  const total = state.quiz.answers.length;
  const correct = state.quiz.answers.filter(a=>a.correct).length;
  const pct = total === 0 ? 0 : Math.round((correct/total)*100);

  // concept breakdown
  const byConcept = {};
  for(const a of state.quiz.answers){
    byConcept[a.concept] ??= { correct:0, total:0 };
    byConcept[a.concept].total += 1;
    if(a.correct) byConcept[a.concept].correct += 1;
  }

  // Save last score only for FINAL (or overall; your choice)
  if(state.quiz.kind === "final"){
    state.save.lastScore = pct;
    state.save.history.unshift({
      when: new Date().toISOString(),
      score: pct,
      stability: state.save.stability
    });
    state.save.history = state.save.history.slice(0, 20);
    saveNow();
    setLastScoreUI();
  }

  // Render results
  resultsPercent.textContent = `${pct}%`;
  resultsBig.textContent = `Archive Recall Integrity: ${pct}%`;
  resultsSmall.textContent = state.quiz.kind === "baseline"
    ? "Baseline recorded. The simulation will now respond to what you know."
    : "Audit complete. Your score determines what stabilizes… and what mutates.";

  breakdownEl.innerHTML = "";
  Object.entries(byConcept).forEach(([k,v])=>{
    const row = document.createElement("div");
    row.className = "breakRow";
    row.innerHTML = `
      <div class="breakKey">${k.toUpperCase()}</div>
      <div class="breakVal">${Math.round((v.correct/v.total)*100)}%</div>
    `;
    breakdownEl.appendChild(row);
  });

  setPhase("RESULTS");
  showResults();
}

/* -----------------------------
   Timer system
----------------------------- */
function tick(){
  if(!state.ticking) return;

  state.remaining -= 1;
  if(state.remaining < 0) state.remaining = 0;
  timeReadout.textContent = formatMMSS(state.remaining);

  // last 10 seconds: subtle urgency beep
  if(state.mode === "focus" && state.remaining <= 10 && state.remaining > 0){
    beep(300 + (10 - state.remaining)*30, 0.04, 0.012);
  }

  if(state.remaining === 0){
    stopTimer();
    onTimerEnd();
  }
}
function startTimer(){
  if(state.ticking) return;
  state.ticking = true;
  pauseBtn.disabled = false;
  skipBtn.disabled = false;
  startBtn.disabled = true;

  state.timerId = window.setInterval(tick, 1000);
}
function stopTimer(){
  state.ticking = false;
  if(state.timerId) window.clearInterval(state.timerId);
  state.timerId = null;

  pauseBtn.disabled = true;
  skipBtn.disabled = true;
  startBtn.disabled = false;
}
function onTimerEnd(){
  logLine("TIMER: phase boundary reached.", "logSys");
  beep(880,0.12,0.04);
  beep(660,0.12,0.035);

  if(state.mode === "focus"){
    // focus ended -> final quiz
    renderNode("hall");
    beginQuiz("final");
  }else{
    // breaks end -> ready
    setPhase("IDLE");
    renderNode(state.save.nodeId);
    showStory();
    logLine("BREAK COMPLETE: returning to simulation.", "logOk");
  }
}

/* -----------------------------
   Session Start Logic
----------------------------- */
function startSession(){
  // Always baseline quiz at pomodoro start (as requested)
  setMode("focus");
  beginQuiz("baseline");
  startTimer();
  setPhase("BASELINE");
  baselineTag.textContent = "ACTIVE";
  focusTag.textContent = "LOCKED";
  auditTag.textContent = "LOCKED";
}

/* -----------------------------
   Events
----------------------------- */
document.querySelectorAll(".tab").forEach(btn=>{
  btn.addEventListener("click", ()=>{
    if(state.ticking) return; // keep it simple: don’t change mode while running
    setMode(btn.dataset.mode);
    beep(540,0.05,0.02);
  });
});

startBtn.addEventListener("click", ()=>{
  beep(520,0.08,0.03);
  startSession();
});

pauseBtn.addEventListener("click", ()=>{
  if(!state.ticking) return;
  stopTimer();
  logLine("PAUSED: your attention has withdrawn.", "logFaint");
  beep(220,0.08,0.02);
});

skipBtn.addEventListener("click", ()=>{
  if(!state.ticking) return;
  state.remaining = 0;
  timeReadout.textContent = formatMMSS(state.remaining);
  stopTimer();
  onTimerEnd();
});

quizNextBtn.addEventListener("click", ()=>{
  if(state.quiz?.selectedIndex == null) return;

  submitCurrentAnswer();

  const last =
    state.quiz.idx === state.quiz.questions.length - 1;

  if(last){
    finishQuiz();
    return;
  }

  state.quiz.idx += 1;
  renderQuizQuestion();
});


$("#resultsContinueBtn").addEventListener("click", ()=>{
  beep(620,0.06,0.025);

  // After baseline results -> unlock focus exploration
  if(quizTitle.textContent.includes("BASELINE") || (state.quiz && state.quiz.kind === "baseline")){
    setPhase("FOCUS");
    focusTag.textContent = "ACTIVE";
    baselineTag.textContent = "DONE";
    auditTag.textContent = "LOCKED";
    showStory();
    renderNode("hall");
    logLine("FOCUS: exploration authorized.", "logOk");
    return;
  }

  // After final -> go idle (break next, if you want later)
  setPhase("IDLE");
  showStory();
  renderNode(state.save.nodeId);
  logLine("SESSION COMPLETE: archive state written.", "logOk");
});

$("#resultsHomeBtn").addEventListener("click", ()=>{
  beep(420,0.06,0.02);
  setPhase("IDLE");
  showStory();
  renderNode("boot");
});

resetBtn.addEventListener("click", ()=>{
  const ok = confirm("Reset MNEMOSYNTH progress? This clears saved score & state.");
  if(!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  state.save = loadSave();
  setLastScoreUI();
  setStability(state.save.stability);
  setPhase("IDLE");
  setMode("focus");
  renderNode("boot");
  showStory();
  terminal.innerHTML = "";
  logLine("RESET: new subject instance created.", "logSys");
});

soundToggle.addEventListener("click", ()=>{
  state.save.soundOn = !state.save.soundOn;
  saveNow();
  soundToggle.innerHTML = `<span class="icon">${state.save.soundOn ? "♪" : "×"}</span>`;
  beep(700,0.06,0.02);
});

/* -----------------------------
   Boot
----------------------------- */
function boot(){
  soundToggle.innerHTML = `<span class="icon">${state.save.soundOn ? "♪" : "×"}</span>`;
  setLastScoreUI();
  setStability(state.save.stability);
  setPhase("IDLE");
  setMode("focus");
  renderNode(state.save.nodeId);
  showStory();

  logLine("SYSTEM: MNEMOSYNTH boot sequence complete.", "logSys");
  logLine("SYSTEM: Your attention will determine what exists.", "logFaint");
}
boot();
