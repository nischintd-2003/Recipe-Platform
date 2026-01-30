import sharedConfig from "@repo/eslint-config";
import path from "path";

export default [
  ...sharedConfig,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: path.resolve(),
      },
    },
  },
];
