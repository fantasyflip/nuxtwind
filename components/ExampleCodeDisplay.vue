<template>
  <div class="w-full h-full">
    <div class="flex text-2xl pl-3">
      <div
        class="px-2 py-1 mr-3"
        :class="showComponent ? 'bg-zinc-800 rounded-t-lg' : ''"
      >
        <Button
          icon
          class="hover:-translate-y-px transition-all duration-300"
          @click="showTab('component')"
        >
          <NuxtWindIcon
            width="30px"
            :class="
              !showComponent
                ? 'grayscale hover:grayscale-0 transition-all duration-300'
                : ''
            "
          />
        </Button>
      </div>
      <div
        v-if="props.html"
        class="px-2 py-1 mr-3"
        :class="showHtml ? 'bg-zinc-800 rounded-t-lg' : ''"
      >
        <Button
          class="hover:-translate-y-px transition-all duration-300"
          icon
          :color="{
            text: showHtml ? 'text-orange-700' : 'text-zinc-500',
            iconHover: 'hover:text-orange-700',
          }"
          @click="showTab('html')"
        >
          <MdiLanguageHtml5 />
        </Button>
      </div>
      <div
        v-if="props.js"
        class="px-2 py-1 mr-3"
        :class="showJavascript ? 'bg-zinc-800 rounded-t-lg' : ''"
      >
        <Button
          class="hover:-translate-y-px transition-all duration-300"
          icon
          :color="{
            text: showJavascript ? 'text-yellow-500' : 'text-zinc-500',
            iconHover: 'hover:text-yellow-500',
          }"
          @click="showTab('js')"
        >
          <MdiLanguageJavascript />
        </Button>
      </div>
    </div>

    <div
      class="w-full h-[93%] grid place-items-center relative border-4 border-zinc-800 rounded-xl"
    >
      <transition name="fade">
        <div v-if="showHtml && props.html" class="absolute">
          <CodeHighlight
            lang="html"
            path="template"
            content="<Button>Click me!</Button>"
          />
        </div>
        <div v-else-if="showJavascript && props.js" class="absolute">
          <CodeHighlight lang="js" path="script" :content="props.js" />
        </div>
        <div v-else-if="showComponent">
          <slot />
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import Button from "../module/src/runtime/components/Button.vue";
import MdiLanguageHtml5 from "~icons/mdi/language-html5";
import MdiLanguageJavascript from "~icons/mdi/language-javascript";

const props = defineProps({
  html: {
    type: String,
    required: true,
    default: "",
  },
  js: {
    type: String,
    default: "",
  },
});

let showComponent = ref(true);
let showHtml = ref(false);
let showJavascript = ref(false);

const showTab = (tab) => {
  if (tab === "component") {
    showComponent.value = true;
    showHtml.value = false;
    showJavascript.value = false;
  } else if (tab === "html") {
    showComponent.value = false;
    showHtml.value = true;
    showJavascript.value = false;
  } else if (tab === "js") {
    showComponent.value = false;
    showHtml.value = false;
    showJavascript.value = true;
  }
};
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
</style>
