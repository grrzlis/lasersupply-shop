import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!match) throw new Error('Token not found');
const token = match[1];

async function addDnsTxt() {
  const zoneId = '3e37015413dc4c66afbd4804713dd96b';
  const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'TXT',
      name: 'lasersupply.org',
      content: 'google-site-verification=6EUetAlOxvy_e_nPfCDZ_1nY20CRmlv5zbJ15npflPw',
      ttl: 1
    })
  });
  const data = await res.json() as any;
  console.log('✅ Cloudflare DNS TXT verification added:', data.success);
  if (!data.success) {
    console.log('Errors:', data.errors);
  }
}

addDnsTxt().catch(console.error);
