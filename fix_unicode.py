from pathlib import Path

files = [
    "src/components/ContextCTA.astro",
    "src/components/KnowledgeNavigator.astro",
    "src/components/RelatedContent.astro",
    "src/pages/tulisan/index.astro",
    "src/pages/tulisan/edition/index.astro",
]

replacements = {
    "â†’": "→",
    "Â·": "·",
    "â€¦": "…",
    "Â©": "©",
}

for f in files:
    p = Path(f)
    text = p.read_text(encoding="utf-8", errors="replace")
    for old, new in replacements.items():
        text = text.replace(old, new)
    p.write_text(text, encoding="utf-8", newline="\n")
    print("Fixed:", f)

print("Selesai.")