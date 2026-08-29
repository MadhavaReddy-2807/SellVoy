/**
 * Sellvoy Onboarding — main.js (3-slide)
 * Slide 1: Intro  |  Slide 2: Database + Voy AI  |  Slide 3: Scan Websites
 */

const TOTAL_SLIDES = 3;
let current = 0;
let transitioning = false;

/* ── Build nav dots ── */
const dotsContainer = document.getElementById('nav-dots');
for (let i = 0; i < TOTAL_SLIDES; i++) {
  const d = document.createElement('div');
  d.className = 'nav-step-dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Slide ' + (i + 1));
  d.onclick = () => goToSlide(i);
  dotsContainer.appendChild(d);
}

document.getElementById('skip-btn').onclick = () => goToSlide(TOTAL_SLIDES - 1);

/* ── Update UI ── */
function updateUI() {
  document.querySelectorAll('.nav-step-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
    d.classList.toggle('done',   i < current);
  });

  document.getElementById('progress-bar').style.width =
    ((current / (TOTAL_SLIDES - 1)) * 100) + '%';

  document.getElementById('slide-counter').textContent =
    (current + 1) + ' / ' + TOTAL_SLIDES;

  document.getElementById('btn-prev').style.visibility =
    current === 0 ? 'hidden' : 'visible';

  const nextBtn = document.getElementById('btn-next');
  if (current === TOTAL_SLIDES - 1) {
    nextBtn.textContent = 'Go to dashboard →';
    nextBtn.onclick = () => { window.location.href = '/dashboard'; };
  } else {
    nextBtn.textContent = 'Next →';
    nextBtn.onclick = nextSlide;
  }
}

/* ── Navigate ── */
function goToSlide(index) {
  if (transitioning || index === current) return;
  transitioning = true;

  const oldSlide = document.querySelector('.slide.active');
  const newSlide = document.querySelector(`.slide[data-index="${index}"]`);

  oldSlide.classList.add('exit-up');
  oldSlide.classList.remove('active');

  setTimeout(() => {
    oldSlide.classList.remove('exit-up');
    newSlide.classList.add('active');
    current = index;
    updateUI();
    onSlideEnter(index);
    transitioning = false;
  }, 360);
}

function nextSlide() { if (current < TOTAL_SLIDES - 1) goToSlide(current + 1); }
function prevSlide()  { if (current > 0) goToSlide(current - 1); }

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevSlide();
});

/* ════════════════════════════════════
   Per-slide animations
   ════════════════════════════════════ */
function onSlideEnter(index) {
  if (index === 0) animateIntro();
  if (index === 1) animateDatabase();
  if (index === 2) animateScanner();
}

/* ────────────────────────────────────
   SLIDE 1 — Intro pillars
   ──────────────────────────────────── */
function animateIntro() {
  document.querySelectorAll('.pillar-card').forEach((card, i) => {
    card.classList.remove('visible');
    setTimeout(() => card.classList.add('visible'), 100 + i * 130);
  });
}

/* ────────────────────────────────────
   SLIDE 2 — Database + Voy AI
   ──────────────────────────────────── */
const VOY_PROMPTS = [
  'Find IN stores over past 1 week…',
];

let voyTimers = [];

function animateDatabase() {
  // Clear previous timers
  voyTimers.forEach(t => clearTimeout(t));
  voyTimers = [];

  /* Panel slide-in */
  const dbPanel = document.getElementById('db-panel');
  const aiPanel = document.getElementById('ai-panel');
  dbPanel.classList.remove('visible');
  aiPanel.classList.remove('visible');

  setTimeout(() => dbPanel.classList.add('visible'), 80);
  setTimeout(() => aiPanel.classList.add('visible'), 200);

  /* Count-up: stores */
  animateCount('stat-stores', 0, 1000000, 1400, v =>
    v >= 1000000 ? '1,000,000+' : v.toLocaleString()
  );

  /* Count-up: new today */
  animateCount('stat-new', 0, 3847, 1200, v => v.toLocaleString());

  /* Stagger field tags */
  const tags = document.querySelectorAll('.ftag');
  tags.forEach(t => t.classList.remove('visible'));
  tags.forEach((t, i) => {
    const timer = setTimeout(() => t.classList.add('visible'), 300 + i * 60);
    voyTimers.push(timer);
  });

  /* Typewriter Voy AI prompt */
  const promptText = document.getElementById('ai-prompt-text');
  promptText.innerHTML = '<span class="cursor"></span>';

  const phrase = VOY_PROMPTS[Math.floor(Math.random() * VOY_PROMPTS.length)];
  let charIdx = 0;

  function typeChar() {
    if (charIdx < phrase.length) {
      promptText.innerHTML = phrase.slice(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      const t = setTimeout(typeChar, 28 + Math.random() * 18);
      voyTimers.push(t);
    } else {
      /* Show arrow + results after typing finishes */
      const t1 = setTimeout(() => {
        document.getElementById('ai-arrow').classList.add('visible');
      }, 200);
      const t2 = setTimeout(() => {
        document.getElementById('ai-results').classList.add('visible');
      }, 700);
      voyTimers.push(t1, t2);
    }
  }

  /* Reset results */
  document.getElementById('ai-arrow').classList.remove('visible');
  document.getElementById('ai-results').classList.remove('visible');

  const startTimer = setTimeout(typeChar, 600);
  voyTimers.push(startTimer);
}

function animateCount(id, from, to, duration, format) {
  const el = document.getElementById(id);
  if (!el) return;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(from + (to - from) * eased);
    el.textContent = format ? format(value) : value;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ────────────────────────────────────
   SLIDE 3 — Live Scanner
   ──────────────────────────────────── */
const SCAN_LINES = [
  { delay: 0,    html: '<span class="t-cmd">$ sellvoy scan</span> mcaffeine.com' },
  { delay: 480,  html: '<span class="t-key">resolving    </span> <span class="t-val">mcaffeine.com</span>' },
  { delay: 780,  html: '<span class="t-key">platform     </span> <span class="t-val">Shopify ✓</span>' },
  { delay: 1020, html: '<span class="t-key">status       </span> <span class="t-good">● Active</span>' },
  { delay: 1240, html: '<span class="t-key">currency     </span> <span class="t-val">INR · 🇮🇳 India</span>' },
  { delay: 1440, html: '<span class="t-key">theme        </span> <span class="t-val">Premium DTC Framework ✓</span>' },
  { delay: 1640, html: '<span class="t-key">products     </span> <span class="t-val">192 variants · ₹89 - ₹1692</span>' },
  { delay: 1840, html: '<span class="t-key">tech_stack   </span> <span class="t-val">Judge.me · CustomFit AI · GoKwik · Shop Pay</span>' },
  { delay: 2080, html: '<span class="t-key">socials      </span> <span class="t-val">@mcaffeineofficial · IG + FB</span>' },
  { delay: 2260, html: '<span class="t-key">email_contact</span> <span class="t-val">woot@mcaffeine.com ✓</span>' },
  { delay: 2460, html: '<span class="t-key">signal_score </span> <span class="t-good">6 / 10  ▓▓▓▓▓▓░░░░</span>' },
  { delay: 2700, html: '<span class="t-key">ai_summary   </span> <span class="t-val">India\'s first caffeinated brand for skin & hair care.</span>' },
  { delay: 2920, html: '<span class="t-good">✓ Scan complete · Store is pitch-ready</span>' },
  { delay: 3150, html: '<span class="cursor"></span>' },
];

let scanTimers = [];
let scanDone = false;

function animateScanner() {
  /* Show input bar + terminal */
  const inputRow = document.getElementById('scan-input-row');
  const terminal = document.getElementById('terminal-card');
  inputRow.classList.remove('visible');
  terminal.classList.remove('visible');

  scanDone = false;

  setTimeout(() => inputRow.classList.add('visible'), 80);
  setTimeout(() => terminal.classList.add('visible'), 200);
  setTimeout(() => runScanAnimation(), 400);
}

function runScanAnimation() {
  scanTimers.forEach(t => clearTimeout(t));
  scanTimers = [];

  const body = document.getElementById('terminal-body');
  body.innerHTML = '';
  scanDone = false;

  /* Flash scan button */
  const btn = document.getElementById('scan-btn');
  btn.classList.add('scanning');
  btn.textContent = 'Scanning…';

  SCAN_LINES.forEach(line => {
    const t = setTimeout(() => {
      const el = document.createElement('div');
      el.className = 't-line';
      el.innerHTML = line.html;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;

      /* When last line appears, reset scan button */
      if (line === SCAN_LINES[SCAN_LINES.length - 1]) {
        btn.classList.remove('scanning');
        btn.textContent = 'Scan →';
        scanDone = true;
      }
    }, line.delay);
    scanTimers.push(t);
  });
}

/* Clicking scan btn re-runs the animation */
function triggerScan() {
  const body = document.getElementById('terminal-body');
  body.innerHTML = '';
  runScanAnimation();
}

/* ── Init ── */
updateUI();
animateIntro();
