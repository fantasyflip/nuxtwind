export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("cycleTheme", () => {
    let colorMode = useColorMode();

    let nextTheme = "system";
    if (colorMode.preference === "system") {
      nextTheme = "dark";
    } else if (colorMode.preference === "dark") {
      nextTheme = "light";
    } else if (colorMode.preference === "light") {
      nextTheme = "system";
    }

    colorMode.preference = nextTheme;
  });
});
