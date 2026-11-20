import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const oauthMatch = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
const refreshMatch = toml.match(/refresh_token\s*=\s*"([^"]+)"/);
const expMatch = toml.match(/expiration_time\s*=\s*"([^"]+)"/);

const jsonPath = 'C:/Users/algir/AppData/Roaming/xdg.config/cloudflare/config/default.json';
const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

json.oauth_token = oauthMatch![1];
json.refresh_token = refreshMatch![1];
json.expiration_time = expMatch![1];

fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2));
console.log('Synced default.json with default.toml OAuth credentials!');
