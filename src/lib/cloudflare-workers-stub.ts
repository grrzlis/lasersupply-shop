/** Webpack stub when building for Node/ACA (not Cloudflare Workers). */
export const env = process.env as Record<string, string | undefined>;
