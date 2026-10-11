# 🚀 LaserSupply.org — Cloudflare Dropshipping Architektūra (0 €/mėn.)

Sveikiname! Jūsų naujoji el. parduotuvė **`LaserSupply.org`** yra pilnai suprogramuota ir optimizuota veikti **Cloudflare Pages + D1 + Edge Workers** platformoje.

---

## 🛠️ Kas sukurta:

1. **Frontend (Next.js 15 + Tailwind CSS):**
   - **Tamsi, moderni „Laser Maker“ estetika**: pritaikyta Europos pirkėjams, inžinieriams ir amatininkams.
   - **Slide-over krepšelis**: žaibiškas, su nemokamo pristatymo progreso juosta (nuo 50 €), greitu kiekių redagavimu.
   - **Katalogas su lazerio parametrais**: kiekviena prekė rodo tinkamą lazerio tipą (Diode / Fiber / CO2) ir rekomenduojamus greičio bei galios nustatymus.

2. **Mokėjimai ir Dropshipping:**
   - [`src/app/api/checkout/route.ts`](file:///e:/THE%20gist/Projektai/eshop/technology/src/app/api/checkout/route.ts): **Stripe Checkout** maršrutas, palaikantis **Apple Pay, Google Pay ir banko korteles** visoms ES šalims.
   - [`src/app/api/webhook/route.ts`](file:///e:/THE%20gist/Projektai/eshop/technology/src/app/api/webhook/route.ts): Cloudflare Edge Webhook'as, kuris fiksuoja apmokėtą užsakymą ir pirkėjo adresą.

3. **Duomenų bazė (Cloudflare D1):**
   - [`schema.sql`](file:///e:/THE%20gist/Projektai/eshop/technology/schema.sql): Kategorijų, prekių, variantų ir užsakymų SQLite schema.
   - [`seed.sql`](file:///e:/THE%20gist/Projektai/eshop/technology/seed.sql): Pradinis populiariausių 6 ruošinių ir starter box rinkinys su realiomis CJ savikainomis ir 60–75% maržomis.

---

## 🚀 Kaip paleisti vietoje (Testavimui):

```bash
npm run dev
```
Parduotuvė veiks adresu: **`http://localhost:3000`**

---

## 🌐 Kaip prijungti prie Cloudflare ir lasersupply.org:

1. **Sukurkite Cloudflare D1 bazę (nemokama):**
   ```bash
   npx wrangler d1 create lasersupply-db
   npx wrangler d1 execute lasersupply-db --local --file=./schema.sql
   npx wrangler d1 execute lasersupply-db --local --file=./seed.sql
   ```
2. **Talpinimas Cloudflare Pages:**
   - Įkelkite šį projektą į savo GitHub.
   - Cloudflare Dashboard -> **Workers & Pages** -> **Create application** -> **Pages** -> prijunkite savo repozitoriją.
   - Pridėkite savo domeną **`lasersupply.org`** – Cloudflare automatiškai išduos nemokamą SSL sertifikatą.
