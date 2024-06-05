import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    GITHUB_ID: z.string().min(2),
    GITHUB_SECRET: z.string().min(2),
    GOOGLE_CLIENT_ID: z.string().min(2),
    GOOGLE_CLIENT_SECRET: z.string().min(2),
    NEXTAUTH_SECRET: z.string().min(2),
    NEXTAUTH_URL:
      process.env.NODE_ENV === "production"
        ? z.string().min(2)
        : z.string().min(2).optional(),
  },
  client: {},

  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
});
