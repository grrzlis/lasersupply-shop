#!/usr/bin/env python3
"""Export Cloudflare D1 lasersupply-db → Azure PostgreSQL."""
from __future__ import annotations

import json
import os
import sys
import urllib.error
import urllib.request
from pathlib import Path

try:
    import psycopg
except ImportError:
    print("pip install 'psycopg[binary]'", file=sys.stderr)
    raise

ACCOUNT = "8e5ade2175f6ddeecf5b634d25145a38"
DB_NAME = "lasersupply-db"
BATCH = int(os.environ.get("MIGRATE_BATCH", "200"))

TABLES = [
    "categories",
    "products",
    "variants",
    "orders",
    "visitor_sessions",
]

PG_SCHEMA = """
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT
);
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category_id TEXT NOT NULL,
  description TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  compare_at_price DOUBLE PRECISION,
  cost_price DOUBLE PRECISION,
  supplier_sku TEXT,
  supplier_url TEXT,
  in_stock INTEGER DEFAULT 1,
  badge TEXT,
  laser_type TEXT,
  recommended_power TEXT,
  images TEXT NOT NULL,
  created_at TEXT DEFAULT NOW()::text
);
CREATE TABLE IF NOT EXISTS variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL,
  title TEXT NOT NULL,
  sku TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  inventory_quantity INTEGER DEFAULT 999
);
CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY,
  customer_email TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  total_amount DOUBLE PRECISION NOT NULL,
  currency TEXT DEFAULT 'EUR',
  payment_status TEXT NOT NULL,
  fulfillment_status TEXT DEFAULT 'unfulfilled',
  supplier_order_id TEXT,
  tracking_number TEXT,
  tracking_url TEXT,
  items TEXT NOT NULL,
  created_at TEXT DEFAULT NOW()::text
);
CREATE TABLE IF NOT EXISTS visitor_sessions (
  id TEXT PRIMARY KEY,
  ip_hash TEXT,
  country TEXT,
  city TEXT,
  current_path TEXT,
  referrer TEXT,
  device TEXT,
  cart_count INTEGER DEFAULT 0,
  last_active_at BIGINT,
  created_at BIGINT
);
"""


def load_cf_token() -> str:
    env = os.environ.get("CLOUDFLARE_API_TOKEN", "").strip()
    if env:
        return env
    for candidate in [
        Path(r"E:\THE gist\projektai\The Gist Agency Website-live-release\the-gist\.env.local"),
        Path(r"E:\THE gist\Comand center\.env.local"),
        Path(r"E:\THE gist\Projektai\eshop\technology\.env.local"),
    ]:
        if not candidate.exists():
            continue
        for line in candidate.read_text(encoding="utf-8").splitlines():
            if line.startswith("CLOUDFLARE_API_TOKEN="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("CLOUDFLARE_API_TOKEN missing")


def cf(token: str, method: str, path: str, body: dict | None = None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        f"https://api.cloudflare.com/client/v4{path}",
        data=data,
        method=method,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=120) as res:
            return json.loads(res.read().decode())
    except urllib.error.HTTPError as e:
        raw = e.read().decode("utf-8", errors="replace")
        raise SystemExit(f"CF {method} {path} -> {e.code} {raw[:500]}") from e


def main() -> None:
    token = load_cf_token()
    listed = cf(token, "GET", f"/accounts/{ACCOUNT}/d1/database?name={DB_NAME}")
    db = next((d for d in (listed.get("result") or []) if d.get("name") == DB_NAME), None)
    if not db:
        raise SystemExit(f"D1 {DB_NAME} not found")
    db_id = db["uuid"]
    print(f"d1={DB_NAME} id={db_id}")

    pg_url = Path.home().joinpath("AppData/Local/Temp/lasersupply-database-url.txt").read_text(
        encoding="utf-8"
    ).strip()
    with psycopg.connect(pg_url) as conn:
        with conn.cursor() as cur:
            cur.execute(PG_SCHEMA)
        conn.commit()
        print("schema ok")

        for table in TABLES:
            offset = 0
            total = 0
            while True:
                q = cf(
                    token,
                    "POST",
                    f"/accounts/{ACCOUNT}/d1/database/{db_id}/query",
                    {
                        "sql": f"SELECT * FROM {table} LIMIT {BATCH} OFFSET {offset}",
                    },
                )
                results = ((q.get("result") or [{}])[0]).get("results") or []
                if not results:
                    break
                cols = list(results[0].keys())
                placeholders = ",".join(["%s"] * len(cols))
                col_sql = ",".join(cols)
                rows = [tuple(r.get(c) for c in cols) for r in results]
                with conn.cursor() as cur:
                    cur.executemany(
                        f"INSERT INTO {table} ({col_sql}) VALUES ({placeholders}) "
                        f"ON CONFLICT DO NOTHING",
                        rows,
                    )
                conn.commit()
                total += len(rows)
                offset += BATCH
                print(f"{table}: +{len(rows)} total={total}")
                if len(results) < BATCH:
                    break
            print(f"{table}: done {total}")
    print("migrate complete")


if __name__ == "__main__":
    main()
