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
        class="p-2 text-md w-full relative z-20 transition-all ease-[cubic-bezier(0,0,0,1)] duration-300 before:bg-gradient-to-r before:from-secondary-700 after:bg-gradient-to-r after:from-secondary-700 before:content-[''] after:content-[''] before:absolute after:absolute before:z-[-1] after:z-[-1] before:transition-all after:transition-all before:duration-300 after:duration-300 before:ease-[cubic-bezier(0,0,0,1)] after:ease-[cubic-bezier(0,0,0,1)] after:h-full after:w-0 after:top-0 hover:after:w-full after:left-0 before:shadow-lg after:shadow-lg"
        :class="
          $route.matched[0].path === routeItem.path
            ? 'bg-gradient-to-r from-secondary-700 to-primary-800 shadow-xl'
            : ''
        "
        @click="navigateTo(routeItem.path.replace(':locale/', ''))"
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
        class="mx-4 ml-14 lg:text-3xl text-2xl font-extrabold flex"
        :class="componentName ? 'justify-between' : 'justify-end'"
      >
        <div v-if="componentName" class="group flex pb-1">
          {{ componentName }}
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
  <div class="pt-16">
    <div
      class="transition-all duration-300"
      :class="
        usePermanentDrawer() && $route.fullPath.includes('component')
          ? 'md:ml-[288px] ml-[208px]'
          : ''
      "
    >
      <slot />
    </div>
  </div>
</template>

<script setup>
import Button from "../module/src/runtime/components/Button.vue";
import Appbar from "../module/src/runtime/components/Appbar.vue";
import Drawer from "../module/src/runtime/components/Drawer.vue";
import Tooltip from "../module/src/runtime/components/Tooltip.vue";
import MdiGithub from "~icons/mdi/github";
import MdiTranslate from "~icons/mdi/translate";
import MdiThemeLightDark from "~icons/mdi/theme-light-dark";
import MdiPin from "~icons/mdi/pin";
import MdiPinOff from "~icons/mdi/pin-off";

// TODO rework usePermanentDrawer
let showDrawer = ref(usePermanentDrawer());

let isMobile = ref(false);
onMounted(() => {
  if (window.innerWidth < 768) {
    isMobile.value = true;
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

let componentRoutes = computed(() => {
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

let routes = [
  {
    path: "/:locale/getting-started",
    name: "Getting Started",
  },
  {
    path: "/:locale/options",
    name: "Options",
  },
  {
    path: "/:locale/theme",
    name: "Theme",
  },
];

routes.push(...componentRoutes.value);

let route = useRoute();
let componentName = null;
if (route.path.includes("component")) {
  componentName = capitalizeFirstLetter(route.path.split("/")[3]);
}

function handleCycleTheme() {
  const { post } = useBroadcastChannel("broadcast");
  post({ type: "theme", method: "cycle" });
}

function handleSwitchLocale() {
  const { post } = useBroadcastChannel("broadcast");
  post({ type: "locale", method: "switch" });
}

onBeforeMount(() => {
  if (route.query && route.query.hash) {
    let hash = route.query.hash;
    let hashPath = route.path + "#" + hash;
    navigateTo(hashPath);
  }
});
</script>
