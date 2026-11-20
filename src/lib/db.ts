import { getRuntimeEnv } from "@/lib/runtime-env";

type SqlParams = unknown[];

function normalizeParam(value: unknown): unknown {
  if (value === undefined) return null;
  if (value === null) return null;
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

function rewriteSqliteSqlForPostgres(sql: string): string {
  let out = String(sql);
  out = out.replace(/datetime\('now'\)/gi, "NOW()");
  out = out.replace(/\bLIMIT\s+-1\b/gi, "LIMIT ALL");
  // SQLite UPSERT excluded.* → Postgres EXCLUDED.*
  out = out.replace(/\bexcluded\./gi, "EXCLUDED.");
  out = out.replace(/ON CONFLICT\(/gi, "ON CONFLICT (");
  // SQLite INSERT OR REPLACE → Postgres upsert on id
  out = out.replace(
    /INSERT\s+OR\s+REPLACE\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/gi,
    (_m, table: string, cols: string, vals: string) => {
      const colList = cols.split(",").map((c) => c.trim());
      const updates = colList
        .filter((c) => c.toLowerCase() !== "id")
        .map((c) => `${c} = EXCLUDED.${c}`)
        .join(", ");
      return `INSERT INTO ${table} (${cols}) VALUES (${vals}) ON CONFLICT (id) DO UPDATE SET ${updates}`;
    },
  );
  return out;
}

function sqlitePlaceholdersToPg(sql: string): string {
  let n = 0;
  return sql.replace(/\?/g, () => {
    n += 1;
    return `$${n}`;
  });
}

let pgPoolPromise: Promise<import("pg").Pool> | null = null;

async function getPgPool(connectionString: string) {
  if (!pgPoolPromise) {
    pgPoolPromise = (async () => {
      const pg = await import("pg");
      return new pg.Pool({
        connectionString,
        ssl: connectionString.includes("sslmode=require")
          ? { rejectUnauthorized: false }
          : undefined,
        max: 5,
      });
    })();
  }
  return pgPoolPromise;
}

function makePgStatement(connectionString: string, sql: string) {
  let params: SqlParams = [];
  const stmt = {
    bind(...values: SqlParams) {
      params = values;
      return stmt;
    },
    async all() {
      const pool = await getPgPool(connectionString);
      const text = sqlitePlaceholdersToPg(rewriteSqliteSqlForPostgres(sql));
      const res = await pool.query(
        text,
        params.map(normalizeParam),
      );
      return { results: res.rows || [], success: true };
    },
    async first() {
      const all = await stmt.all();
      return all.results[0] ?? null;
    },
    async run() {
      const pool = await getPgPool(connectionString);
      const text = sqlitePlaceholdersToPg(rewriteSqliteSqlForPostgres(sql));
      const res = await pool.query(
        text,
        params.map(normalizeParam),
      );
      return {
        success: true,
        meta: { changes: res.rowCount ?? 0, rowCount: res.rowCount ?? 0 },
      };
    },
  };
  return stmt;
}

function wrapD1(db: {
  prepare: (sql: string) => {
    bind: (...values: SqlParams) => unknown;
    all: () => Promise<unknown>;
    first: () => Promise<unknown>;
    run: () => Promise<unknown>;
  };
}) {
  return {
    prepare(sql: string) {
      return db.prepare(sql);
    },
  };
}

type DbClient = {
  prepare: (sql: string) => ReturnType<typeof makePgStatement>;
};

export async function getDb(): Promise<DbClient | null> {
  const env = await getRuntimeEnv();
  const databaseUrl =
    (typeof env.DATABASE_URL === "string" && env.DATABASE_URL.trim()) ||
    (typeof process.env.DATABASE_URL === "string" && process.env.DATABASE_URL.trim()) ||
    "";

  if (databaseUrl) {
    return {
      prepare(sql: string) {
        return makePgStatement(databaseUrl, sql);
      },
    };
  }

  const d1 = env.DB as
    | {
        prepare: (sql: string) => {
          bind: (...values: SqlParams) => {
            all: () => Promise<{ results?: unknown[] }>;
            first: () => Promise<unknown>;
            run: () => Promise<unknown>;
          };
          all: () => Promise<{ results?: unknown[] }>;
          first: () => Promise<unknown>;
          run: () => Promise<unknown>;
        };
      }
    | undefined;

  if (!d1) return null;
  return wrapD1(d1) as DbClient;
}
