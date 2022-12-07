import { createI18n } from "vue-i18n";

// import en from "../locales/en.json";
// import de from "../locales/de.json";

// --------- ENGLISH -----------
//LAYOUTS
import enComponent from "../locales/en/layouts/component.json";

//PAGES
import en404 from "../locales/en/pages/404.json";
import enIndex from "../locales/en/pages/index.json";
import enFallbackIndex from "../locales/en/pages/fallbackIndex.json";
import enButton from "../locales/en/pages/component/button.json";
import enTextfield from "../locales/en/pages/component/textfield.json";

// --------- GERMAN -----------
//LAYOUTS
import deComponent from "../locales/de/layouts/component.json";

//PAGES
import de404 from "../locales/de/pages/404.json";
import deIndex from "../locales/de/pages/index.json";
import deFallbackIndex from "../locales/de/pages/fallbackIndex.json";
import deButton from "../locales/de/pages/component/button.json";
import deTextfield from "../locales/de/pages/component/textfield.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    fallbackLocale: "en",
    locale: "en",
    messages: {
      en: {
        layouts: {
          component: enComponent,
        },
        pages: {
          "404": en404,
          index: enIndex,
          fallbackIndex: enFallbackIndex,
          component: {
            button: enButton,
            textfield: enTextfield,
          },
        },
      },
      de: {
        layouts: {
          deComponent,
        },
        pages: {
          "404": de404,
          index: deIndex,
          fallbackIndex: deFallbackIndex,
          component: {
            button: deButton,
            textfield: deTextfield,
          },
        },
      },
    },
  });

  vueApp.use(i18n);
});
