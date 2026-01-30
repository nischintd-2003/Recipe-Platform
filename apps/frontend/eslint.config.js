import sharedConfig from "@repo/eslint-config";
import path from "path";

export default [
  ...sharedConfig,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.eslint.json"],
        tsconfigRootDir: path.resolve(),
      },
    },
  },
];

