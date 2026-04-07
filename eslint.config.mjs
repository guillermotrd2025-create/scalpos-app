import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Ignore auto-generated code, backups, and build artifacts
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/generated/**",
    "backup_pre_ux_revision/**",
    "backup/**",
    "**/*.bak/**",
    "*.js",
  ]),
  // Rule overrides for the project
  {
    rules: {
      // Prisma returns untyped objects; `any` is used extensively for server action results
      "@typescript-eslint/no-explicit-any": "warn",
      // Allow <img> tags — screenshots are user-uploaded, next/image adds config overhead
      "@next/next/no-img-element": "off",
      // Downgrade unused vars to warning (common during development)
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
]);

export default eslintConfig;
