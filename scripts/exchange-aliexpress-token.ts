import crypto from 'crypto';

const appKey = '552890';
const appSecret = 'sGSfN94PE0gxWX1XfHuIzsbg0rqmW1Yt';
const code = '3_552890_m5BzcQ1CZ8sDFKFuEORFcjRG46';
const apiPath = '/auth/token/create';

function sign(apiName: string, params: Record<string, string>, secret: string): string {
  const sortedKeys = Object.keys(params).sort();
  let queryStr = apiName;
  for (const k of sortedKeys) {
    queryStr += `${k}${params[k]}`;
  }
  return crypto.createHmac('sha256', secret).update(queryStr, 'utf8').digest('hex').toUpperCase();
}

async function exchange() {
  const timestamp = String(Date.now());
  const params: Record<string, string> = {
    app_key: appKey,
    code: code,
    timestamp: timestamp,
    sign_method: 'sha256',
  };

  const signature = sign(apiPath, params, appSecret);
  params.sign = signature;

  const urlParams = new URLSearchParams(params);
  const endpoint = `https://api-sg.aliexpress.com/rest${apiPath}?${urlParams.toString()}`;

  console.log('Sending token exchange request to:', endpoint);

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
  });

  const text = await res.text();
  console.log('Response Status:', res.status);
  console.log('Response Body:', text);
}

exchange().catch(console.error);
