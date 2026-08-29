# Sellvoy — Onboarding Page

A 7-slide animated onboarding walkthrough for first-time Sellvoy users.
Built in plain **HTML / CSS / JS** — no framework, no dependencies (except Google Fonts).

---

## 📁 Project Structure

```
sellvoy-onboarding/
├── index.html    ← Main HTML (slide markup)
├── styles.css    ← All styles (Sellvoy design system)
├── main.js       ← Navigation logic + slide animations
└── README.md     ← This file
```

---

## 🎬 Slides

| # | Title              | What it shows                                      |
|---|--------------------|----------------------------------------------------|
| 1 | **Welcome**        | Hero intro, feature badges, live stats             |
| 2 | **What is Sellvoy**| 6-card feature grid (Discovery, Enrichment, etc.)  |
| 3 | **Who it's for**   | 4 role cards (SaaS, Agency, Freelancer, App Dev)   |
| 4 | **Live Scanner**   | Typewriter terminal showing a real store scan      |
| 5 | **Signal Score**   | Animated SVG ring + 10-signal checklist reveal     |
| 6 | **Credits**        | Pricing tiers with animated check-off effect       |
| 7 | **You're Ready**   | Final CTA with credit balance badge                |

---

## ⌨️ Navigation

| Action            | How                                       |
|-------------------|-------------------------------------------|
| Next slide        | Click **Next →** button or `→` / `↓` key |
| Previous slide    | Click **← Back** button or `←` / `↑` key |
| Jump to any slide | Click the dot indicators in the navbar    |
| Skip entirely     | Click **Skip intro →** in top-right       |

---

## 🎨 Design Tokens

| Token     | Value      | Usage                        |
|-----------|------------|------------------------------|
| `--ink`   | `#0B0E14`  | Background                   |
| `--indigo`| `#5B6FED`  | Primary accent, CTAs         |
| `--signal`| `#3DDC84`  | Success states, active items |
| `--slate` | `#8B92A8`  | Secondary text               |
| `--coral` | `#FF6B5C`  | Error / warning states       |

Font: **JetBrains Mono** (loaded from Google Fonts)

---

## 🔧 Customization

### Update CTA links (Slide 7)
In `index.html`, find the last slide buttons and update the `href` values:
```html
<button onclick="window.location.href='/dashboard'">Go to dashboard →</button>
<button onclick="window.location.href='/scan'">Try live scanner ↗</button>
```

### Change the terminal scan example (Slide 4)
In `main.js`, edit the `TERMINAL_LINES` array to use a different store domain.

### Add or remove slides
1. Add a new `<div class="slide" data-index="N">` in `index.html`
2. Update `TOTAL_SLIDES` in `main.js`
3. Add an entry in the `handlers` object inside `onSlideEnter()` if it needs animation

---

## 🚀 How to run

Just open `index.html` in any browser — no build step needed.

```bash
# Windows
start index.html

# Mac
open index.html
```

---

## 📬 Contact

team@sellvoy.com · [sellvoy.com](https://sellvoy.com)
