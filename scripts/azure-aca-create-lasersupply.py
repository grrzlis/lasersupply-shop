#!/usr/bin/env python3
"""Create/update ACA lasersupply-shop with env + optional Origin CA domain."""
from __future__ import annotations

import json
import os
import re
import sys
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUB = "c0d814bc-999a-4682-8701-90f782604a56"
RG = "rg-the-gist"
APP = "lasersupply-shop"
ENV_NAME = "the-gist-env"
LOCATION = "northeurope"
TOKEN_FILE = Path.home() / "AppData/Local/Temp/azure-arm-token.txt"
DB_URL_FILE = Path.home() / "AppData/Local/Temp/lasersupply-database-url.txt"
CERT_NAME = "cf-origin-lasersupply"
CERT_ID = (
    f"/subscriptions/{SUB}/resourceGroups/{RG}/providers/Microsoft.App/"
    f"managedEnvironments/{ENV_NAME}/certificates/{CERT_NAME}"
)


def load_env(path: Path) -> dict[str, str]:
    out: dict[str, str] = {}
    if not path.exists():
        return out
    for raw in path.read_text(encoding="utf-8").splitlines():
        line = raw.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        out[k.strip()] = v.strip().strip('"').strip("'")
    return out


def arm(token: str, method: str, url: str, body: dict | None = None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=180) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {"raw": raw[:1000]}
        return e.code, payload


def main() -> None:
    bind_domain = "--bind-domain" in sys.argv
    token = os.environ.get("AZURE_ARM_TOKEN") or TOKEN_FILE.read_text(encoding="utf-8").strip()
    merged = load_env(ROOT / ".env.local")
    # Prefer dedicated DATABASE_URL file (never commit)
    if DB_URL_FILE.exists():
        merged["DATABASE_URL"] = DB_URL_FILE.read_text(encoding="utf-8").strip()
    merged["NODE_ENV"] = "production"
    merged["NEXT_PUBLIC_STORE_DOMAIN"] = "https://lasersupply.org"
    cleaned = {k: v for k, v in merged.items() if str(v).strip() and not k.startswith("CF_")}

    secrets = []
    env_vars = []
    for key, val in sorted(cleaned.items()):
        secret_name = re.sub(r"[^a-z0-9-]", "-", key.lower()).strip("-")
        secrets.append({"name": secret_name, "value": val})
        env_vars.append({"name": key, "secretRef": secret_name})

    st, acr = arm(
        token,
        "POST",
        f"https://management.azure.com/subscriptions/{SUB}/resourceGroups/{RG}/providers/Microsoft.ContainerRegistry/registries/thegistacr/listCredentials?api-version=2023-07-01",
    )
    if st >= 300:
        raise SystemExit(f"acr creds: {st} {acr}")
    secrets = [s for s in secrets if s["name"] != "acr-password"]
    secrets.append({"name": "acr-password", "value": acr["passwords"][0]["value"]})

    env_id = (
        f"/subscriptions/{SUB}/resourceGroups/{RG}/providers/Microsoft.App/"
        f"managedEnvironments/{ENV_NAME}"
    )
    app_url = (
        f"https://management.azure.com/subscriptions/{SUB}/resourceGroups/{RG}/"
        f"providers/Microsoft.App/containerApps/{APP}?api-version=2023-05-01"
    )

    custom_domains = []
    if bind_domain:
        custom_domains = [
            {
                "name": "lasersupply.org",
                "bindingType": "SniEnabled",
                "certificateId": CERT_ID,
            }
        ]

    body = {
        "location": LOCATION,
        "identity": {"type": "None"},
        "properties": {
            "managedEnvironmentId": env_id,
            "configuration": {
                "secrets": secrets,
                "registries": [
                    {
                        "server": "thegistacr.azurecr.io",
                        "username": acr.get("username") or "thegistacr",
                        "passwordSecretRef": "acr-password",
                    }
                ],
                "ingress": {
                    "external": True,
                    "targetPort": 3000,
                    "transport": "Auto",
                    "allowInsecure": True,
                    "customDomains": custom_domains,
                },
            },
            "template": {
                "containers": [
                    {
                        "name": APP,
                        "image": "thegistacr.azurecr.io/lasersupply-shop:latest",
                        "env": env_vars,
                        "resources": {"cpu": 0.5, "memory": "1Gi"},
                    }
                ],
                "scale": {"minReplicas": 0, "maxReplicas": 3},
            },
        },
    }

    status, result = arm(token, "PUT", app_url, body)
    print(
        json.dumps(
            {
                "status": status,
                "err": (result.get("error") or {}).get("message"),
                "provisioningState": (result.get("properties") or {}).get("provisioningState"),
                "fqdn": ((result.get("properties") or {}).get("configuration") or {})
                .get("ingress", {})
                .get("fqdn"),
                "domains": ((result.get("properties") or {}).get("configuration") or {})
                .get("ingress", {})
                .get("customDomains"),
            },
            indent=2,
        )
    )
    if status >= 300:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
