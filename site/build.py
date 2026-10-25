#!/usr/bin/env python3
"""Bundle the Markdown/JSON content of /ifrs-study into site/assets/content.js.
Run:  python3 site/build.py     then open site/index.html (works offline, no server)."""
import json, re, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SECTIONS = ["ifrs", "ias", "concepts", "comparisons", "calculations", "journal-entries",
            "case-studies", "rapid-review", "glossary", "sources"]

def front(text):
    m = re.match(r"^---\n(.*?)\n---\n", text, re.S)
    meta = {}
    if m:
        for line in m.group(1).split("\n"):
            k, _, v = line.partition(":")
            if k.strip() and _:
                meta[k.strip()] = v.strip().strip('"')
        text = text[m.end():]
    return meta, text

def headings(body):
    out, fence = [], False
    for line in body.split("\n"):
        if line.startswith("```"):
            fence = not fence
        m = re.match(r"^(#{1,3})\s+(.*)$", line)
        if m and not fence:
            out.append({"level": len(m.group(1)), "text": m.group(2).strip()})
    return out

def sections_named(body, names):
    """Return (heading, text) blocks whose heading matches one of `names` (case-insensitive prefix)."""
    blocks, cur, fence = [], None, False
    for line in body.split("\n"):
        if line.startswith("```"):
            fence = not fence
        m = re.match(r"^(#{1,3})\s+(.*)$", line)
        if m and not fence:
            if cur: blocks.append(cur)
            title = re.sub(r"^\d+[a-z]?\.\s*", "", m.group(2).strip())
            cur = {"heading": m.group(2).strip(), "match": any(title.lower().startswith(n) for n in names),
                   "level": len(m.group(1)), "lines": []}
        elif cur is not None:
            cur["lines"].append(line)
    if cur: blocks.append(cur)
    def clean(lines):
        t = "\n".join(lines).strip()
        return re.sub(r"\n+-{3,}\s*$", "", t).strip()
    return [(b["heading"], clean(b["lines"])) for b in blocks if b["match"] and clean(b["lines"])]

pages, problems = [], []
for sec in SECTIONS:
    for f in sorted((ROOT / sec).glob("*.md")):
        meta, body = front(f.read_text(encoding="utf-8"))
        title = meta.get("title") or (re.search(r"^#\s+(.*)$", body, re.M) or [None, f.stem])[1]
        pages.append({"id": f"{sec}/{f.stem}", "section": sec, "title": title,
                      "standard": meta.get("standard", ""), "version": meta.get("version", ""),
                      "effective_date": meta.get("effective_date", ""), "source": meta.get("source", ""),
                      "body": body, "headings": headings(body)})

traps, review = [], []
for p in pages:
    for h, t in sections_named(p["body"], ["exam trap", "common mistake", "exam focus"]):
        traps.append({"page": p["id"], "title": p["title"], "heading": h, "text": t})
    for h, t in sections_named(p["body"], ["quick review"]):
        review.append({"page": p["id"], "title": p["title"], "heading": h, "text": t})

questions, flashcards = [], []
for f in sorted((ROOT / "questions").glob("*.json")):
    for q in json.loads(f.read_text(encoding="utf-8")):
        ok = (isinstance(q.get("options"), list) and len(q["options"]) == 4 and q.get("answer") in range(4)
              and q.get("explanation") and q.get("why_wrong") and q.get("standard") and q.get("difficulty") and q.get("source"))
        if not ok: problems.append(f"bad question {q.get('id')} in {f.name}")
        questions.append(q)
for f in sorted((ROOT / "flashcards").glob("*.json")):
    for c in json.loads(f.read_text(encoding="utf-8")):
        if not (c.get("q") and c.get("a") and c.get("standard") and c.get("source")):
            problems.append(f"bad flashcard {c.get('id')} in {f.name}")
        flashcards.append(c)

standards = json.loads((ROOT / "standards.json").read_text(encoding="utf-8"))
ids = {p["id"] for p in pages}
for s_ in standards:
    s_["ready"] = s_["page"] in ids
    s_["partial"] = "partial" in s_["name"].lower()

data = {"pages": pages, "questions": questions, "flashcards": flashcards, "traps": traps,
        "review": review, "standards": standards}
out = ROOT / "site" / "assets" / "content.js"
out.write_text("window.IFRS_DATA = " + json.dumps(data, ensure_ascii=False) + ";\n", encoding="utf-8")
print(f"pages={len(pages)} questions={len(questions)} flashcards={len(flashcards)} traps={len(traps)} review={len(review)}")
if problems:
    print("\n".join(problems)); sys.exit(1)
