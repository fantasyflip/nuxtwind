import MdiTranslate from "~icons/mdi/translate";

export default defineNuxtPlugin((nuxtApp) => {
  const localeNotificationIcon = markRaw(MdiTranslate);
  nuxtApp.provide("switchLocale", () => {
    const route = useRoute();
    const router = useRouter();
    const currentLocale = route.params.locale;
    router.push({
      name: route.name,
      params: { locale: currentLocale === "en" ? "de" : "en" },
    });
    useToast({
      title: currentLocale === "de" ? "Sprache" : "Language",
      message:
        currentLocale === "de"
          ? "Sprache zu Englisch gewechselt"
          : "Language changed to German",
      icon: localeNotificationIcon,
    });
  });
});
