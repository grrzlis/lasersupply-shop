#!/usr/bin/env python3
"""Create Postgres database `lasersupply` on thegist-pg."""
from pathlib import Path

import psycopg

agency = Path.home().joinpath("AppData/Local/Temp/thegist-database-url.txt").read_text(encoding="utf-8").strip()
admin = agency.rsplit("/", 1)[0] + "/postgres"
with psycopg.connect(admin, autocommit=True) as conn:
    with conn.cursor() as cur:
        cur.execute("SELECT 1 FROM pg_database WHERE datname='lasersupply'")
        if cur.fetchone():
            print("lasersupply exists")
        else:
            cur.execute("CREATE DATABASE lasersupply")
            print("lasersupply created")

url = agency.rsplit("/", 1)[0] + "/lasersupply"
Path.home().joinpath("AppData/Local/Temp/lasersupply-database-url.txt").write_text(url, encoding="utf-8")
print("wrote lasersupply-database-url.txt")
