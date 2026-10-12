import fs from 'fs';
import https from 'https';
import http from 'http';

function download(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  const targets = [
    {
      name: 'wine_box.jpg',
      url: 'https://cf.cjdropshipping.com/1429215/1586518774704.jpg',
    },
    {
      name: 'wood_slices.jpg',
      url: 'https://cf.cjdropshipping.com/1529241940173/606990422998.jpg',
    },
    {
      name: 'bamboo_pens.jpg',
      url: 'https://cf.cjdropshipping.com/1529241940173/800458428178.jpg',
    },
    {
      name: 'wood_coasters.jpg',
      url: 'https://cf.cjdropshipping.com/1614917546875/248382753303.jpg',
    },
    {
      name: 'bamboo_boards.jpg',
      url: 'https://cf.cjdropshipping.com/15723648/1228392851488.jpg',
    }
  ];

  for (const t of targets) {
    console.log(`Downloading ${t.name}...`);
    await download(t.url, `public/products/${t.name}`);
    const stats = fs.statSync(`public/products/${t.name}`);
    console.log(`${t.name} size: ${stats.size} bytes`);
  }
}

run().catch(console.error);
