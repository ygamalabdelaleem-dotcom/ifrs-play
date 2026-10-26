# IFRS Study / مرجع IFRS

Reference and exam-preparation site for external audit work and the DipIFR exam (June 2027).

## Open the site
1. `python3 site/build.py` (bundles all content into `site/assets/content.js`)
2. Open `site/index.html` in any browser. No server needed.

## IFRS Play (Duolingo-style app)
`site/learn/` is a phone app version: units per standard, short lessons (journal entries, calculations, ordering steps, classification, select-all, true/false, fill-the-blank, multiple choice; term matching in practice), hearts, XP, streak, daily goal, mistakes practice. Progress is saved in the browser.
Content: `learn/*.json` (intro, pairs, tf, fill, je, calc, seq, classify, multi) + `questions/*.json`. `learn/_extra.py` holds the journal-entry, calculation, ordering, classification and select-all items. `python3 site/build.py` also writes `site/learn/data.js`.
Live: https://ygamalabdelaleem-dotcom.github.io/ifrs-play/learn/

## Structure
```
ifrs/ ias/ concepts/ comparisons/ calculations/ journal-entries/ case-studies/
questions/*.json   flashcards/*.json   rapid-review/ glossary/ sources/
standards.json     (coverage table on the home page)
site/              (index.html, assets/style.css, assets/app.js, build.py)
```

## Page format (Markdown)
Front matter: `title, standard, version, effective_date, source`. Sections named `Exam traps` / `Common mistakes` and `Quick review` are collected automatically into the Exam Traps and Quick Review views.

## Question format (questions/*.json)
`id, standard, topic, difficulty (easy|medium|hard), question, options[4], answer (0-3), explanation, why_wrong[4], source`

## Flashcard format (flashcards/*.json)
`id, standard, topic, q, a, source`

## Rules
Sources: BPP DipIFR Study Text and Kit 2025-26. No invented paragraph numbers or dates. If a reference cannot be verified: "Exact source reference could not be verified from the uploaded document."
Content must be checked against ACCA's June 2027 examinable list (see `sources/curriculum-map.md`).
