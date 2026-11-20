type EnvBag = Record<string, string | undefined> & {
  DB?: unknown;
};

let cachedCfEnv: EnvBag | null | undefined;

async function loadCloudflareEnv(): Promise<EnvBag | null> {
  if (cachedCfEnv !== undefined) return cachedCfEnv;
  // On ACA/Node the webpack alias resolves cloudflare:workers to a process.env stub.
  try {
    const mod = await import("@/lib/cloudflare-workers-stub");
    cachedCfEnv = (mod as { env?: EnvBag }).env ?? null;
  } catch {
    cachedCfEnv = null;
  }
  return cachedCfEnv;
}

/** Sync env for Node/ACA; falls back to process.env. */
export function getProcessEnv(): EnvBag {
  return process.env as EnvBag;
}

export async function getRuntimeEnv(): Promise<EnvBag> {
  const cf = await loadCloudflareEnv();
  if (cf) return { ...process.env, ...cf } as EnvBag;
  return process.env as EnvBag;
}

export function envGet(key: string, fallback = ""): string {
  const fromProcess = process.env[key];
  if (fromProcess && String(fromProcess).trim()) return String(fromProcess);
  return fallback;
}
