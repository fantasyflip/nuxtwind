export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("switchLocale", () => {
    const route = useRoute();
    const router = useRouter();
    const currentLocale = route.params.locale;
    router.push({
      name: route.name,
      params: { locale: currentLocale === "en" ? "de" : "en" },
    });
  });
});
