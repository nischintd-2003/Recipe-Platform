import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      parserOptions: {
        project: null,
      },
    },
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
];

