import MdiLinkVariant from "~icons/mdi/link-variant";

export default defineNuxtPlugin((nuxtApp) => {
  const linkIcon = markRaw(MdiLinkVariant);
  nuxtApp.provide("hashAndCopy", (id) => {
    const route = useRoute();
    const router = useRouter();
    const currentLocale = route.params.locale;

    let path = route.path;
    let hash = "#" + id;
    let query = route.query;
    router.replace({ hash: hash, query: query });

    let origin = window.location.origin;

    let url = new URL(origin + path);

    url.searchParams.append("hash", id);
    //for every query param
    for (const [key, value] of Object.entries(query)) {
      url.searchParams.append(key, value);
    }
    navigator.clipboard.writeText(url.href);

    useToast({
      title:
        currentLocale === "de"
          ? "Erfolgreich kopiert!"
          : "Successfully copied!",
      message:
        (currentLocale === "de" ? "Link kopiert zu: " : "Copied link to: ") +
        capitalizeFirstLetter(id),
      icon: linkIcon,
      type: "success",
    });
  });
});
