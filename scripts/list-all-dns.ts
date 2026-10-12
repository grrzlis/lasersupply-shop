import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!match) throw new Error('Token not found');
const token = match[1];

async function run() {
  const zoneId = '3e37015413dc4c66afbd4804713dd96b';
  const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await dnsRes.json() as any;
  console.log('Total DNS records:', data.result?.length);
  data.result?.forEach((r: any) => console.log(r.type, r.name, r.content));

  // Also check email routing DNS settings
  const emailDnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing/dns`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const emailDns = await emailDnsRes.json() as any;
  console.log('\nEmail Routing DNS Status:');
  console.log(JSON.stringify(emailDns, null, 2));
}

run().catch(console.error);
