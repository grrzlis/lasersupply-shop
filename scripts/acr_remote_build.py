#!/usr/bin/env python3
"""Upload lasersupply tarball to ACR and schedule remote docker build."""
from __future__ import annotations

import json
import os
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SUB = "c0d814bc-999a-4682-8701-90f782604a56"
RG = "rg-the-gist"
ACR = "thegistacr"
TAR = ROOT / "lasersupply-acr.tar.gz"
IMAGE = "lasersupply-shop:latest"
TOKEN_FILE = Path.home() / "AppData/Local/Temp/azure-arm-token.txt"


def arm(token: str, method: str, url: str, body: dict | None = None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        url,
        data=data,
        method=method,
        headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {"raw": raw}
        return e.code, payload


def main() -> None:
    token = os.environ.get("AZURE_ARM_TOKEN") or (
        TOKEN_FILE.read_text(encoding="utf-8").strip() if TOKEN_FILE.exists() else ""
    )
    if not token:
        raise SystemExit("Set AZURE_ARM_TOKEN or write azure-arm-token.txt")
    if not TAR.exists():
        raise SystemExit(f"missing {TAR}")

    base = (
        f"https://management.azure.com/subscriptions/{SUB}/resourceGroups/{RG}/"
        f"providers/Microsoft.ContainerRegistry/registries/{ACR}"
    )
    status, upload = arm(
        token, "POST", f"{base}/listBuildSourceUploadUrl?api-version=2019-04-01"
    )
    if status >= 300:
        raise SystemExit(f"upload url failed: {status} {upload}")
    upload_url = upload["uploadUrl"]
    relative = upload["relativePath"]
    print(f"upload relative={relative}")

    with TAR.open("rb") as f:
        blob = f.read()
    req = urllib.request.Request(
        upload_url,
        data=blob,
        method="PUT",
        headers={"Content-Length": str(len(blob)), "x-ms-blob-type": "BlockBlob"},
    )
    with urllib.request.urlopen(req, timeout=600) as res:
        print(f"blob upload status={res.status} bytes={len(blob)}")

    run_body = {
        "type": "DockerBuildRequest",
        "isArchive": True,
        "sourceLocation": relative,
        "platform": {"os": "Linux", "architecture": "amd64"},
        "dockerFilePath": "Dockerfile",
        "imageNames": [IMAGE],
        "isPushEnabled": True,
    }
    status, run = arm(token, "POST", f"{base}/scheduleRun?api-version=2019-04-01", run_body)
    if status >= 300:
        raise SystemExit(f"scheduleRun failed: {status} {json.dumps(run)[:800]}")
    run_id = run.get("name") or run.get("properties", {}).get("runId")
    print(f"run_id={run_id}")

    for _ in range(120):
        time.sleep(15)
        st, cur = arm(token, "GET", f"{base}/runs/{run_id}?api-version=2019-04-01")
        props = cur.get("properties") or {}
        print(f"poll {props.get('status')} err={props.get('runErrorMessage')}")
        if props.get("status") in ("Succeeded", "Failed", "Canceled"):
            if props.get("status") != "Succeeded":
                _, logs = arm(
                    token,
                    "POST",
                    f"{base}/runs/{run_id}/listLogSasUrl?api-version=2019-04-01",
                )
                print("logSas=", logs.get("logLink") or logs)
                raise SystemExit(1)
            print("build succeeded")
            return
    raise SystemExit("timeout waiting for ACR build")


if __name__ == "__main__":
    main()
