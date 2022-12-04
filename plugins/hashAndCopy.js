export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("hashAndCopy", (id) => {
    const route = useRoute();
    let path = route.path;
    let hash = "#" + id;
    let fullPath = path + hash;
    let newUrl = window.location.origin + fullPath;
    navigator.clipboard.writeText(newUrl);
    navigateTo(fullPath);
  });
});
