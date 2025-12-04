// prisma.config.ts
// Keep runtime `seed` config while avoiding an explicit `any` type.
// We cast to the parameter type expected by defineConfig so TypeScript/ESLint
// don't complain about `any`.

import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const cfg = {
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },

  // Seed command for `npx prisma db seed`
  seed: {
    run: "node prisma/seed.mjs",
  },
} as unknown as Parameters<typeof defineConfig>[0];

export default defineConfig(cfg);