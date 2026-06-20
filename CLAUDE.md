# Parchi (پرچی)

A web app where a user photographs a handwritten doctor's prescription and gets a plain-language explanation of what each medicine is generally used for — in English and Urdu.

---

## Audience

Pakistani users, predominantly mobile. Many are more comfortable reading Urdu than English. Design and copy must reflect this.

---

## Non-Negotiable Safety Rules

These rules define the product. They are not optional and must be enforced at every layer — prompt, UI, and output rendering.

1. **Explain only.** The app explains what medicines are *generally used for*. It is not medical advice.
2. **No directives.** Never tell a user to take, stop, change, combine, or dose any medicine — not even implicitly.
3. **No confident guesses.** If handwriting is unclear for a drug name, mark that item `low-confidence`. A confidently wrong medicine name is dangerous. Silence or uncertainty is always safer than a plausible-sounding wrong answer.
4. **Always route to a professional.** Every result — success or partial — must prompt the user to confirm with their pharmacist or doctor.
5. **Persistent disclaimer.** A plain, visible disclaimer must always be on screen. It must not be hidden, collapsed, or de-emphasized below the fold.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS |
| AI Vision | Google Gemini Flash (free tier, multimodal) |
| AI calls | Server-side route handler only — API key never reaches the browser |
| Deploy | Vercel |
| Delivery | **PWA (Progressive Web App)** — Android users open in Chrome and tap "Add to Home Screen". Installs like a native app with no Play Store required. |

### PWA specifics

- `public/manifest.json` — name, theme color (`#0E6E5C`), background color (`#FAF6EC`), `display: standalone`, `orientation: portrait`
- Icons at `public/icons/` — 192 px, 512 px, maskable 512 px (generated from `icon.svg` via `scripts/generate-icons.mjs`)
- `theme-color` meta set to apothecary green so the Android status bar matches the top bar
- `viewport-fit=cover` + `user-scalable=no` for a full-bleed app feel
- Camera access: `<input type="file" accept="image/*" capture="environment">` opens the rear camera directly on Android Chrome — no native plugin needed

---

## Design Direction — "Prescription Pad, Made Calm"

**Feel:** Trustworthy and warm. Not cold-clinical. The interface should feel like a well-kept pharmacy, not a hospital dashboard.

**Signature elements:**
- Upload zone styled like a real prescription pad (ruled lines, faint watermark texture)
- Per-medicine confidence chips (honest, not optimistic)

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `paper` | `#FAF6EC` | Page background |
| `paper-deep` | `#F3EDDD` | Card/surface backgrounds |
| `ink` | `#20303B` | Primary text |
| `ink-soft` | `#5C6B72` | Secondary text, labels |
| `green` | `#0E6E5C` | Primary brand, CTAs |
| `green-deep` | `#0A5446` | Hover/active states |
| `mint` | `#E4EFE9` | Success surfaces, high-confidence chips |
| `amber-text` | `#B97A12` | Caution text |
| `amber-surface` | `#FBEFD6` | Low-confidence chip background |
| `coral` | `#BC4B33` | Error / unreadable states |
| `hairline` | `#E0D8C5` | Borders, dividers |

### Typography

| Role | Font | Notes |
|---|---|---|
| Display / headings | Fraunces | Serif, editorial warmth |
| Body / UI | Inter | Clean, legible at small sizes |
| Urdu text | Noto Nastaliq Urdu | All Urdu strings, RTL |
| Medicine name (as-read) | Spline Sans Mono | The literal string extracted from the image |

All fonts loaded via Google Fonts.

---

## Core User Flow

1. User opens app on mobile browser
2. User taps the prescription pad upload zone → takes a photo or picks from gallery
3. Image is sent to a server-side route handler
4. Route handler calls Gemini Flash with the image and a strict system prompt
5. Gemini returns structured JSON: an array of medicine entries
6. UI renders each medicine as a card with:
   - Name as-read from the prescription (monospace)
   - Matched/identified name (if confidence is high)
   - Confidence chip: `high` (mint) | `low` (amber) | `unreadable` (coral)
   - Plain-language general use — English
   - Plain-language general use — Urdu (Nastaliq, RTL)
7. Persistent disclaimer visible throughout
8. "Confirm with your pharmacist or doctor" CTA on every result

---

## AI Prompt Constraints (server-side)

The system prompt sent to Gemini must:
- Instruct the model to extract medicine names exactly as written (do not correct or interpret unclear writing into a confident guess)
- Return structured JSON only — no prose outside the schema
- For each item: include `name_as_read`, `identified_name` (or `null` if unclear), `confidence` (`high` | `low` | `unreadable`), `general_use_en`, `general_use_ur`
- Explicitly forbid dosage instructions, scheduling advice, drug interaction commentary, or any directive language in the output
- Instruct the model to leave `general_use_en` and `general_use_ur` empty (and set confidence to `unreadable`) when it cannot confidently identify the medicine

---

## What This App Is Not

- Not a drug database
- Not a dosage calculator
- Not a drug interaction checker
- Not a substitute for a pharmacist or physician
- Not a diagnostic tool
