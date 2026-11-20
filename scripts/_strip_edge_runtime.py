from pathlib import Path

root = Path(__file__).resolve().parents[1] / "src"
needle = "export const runtime = 'edge';"
for path in list(root.rglob("*.ts")) + list(root.rglob("*.tsx")):
    text = path.read_text(encoding="utf-8")
    if needle not in text:
        continue
    updated = text.replace(needle + "\r\n", "").replace(needle + "\n", "").replace(needle, "")
    path.write_text(updated, encoding="utf-8")
    print(f"stripped {path.relative_to(root.parent)}")
