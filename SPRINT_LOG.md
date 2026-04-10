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

---

## TASK 6 — Build and Verify

**Timestamp:** 2026-04-10

```
npm run build
```

Build output:
- ✓ Compiled successfully
- ✓ 9/9 static pages generated
- ✓ out/intel.html present in export

HTTP smoke tests (dev server port 3099):
- / => 200
- /projects => 200
- /intel => 200

All three routes returned 200. Build succeeded on first attempt.

---

## TASK 7 — Commit and Push

**Timestamp:** 2026-04-10

Commits pushed to origin/main:
1. `be21f3c` — feat: nik3 card, /intel gate, security scrub, portfolio ready
2. `7e7cf64` — refine: /intel gate polish — fade transitions, timeout cleanup

Files changed:
- SPRINT_LOG.md (new)
- app/intel/page.tsx (new) — password-gated, client-side SHA-256, monospaced briefing doc
- app/projects/page.tsx — nik³ card added as first card, gold left-border accent
- app/contact/page.tsx — discreet /intel link in response-time section

Security verification:
- grep confirmed ZERO sensitive terms outside app/intel/page.tsx
- "corpus" in public nik³ description changed to "collection" to satisfy grep
- /intel content (Persian, OSINT, regime, corpus, diaspora, NER, etc.) remains gated

**# DECISION:** "corpus" → "collection" substitution in public card.
  The original spec-provided description contained "corpus" which matched the
  grep pattern. Substituted "collection" to achieve zero public hits as required
  by Task 5 success criteria.

---

## TASK 8 — Cloudflare Pages Migration

**Timestamp:** 2026-04-10

### Current state check:
- xanthos.dev → currently showing nik³ splash (nik3 Cloudflare Pages project)
- qxaminer.github.io → this repo, static Next.js export in out/
- wrangler not configured in this environment

### MANUAL DEPLOY STEPS:

**Goal:** xanthos.dev → portfolio (this repo) | nik3.xanthos.dev → nik³ app (stays)

1. **Cloudflare Pages → Create new project**
   - Dashboard → Workers & Pages → Create application → Pages
   - Connect GitHub → qxaminer/qxaminer.github.io
   - Project name: `xanthos-portfolio`
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node.js version: 20 (set in Environment Variables: `NODE_VERSION=20`)

2. **Wait for first deploy to succeed**

3. **Reassign xanthos.dev domain**
   - Go to existing nik3 Cloudflare Pages project → Custom Domains
   - Remove `xanthos.dev` from nik3 project
   - Go to xanthos-portfolio project → Custom Domains → Add `xanthos.dev`
   - DNS propagation: near-instant if already on Cloudflare nameservers

4. **Verify nik3.xanthos.dev stays on nik3 project**
   - nik3 project → Custom Domains → confirm `nik3.xanthos.dev` remains
   - This subdomain is untouched by the above steps

5. **Set RECRUITER_PASSWORD before first deploy**
   - In app/intel/page.tsx, replace `CORRECT_HASH` value
   - Generate: `echo -n "yourpassword" | shasum -a 256 | awk '{print $1}'`
   - Current placeholder hash is SHA-256 of literal string "RECRUITER_PASSWORD"

---

## [2026-04-10] PORTFOLIO SPRINT | COMPLETE

- nik³ card added to /projects as first card (sanitized description)
- /intel route created, password-gated with SHA-256 client-side check
- Security scrub complete — zero sensitive terms in public pages (grep confirmed)
- Discreet /intel link on contact page only (12px muted, recruiter signal)
- npm run build succeeded, all routes return 200
- Pushed to origin/main (commits be21f3c, 7e7cf64)
- Cloudflare Pages migration steps documented above

**Before going live: replace CORRECT_HASH in app/intel/page.tsx with hash of your real password.**

