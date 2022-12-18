import MdiThemeLightDark from "~icons/mdi/theme-light-dark";

export default defineNuxtPlugin((nuxtApp) => {
  const themeNotificationIcon = markRaw(MdiThemeLightDark);
  nuxtApp.provide("cycleTheme", (noToast) => {
    const route = useRoute();
    const currentLocale = route.params.locale;

    let colorMode = useColorMode();

    let nextTheme = "system";
    if (colorMode.preference === "system") {
      nextTheme = "dark";
    } else if (colorMode.preference === "dark") {
      nextTheme = "light";
    } else if (colorMode.preference === "light") {
      nextTheme = "system";
    }

    if (!noToast) {
      useToast({
        title: "Theme",
        message:
          (currentLocale === "de"
            ? "Designwechsel zu: "
            : "Theme change to: ") + capitalizeFirstLetter(nextTheme),
        icon: themeNotificationIcon,
      });
    }

    colorMode.preference = nextTheme;
  });
});
