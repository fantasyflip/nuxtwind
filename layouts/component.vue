<template>
  <div
    class="m-4 lg:text-5xl text-4xl font-extrabold group flex justify-between"
  >
    <div>
      <slot name="componentName"></slot>
      <span class="text-primary group-hover:text-secondary -ml-2">.</span>
    </div>
    <div>
      <Button
        icon
        :link="useGithubComponentUrl(componentName)"
        target="_blank"
        :color="{
          text: 'text-primary',
          hover: 'hover:text-secondary',
        }"
        grow
      >
        <MdiGithub />
      </Button>
    </div>
  </div>
  <div class="lg:flex lg:h-[83vh] h-[85vh] w-full mt-5">
    <div class="lg:w-1/2 lg:h-full h-1/2 mx-4">
      <div
        class="lg:text-3xl text-2xl font-bold cursor-pointer"
        id="playground"
        @click="$hashAndCopy('playground')"
      >
        <span>{{ $t("layouts.component.content.playground") }} - </span>
        <span class="text-primary">
          <slot name="componentName"></slot>
        </span>
      </div>
      <slot name="playground"></slot>
    </div>
    <div
      class="lg:w-1/2 lg:h-full h-1/2 grid content-center justify-center mx-4"
    >
      <slot name="component"></slot>
    </div>
  </div>
  <div class="mx-4 mt-4">
    <div
      class="lg:text-3xl text-2xl font-bold cursor-pointer"
      id="properties"
      @click="$hashAndCopy('properties')"
    >
      <span
        >{{ $t("layouts.component.content.properties") }}
        <span class="font-normal"> (<slot name="propertyCount"></slot>)</span> -
      </span>
      <span class="text-primary">
        <slot name="componentName"></slot>
      </span>
    </div>
    <slot name="props"></slot>
  </div>
  <div class="mx-4 mt-4">
    <div
      class="lg:text-3xl text-2xl font-bold cursor-pointer"
      id="slots"
      @click="$hashAndCopy('slots')"
    >
      <span
        >{{ $t("layouts.component.content.slots") }}
        <span class="font-normal"> (<slot name="slotCount"></slot>)</span> -
      </span>
      <span class="text-primary">
        <slot name="componentName"></slot>
      </span>
    </div>
    <slot name="slots"></slot>
  </div>
</template>
<script setup>
import MdiGithub from "~icons/mdi/github";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

let route = useRoute();
let componentName = capitalizeFirstLetter(route.path.split("/")[3]);

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
