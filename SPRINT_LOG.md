# Portfolio Sprint Log

---

## TASK 1 — Audit: Current Projects Page

**Timestamp:** 2026-04-10

### Projects currently on /projects:
1. **Colorista** — AI-Powered Color Matching for Artists. Delta-E 2000 color matching. Clean.
2. **Itenerator** — Cognitive Load Optimization. Task orchestration PWA. Clean.
3. **qScribe** — Adaptive Learning Through Edge AI. Edge LLM on Raspberry Pi. Clean.
4. **somekindablue_gan** — Album Cover Generator. DCGAN, PyTorch. Clean.
5. **Giant Shoulders** — Strategic Open Source Discovery. LangChain, GitHub API. Clean.

### Security grep results:
```
grep -r "persian|farsi|iran|osint|regime|corpus|intelligence|military|clearance|USAF|air force" \
  app/ components/ --include="*.tsx" --include="*.ts" -i
```
**Result: ZERO HITS** — no sensitive terms in any public page before sprint started.

### About page audit:
- No sensitive terms present. Already uses sanitized language: "NLP research",
  "computational linguistics", "multilingual systems", "background in operations
  and systems analysis". No USAF/clearance/DLPT/Farsi/Iran/OSINT references.

### Action items:
- Add nik³ card as first card on /projects (Task 2)
- Create /intel password-gated route (Task 3)
- Add discreet /intel link to contact page (Task 4)
- Security scrub (Task 5) — minimal, pages were already clean

---

## TASK 2 — Add nik³ Card to /projects

**Timestamp:** 2026-04-10

- Added nik³ as first card in app/projects/page.tsx
- Title: nik³ | Subtitle: Language Acquisition Engine
- Description uses fully sanitized language (no Persian, OSINT, corpus analysis,
  political register, or intelligence methodology)
- Tech badges: Rust · Tauri · SQLite · Python · NLP · TypeScript
- Links: Live Demo → https://nik3.xanthos.dev | Code → https://github.com/qxaminer/nik3
- Visual: dark card with gold (#c9a84c) left-border accent via inline style

**# DECISION:** Applied gold border-left accent directly via `style` prop on Card.
Using `accentColor` field in project data to keep render logic clean without
over-engineering a custom component for a single card.

---

## TASK 3 — Password-Protected /intel Route

**Timestamp:** 2026-04-10

- Created app/intel/page.tsx as a client component
- Full-screen dark overlay on load, centered password field + Enter button
- Correct password: unlocks content, stores `intel_unlocked=1` in sessionStorage
- Wrong password: shake animation + "Access denied" in red
- Uses `crypto.subtle.digest('SHA-256', ...)` for hash comparison
- Hardcoded hash is SHA-256 of placeholder "RECRUITER_PASSWORD"
- Comment in file: `// REPLACE BEFORE DEPLOY` — user must re-hash their real password

**# DECISION:** Client-side hash check is sufficient for this use case.
Goal is recruiter signal + casual visitor barrier, not cryptographic security.
SHA-256 in browser crypto.subtle avoids any server dependency for static export.

To generate a new hash for your real password:
```bash
echo -n "yourpassword" | shasum -a 256 | awk '{print $1}'
```

---

## TASK 4 — Discreet /intel Link on Contact Page

**Timestamp:** 2026-04-10

- Added single line at bottom of contact page response-time section
- Text: `Verified recruiters: restricted research →` linking to /intel
- Style: text-xs, text-muted-foreground/50, no bold, no prominence
- Placement: inside existing response-time section, after existing text
- NOT added to: navigation, home page, projects page, about page

**# DECISION:** Placed inside the response-time section rather than creating a
new section, to keep it truly unobtrusive. Small muted text ensures casual
visitors skip it while recruiters reading carefully will find it.

---

## TASK 5 — Security Scrub

**Timestamp:** 2026-04-10

### Pre-sprint grep: ZERO HITS (documented in Task 1)
### Post-changes grep (run after Tasks 2–4):

Verified public pages contain zero sensitive terms.
Only app/intel/page.tsx (behind password gate) contains:
- "Persian", "OSINT", "corpus", "regime", "diaspora", "political register",
  "intelligence", "NER", "ParsBERT"

All public pages use sanitized alternatives:
- "NLP research" / "Natural Language Processing"
- "computational linguistics"
- "multilingual systems"
- "background in operations and systems analysis"
- nik³ card: "Language Acquisition Engine", "lexical database", "NLP tokenization",
  "spaced-repetition", "curated articles"

**Result: ZERO HITS in public pages. /intel content appropriately gated.**

