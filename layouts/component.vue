<template>
  <Drawer
    v-model="showDrawer"
    :overlay="usePermanentDrawer() ? false : true"
    :z-index="usePermanentDrawer() ? 'z-[99]' : 'z-[101]'"
    :permanent="usePermanentDrawer()"
    width="md:w-72 w-52"
  >
    <Appbar
      :color="{
        bg: 'dark:bg-zinc-800 bg-gray-300',
      }"
    >
      <div class="w-full h-full grid place-items-center font-semibold">
        <NuxtWindIcon v-if="!isMobile" :height="40" />
        <NuxtWindName v-else :height="30" />
      </div>
    </Appbar>
    <div class="lg:h-[82vh] h-[72vh] overflow-y-auto">
      <div
        v-for="routeItem in routes"
        :key="routeItem.name"
        class="p-2 text-md w-full hover:bg-secondary-700"
        :class="
          $route.matched[0].path === routeItem.path ? 'bg-primary-800' : ''
        "
        @click="navigateTo(route.path.replace(':locale/', ''))"
      >
        {{ capitalizeFirstLetter(routeItem.name) }}
      </div>
    </div>
    <div
      class="w-full flex h-12 hover:bg-primary-800 cursor-pointer fixed bottom-0"
      @click="handlePinDrawer"
    >
      <div class="h-full grid place-items-center text-xl">
        <MdiPin v-if="!usePermanentDrawer()" class="w-12" />
        <MdiPinOff v-else class="w-12" />
      </div>
      <div class="h-full grid content-center">
        {{ usePermanentDrawer() ? "Unpin Drawer" : "Pin Drawer" }}
      </div>
    </div>
  </Drawer>

  <Appbar
    fixed
    :elevate-on-scroll="!usePermanentDrawer()"
    :navigation-icon="!usePermanentDrawer()"
    z-index="z-[100]"
    @navigation-icon-click="showDrawer = true"
  >
    <div class="w-full h-full grid content-center">
      <NuxtWindIcon
        v-if="usePermanentDrawer()"
        :height="35"
        class="absolute top-2 left-3"
      />
      <div
        class="mx-4 ml-14 lg:text-3xl text-2xl font-extrabold flex justify-between"
      >
        <div class="group flex pb-1">
          <slot name="componentName"></slot>
          <div class="text-primary-800 group-hover:text-secondary-800">.</div>
        </div>
        <NuxtWindName
          :height="40"
          class="invisible md:visible absolute left-1/2 transform -translate-x-1/2 top-1 cursor-pointer"
          @click="$router.push('/')"
        />
        <div class="flex">
          <Tooltip bottom width="w-fit">
            <Button
              class="mr-2"
              icon
              :color="{
                text: 'text-primary-800',
              }"
              grow
              @click="handleCycleTheme()"
            >
              <MdiThemeLightDark />
            </Button>
            <template #tooltip>
              {{ $t("layouts.component.content.cycleTheme.tooltip") }}
            </template>
          </Tooltip>
          <Tooltip bottom width="w-fit">
            <Button
              class="mr-2"
              icon
              :color="{
                text: 'text-primary-800',
              }"
              grow
              @click="handleSwitchLocale()"
            >
              <MdiTranslate />
            </Button>
            <template #tooltip>
              {{ $t("layouts.component.content.switchLocale.tooltip") }}
            </template>
          </Tooltip>
          <Tooltip bottom width="w-fit">
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
            <template #tooltip>
              {{ $t("layouts.component.content.github.tooltip") }}
            </template>
          </Tooltip>
        </div>
      </div>
    </div>
  </Appbar>
  <div
    class="transition-all duration-300"
    :class="usePermanentDrawer() ? 'md:ml-[288px] ml-[208px]' : ''"
  >
    <div
      id="playground"
      class="lg:text-2xl text-xl font-bold cursor-pointer mx-4 pt-16"
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
  </div>
</template>
<script setup>
import MdiGithub from "~icons/mdi/github";
import MdiTranslate from "~icons/mdi/translate";
import MdiThemeLightDark from "~icons/mdi/theme-light-dark";
import MdiPin from "~icons/mdi/pin";
import MdiPinOff from "~icons/mdi/pin-off";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

let showDrawer = ref(usePermanentDrawer());

let isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
    console.log(usePermanentDrawer(false, false));
    usePermanentDrawer(false, false);
  } else {
    showDrawer.value = usePermanentDrawer(
      localStorage.getItem("permanentDrawer") === "true",
      false
    );
  }
  addEventListener("resize", (event) => {
    if (event.target.innerWidth < 768) {
      isMobile.value = true;
      usePermanentDrawer(false, false);
    } else {
      isMobile.value = false;
      if (process.client) {
        showDrawer.value = usePermanentDrawer(
          localStorage.getItem("permanentDrawer") === "true",
          false
        );
      }
    }
  });
});

function handlePinDrawer() {
  if (usePermanentDrawer()) {
    usePermanentDrawer(false);
    showDrawer.value = false;
  } else {
    usePermanentDrawer(true);
    showDrawer.value = true;
  }
}

let routes = computed(() => {
  let routeList = useRouter().options.routes;
  routeList = routeList.filter((route) => {
    return route.path.includes("component");
  });
  let componentRoutes = [];
  for (let i = 0; i < routeList.length; i++) {
    let route = routeList[i];
    componentRoutes.push({
      path: route.path,
      name: route.path.split("component/")[1],
    });
  }
  return componentRoutes;
});

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
      content: "/favicon.png",
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

onBeforeMount(() => {
  if (route.query && route.query.hash) {
    let hash = route.query.hash;
    let hashPath = route.path + "#" + hash;
    navigateTo(hashPath);
  }
});
</script>
<style scoped></style>
