import MdiLinkVariant from "~icons/mdi/link-variant";

export default defineNuxtPlugin((nuxtApp) => {
  const linkIcon = markRaw(MdiLinkVariant);
  nuxtApp.provide("hashAndCopy", (id) => {
    const route = useRoute();
    const currentLocale = route.params.locale;

    let path = route.path;
    let hash = "#" + id;
    let fullPath = path + hash;
    navigateTo(fullPath);

    let copyPath = window.location.origin + path + "?hash=" + id;
    navigator.clipboard.writeText(copyPath);

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
