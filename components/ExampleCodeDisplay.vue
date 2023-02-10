<template>
  <div class="w-full h-full">
    <div class="flex text-2xl pl-3">
      <div
        class="px-2 py-1 mr-3"
        :class="
          showComponent ? 'dark:bg-zinc-800 bg-gray-300 rounded-t-lg' : ''
        "
      >
        <Button
          icon
          class="hover:-translate-y-px transition-all duration-300"
          ari-label="Component"
          @click="showTab('component')"
        >
          <div class="flex">
            <NuxtWindIcon
              width="30px"
              :class="
                !showComponent
                  ? 'grayscale hover:grayscale-0 transition-all duration-300'
                  : ''
              "
            />
            <div
              class="text-sm px-2 dark:text-white text-black items-center hidden sm:flex"
            >
              Component
            </div>
          </div>
        </Button>
      </div>
      <div
        v-if="props.html"
        class="px-2 py-1 mr-3"
        :class="showHtml ? 'dark:bg-zinc-800 bg-gray-300  rounded-t-lg' : ''"
      >
        <Button
          class="hover:-translate-y-px transition-all duration-300"
          icon
          :color="{
            text: showHtml ? 'text-orange-700' : 'text-zinc-500',
            iconHover: 'hover:text-orange-700',
          }"
          ari-label="Template"
          @click="showTab('html')"
        >
          <div class="flex">
            <MdiLanguageHtml5 />
            <div
              class="text-sm px-2 items-center dark:text-white text-black hidden sm:flex"
            >
              Template
            </div>
          </div>
        </Button>
      </div>
      <div
        v-if="props.js"
        class="px-2 py-1 mr-3"
        :class="
          showJavascript ? 'dark:bg-zinc-800 bg-gray-300  rounded-t-lg' : ''
        "
      >
        <Button
          class="hover:-translate-y-px transition-all duration-300"
          icon
          :color="{
            text: showJavascript ? 'text-blue-600' : 'text-zinc-500',
            iconHover: 'hover:text-blue-600',
          }"
          ari-label="Script"
          @click="showTab('js')"
        >
          <div class="flex">
            <MdiLanguageTypescript />
            <div
              class="text-sm px-2 items-center dark:text-white text-black hidden sm:flex"
            >
              Script
            </div>
          </div>
        </Button>
      </div>
    </div>

    <div
      class="w-full h-[93%] grid place-items-center relative border-4 dark:border-zinc-800 border-gray-300 rounded-xl"
    >
      <transition name="fade">
        <div v-if="showHtml && props.html" class="absolute w-full h-full">
          <div
            class="w-full h-full overflow-auto no-scrollbar grid place-items-center p-1"
          >
            <CodeHighlight lang="html" path="template" :content="props.html" />
          </div>
        </div>
        <div
          v-else-if="showJavascript && props.js"
          class="absolute w-full h-full"
        >
          <div
            class="w-full h-full overflow-auto no-scrollbar grid place-items-center p-1"
          >
            <CodeHighlight lang="ts" path="script" :content="props.js" />
          </div>
        </div>
        <div v-else-if="showComponent">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  html: string;
  js?: string;
}
import Button from "../module/src/runtime/components/Button.vue";
import MdiLanguageHtml5 from "~icons/mdi/language-html5";
import MdiLanguageTypescript from "~icons/mdi/language-typescript";

const router = useRouter();
const route = useRoute();

const props = withDefaults(defineProps<Props>(), {
  html: "",
  js: "",
});

let showComponent = ref(true);
let showHtml = ref(false);
let showJavascript = ref(false);

const changeQuery = (tab: string, keepHash = false) => {
  if (route.hash && keepHash) {
    router.replace({ query: { tab }, hash: route.hash });
  } else {
    router.replace({ query: { tab } });
  }
};

const showTab = (tab: string, keepHash = false) => {
  if (tab === "component") {
    showComponent.value = true;
    showHtml.value = false;
    showJavascript.value = false;
    changeQuery("component", keepHash);
  } else if (tab === "html") {
    showComponent.value = false;
    showHtml.value = true;
    showJavascript.value = false;
    changeQuery("html", keepHash);
  } else if (tab === "js" && props.js) {
    showComponent.value = false;
    showHtml.value = false;
    showJavascript.value = true;
    changeQuery("js", keepHash);
  } else {
    showComponent.value = true;
    showHtml.value = false;
    showJavascript.value = false;
    changeQuery("component", keepHash);
  }
};

onMounted(() => {
  if (route.query.tab === "html") {
    showTab("html", true);
  } else if (route.query.tab === "js") {
    showTab("js", true);
  } else {
    showTab("component", true);
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
