import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "lasersupply-shop",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-11",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none", runWorkerFirst: ["/_vinext/static-cache/*"] },
    env: {
      ASSETS: bindings.assets(),
      DB: bindings.d1({ id: "a2612c2d-4892-4cef-9107-e353dfbaec12", name: "lasersupply-db" }),
      NEXT_PUBLIC_STORE_NAME: bindings.text("LaserSupply.org"),
      NEXT_PUBLIC_STORE_TAGLINE: bindings.text("The European Hub for Laser Maker Blanks & Materials"),
      NEXT_PUBLIC_SUPPORT_EMAIL: bindings.text("info@lasersupply.org"),
      ADMIN_NOTIFICATION_EMAIL: bindings.text("akdarbas@gmail.com"),
    },
  }),
});
