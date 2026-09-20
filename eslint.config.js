// 基于 ESLint Flat Config 的简单配置，主要校验 JS 代码风格和常见错误。

import js from "@eslint/js";
import globals from "globals";

export default [
  {
    // 文档站外壳由 docsite 托管，assets/vendor 是第三方压缩产物，不参与 lint。
    ignores: ["node_modules/**", "dist/**", "data/**", "**/assets/vendor/**"],
  },
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",
    },
  },
  {
    // 油猴脚本运行在 Greasemonkey/Tampermonkey 环境，声明其全局 API
    files: ["public/paranote.user.js"],
    languageOptions: {
      globals: {
        GM_getValue: "readonly",
        GM_setValue: "readonly",
        GM_registerMenuCommand: "readonly",
        GM_xmlhttpRequest: "readonly",
        unsafeWindow: "readonly",
      },
    },
  },
];
