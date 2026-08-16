import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      "app/generated/**",
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
    ],
  },
];

export default eslintConfig;
