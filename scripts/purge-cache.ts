import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
const token = match![1];

async function purge() {
  const zRes = await fetch('https://api.cloudflare.com/client/v4/zones?name=lasersupply.org', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const zJson = await zRes.json() as any;
  const zoneId = zJson.result?.[0]?.id;
  console.log('Zone ID:', zoneId);
  if (zoneId) {
    const pRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ purge_everything: true })
    });
    const pJson = await pRes.json() as any;
    console.log('Purge cache success:', pJson.success);
  }
}
purge();
