import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!match) throw new Error('Token not found');
const token = match[1];

async function check() {
  const zoneId = '3e37015413dc4c66afbd4804713dd96b';

  // 1. Check Email Routing settings on Zone
  const emailSettingsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const emailSettings = await emailSettingsRes.json() as any;
  console.log('Email Routing Enabled:', emailSettings.result?.enabled, 'Status:', emailSettings.result?.status);

  // 2. Check Routing Rules (info@lasersupply.org)
  const rulesRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing/rules`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const rules = await rulesRes.json() as any;
  console.log('Routing Rules Count:', rules.result?.length);
  if (rules.result) {
    rules.result.forEach((r: any) => {
      console.log('  Rule:', r.name, '| Matchers:', JSON.stringify(r.matchers), '| Actions:', JSON.stringify(r.actions), '| Enabled:', r.enabled);
    });
  }

  // 3. Check Destination addresses
  const destRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing/addresses`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dest = await destRes.json() as any;
  console.log('Destination addresses:');
  if (dest.result) {
    dest.result.forEach((d: any) => console.log('  Email:', d.email, '| Verified:', d.verified));
  }

  // 4. Check DNS MX records
  const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records?type=MX`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dns = await dnsRes.json() as any;
  console.log('MX Records:');
  if (dns.result) {
    dns.result.forEach((m: any) => console.log('  MX:', m.content, 'Priority:', m.priority));
  }
}

check().catch(console.error);
