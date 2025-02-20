import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["./src/abi/**", "./src/json/**"],
    // 新增自定义规则覆盖 
    rules: {
      // 处理未使用变量（@typescript-eslint/no-unused-vars）
      "@typescript-eslint/no-unused-vars":"off",
      // "@typescript-eslint/no-require-imports": "off" 
    }
  }
];

export default eslintConfig;
