import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript / TypeScript / Vue
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // ESLint
      "no-var": "error", // 要求使用 let 或 const，而不是 var
      "no-multiple-empty-lines": ["warn", { max: 1 }], // 不允许多个空行
      "no-console":
          process.env.NODE_ENV === "production" ? "error" : "off", // 生产环境禁止 console
      "no-debugger":
          process.env.NODE_ENV === "production" ? "error" : "off", // 生产环境禁止 debugger
      "no-unexpected-multiline": "error",
      "no-useless-escape": "off",
    },
  },

  // TypeScript
  {
    files: ["**/*.{ts,mts,cts,vue}"],
    extends: [tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-namespace": "off",
    },
  },

  // Vue
  {
    files: ["**/*.vue"],
    extends: [pluginVue.configs["flat/essential"]],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/no-mutating-props": "off",
      "vue/attribute-hyphenation": "off",
    },
  },
]);