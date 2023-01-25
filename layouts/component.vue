<template>
  <div>
    <NuxtLayout name="docs">
      <div
        id="playground"
        class="lg:text-2xl text-xl font-bold cursor-pointer mx-4"
        @click="$hashAndCopy('playground')"
      >
        <span>{{ $t("layouts.component.content.playground") }} - </span>
        <span class="text-primary-800">
          <slot name="componentName"></slot>
        </span>
      </div>
      <div class="lg:flex lg:h-[88vh] w-full lg:my-4 mt-2">
        <div
          class="lg:w-1/2 lg:h-full h-[44vh] flex items-center justify-center mx-4 lg:mb-0 mb-4 lg:p-0 py-4"
        >
          <slot name="component"></slot>
        </div>
        <div class="lg:w-1/2 lg:h-full mx-4 lg:my-0 my-6">
          <slot name="playground"></slot>
        </div>
      </div>
      <div>
        <slot name="documentation"> Documentation </slot>
      </div>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let route = useRoute();
let componentName = capitalizeFirstLetter(route.path.split("/")[3]);

function getI18nCategoryKey(category) {
  switch (category) {
    case "prop":
      return "properties";
    case "event":
      return "events";
    case "slot":
      return "slots";
    case "caveat":
      return "caveats";
  }
}

function getOgpDescription() {
  if (route.query && route.query.hash) {
    let hash = route.query.hash;

    if (hash.includes("-")) {
      let item = hash.split("-")[1];
      let category = hash.split("-")[0];
      let content = t(
        "pages.component." +
          route.path.split("/")[3] +
          ".content.documentation." +
          getI18nCategoryKey(category) +
          "." +
          item +
          ".description"
      );

      //check if first 5 characters are "pages"
      if (content.substring(0, 5) === "pages") {
        return t("layouts.component.meta.itemDescription", {
          componentName,
          item,
          category: capitalizeFirstLetter(category),
        });
      } else {
        //check if content includes html tags
        if (content.includes("<")) {
          content = content.replace(/<[^>]*>?/gm, "");
        }
        return t("layouts.component.meta.itemContentDescription", {
          componentName,
          item,
          category: capitalizeFirstLetter(category),
          content,
        });
      }
    } else {
      return t("layouts.component.meta.categoryDescription", {
        componentName,
        category: capitalizeFirstLetter(hash),
      });
    }
  } else {
    return t("layouts.component.meta.description", { componentName });
  }
}

let ogpImageUrl = useOgpImageUrl(
  componentName,
  getOgpDescription(),
  "components"
);

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
      content: getOgpDescription(),
    },
    {
      hid: "og:type",
      property: "og:type",
      content: "website",
    },
    {
      hid: "og:image",
      property: "og:image",
      content: ogpImageUrl,
    },
    {
      hid: "twitter:image",
      property: "twitter:image",
      content: ogpImageUrl,
    },
    {
      hid: "twitter:card",
      property: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "og:url",
      property: "og:url",
      content: "https://nuxtwind.com/",
    },
    {
      property: "og:locale",
      content: t("layouts.component.meta.og.locale"),
    },
  ],
});
</script>
