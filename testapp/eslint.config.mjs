import eslintConfigPrettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt({
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    // ...prettierPlugin.configs.recommended.rules,
    ...eslintConfigPrettier.rules,
    ...eslintPluginPrettierRecommended.rules,
    "vue/script-setup-no-uses-vars": "off",
    "vue/multi-word-component-names": "off",
    "vue/no-v-html": "off",
    eqeqeq: "off",
    "vue/v-slot-style": "off",

    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
        semi: true,
        singleQuote: false,
      },
    ],
  },
});
