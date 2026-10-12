import fs from 'fs';

const toml = fs.readFileSync('C:/Users/algir/AppData/Roaming/xdg.config/.wrangler/config/default.toml', 'utf8');
const match = toml.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!match) throw new Error('Token not found');
const token = match[1];

async function check() {
  const zoneId = '3e37015413dc4c66afbd4804713dd96b';

  // 1. Check Zone Email Routing
  const emailSettingsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const emailSettings = await emailSettingsRes.json() as any;
  console.log('✅ Email Routing Enabled:', emailSettings.result?.enabled, '| Status:', emailSettings.result?.status);

  // 2. Check Routing Rules
  const rulesRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/email/routing/rules`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const rules = await rulesRes.json() as any;
  console.log('✅ Active Routing Rules:');
  if (rules.result) {
    rules.result.forEach((r: any) => {
      console.log(`   - Rule Name: "${r.name}"`);
      console.log(`     Matcher:`, JSON.stringify(r.matchers));
      console.log(`     Action:`, JSON.stringify(r.actions));
      console.log(`     Enabled: ${r.enabled}`);
    });
  }

  // 3. Check DNS Records for MX and SPF
  const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const dns = await dnsRes.json() as any;
  const mxRecords = (dns.result || []).filter((r: any) => r.type === 'MX');
  const txtRecords = (dns.result || []).filter((r: any) => r.type === 'TXT');

  console.log('\n✅ MX Records in Cloudflare DNS:');
  mxRecords.forEach((m: any) => {
    console.log(`   - ${m.name} -> ${m.content} (Priority: ${m.priority})`);
  });

  console.log('\n✅ TXT / SPF Records:');
  txtRecords.forEach((t: any) => {
    if (t.content.includes('spf') || t.content.includes('cf_email') || t.content.includes('brevo')) {
      console.log(`   - ${t.name} -> ${t.content}`);
    }
  });
}

check().catch(console.error);
