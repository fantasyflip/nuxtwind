export default defineNuxtRouteMiddleware((to) => {
  const nuxtApp = useNuxtApp();

  let validLocales =
    nuxtApp.vueApp.config.globalProperties.$i18n.availableLocales;

  let locale = to.params.locale;

  if (!validLocales.includes(locale)) {
    const headers = useRequestHeaders();
    let lang = headers["accept-language"]?.split("-")[0];

    if (validLocales.includes(lang)) {
      locale = lang;
    } else {
      locale = nuxtApp.vueApp.config.globalProperties.$i18n.fallbackLocale;
    }

    let newPath = "/" + locale + to.fullPath;

    return newPath;
  }
});
