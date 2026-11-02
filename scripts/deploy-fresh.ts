import { execSync } from 'child_process';

console.log('Deploying via vinext-cloudflare deploy...');
execSync('npx vinext-cloudflare deploy', {
  stdio: 'inherit',
  env: process.env,
});
