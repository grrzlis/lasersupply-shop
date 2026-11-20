#!/usr/bin/env python3
"""Decode Origin CA PEM from stdin JSON {certB64,keyB64} → temp files."""
from __future__ import annotations

import base64
import json
import sys
from pathlib import Path

payload = json.loads(sys.stdin.read())
out = Path.home() / "AppData/Local/Temp/ls-origin"
out.mkdir(parents=True, exist_ok=True)
cert = base64.b64decode(payload["certB64"]).decode()
key = base64.b64decode(payload["keyB64"]).decode()
(out / "lasersupply-origin.crt").write_text(cert, encoding="utf-8")
(out / "lasersupply-origin.key").write_text(key, encoding="utf-8")
print("wrote", out)
print("cert_ok", cert.startswith("-----BEGIN CERTIFICATE-----"))
print("key_ok", "PRIVATE KEY" in key.splitlines()[0])
