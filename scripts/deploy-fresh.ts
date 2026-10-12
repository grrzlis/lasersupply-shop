import fs from 'fs';
import { execSync } from 'child_process';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!match) throw new Error('Token not found in default.toml');

console.log('Deploying with fresh OAuth token...');
execSync('npx cf deploy --prebuilt', {
  stdio: 'inherit',
  env: { ...process.env, CLOUDFLARE_API_TOKEN: match[1] }
});
