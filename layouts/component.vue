<template>
  <Appbar fixed elevate-on-scroll>
    <div class="w-full h-full grid content-center">
      <div
        class="mx-4 lg:text-3xl text-2xl font-extrabold flex justify-between"
      >
        <div class="group flex">
          <slot name="componentName"></slot>
          <div class="text-primary-800 group-hover:text-secondary-800">.</div>
        </div>
        <div class="flex">
          <Button
            class="mr-2"
            icon
            @click="handleCycleTheme()"
            :color="{
              text: 'text-primary-800',
            }"
            grow
          >
            <MdiThemeLightDark />
          </Button>
          <Button
            class="mr-2"
            icon
            @click="handleSwitchLocale()"
            :color="{
              text: 'text-primary-800',
            }"
            grow
          >
            <MdiTranslate />
          </Button>
          <Button
            icon
            :link="useGithubComponentUrl(componentName)"
            target="_blank"
            :color="{
              text: 'text-primary-800',
            }"
            grow
          >
            <MdiGithub />
          </Button>
        </div>
      </div>
    </div>
  </Appbar>
  <div
    class="lg:text-2xl text-xl font-bold cursor-pointer mx-4 pt-16"
    id="playground"
    @click="$hashAndCopy('playground')"
  >
    <span>{{ $t("layouts.component.content.playground") }} - </span>
    <span class="text-primary-800">
      <slot name="componentName"></slot>
    </span>
  </div>
  <div class="lg:flex lg:h-[88vh] w-full mt-5">
    <div
      class="lg:w-1/2 lg:h-full h-1/2 flex items-center justify-center mx-4 lg:mb-0 mb-4 lg:p-0 py-12"
    >
      <slot name="component"></slot>
    </div>
    <div class="lg:w-1/2 lg:h-full h-1/2 mx-4 lg:my-0 my-6">
      <slot name="playground"></slot>
    </div>
  </div>
  <div>
    <slot name="documentation"> Documentation </slot>
  </div>
</template>
<script setup>
import MdiGithub from "~icons/mdi/github";
import MdiTranslate from "~icons/mdi/translate";
import MdiThemeLightDark from "~icons/mdi/theme-light-dark";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

let route = useRoute();
let componentName = capitalizeFirstLetter(route.path.split("/")[3]);

function handleCycleTheme() {
  const { post } = useBroadcastChannel("broadcast");
  post({ type: "theme", method: "cycle" });
}

function handleSwitchLocale() {
  const { post } = useBroadcastChannel("broadcast");
  post({ type: "locale", method: "switch" });
}

useHead({
  title: t("layouts.component.meta.title", { componentName }),
  meta: [
    {
      hid: "description",
      name: "description",
      content: t("layouts.component.meta.description", { componentName }),
    },
    {
      hid: "og:title",
      property: "og:title",
      content: t("layouts.component.meta.og.title"),
    },
    {
      hid: "og:description",
      property: "og:description",
      content: route.hash
        ? t("layouts.component.meta.hash-description", {
            componentName,
            hash: route.hash.split("#")[1],
          })
        : t("layouts.component.meta.description", { componentName }),
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: "/favicon.png",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://components.fantasyflip.de/",
    },
    {
      property: "og:locale",
      content: t("layouts.component.meta.og.locale"),
    },
  ],
});
</script>
<style scoped></style>
