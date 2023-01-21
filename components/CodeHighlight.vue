<template>
  <div
    class="bg-gray-300 dark:bg-zinc-800 rounded-lg p-4 flex group relative group"
  >
    <div
      v-if="props.path"
      class="absolute opacity-100 group-hover:opacity-0 transition-opacity top-2 right-3 text-sm"
    >
      {{ props.path }}
    </div>
    <div
      class="absolute bottom-2 right-3 group-hover:opacity-100 opacity-0 transition-opacity"
    >
      <Button icon @click="handleCopy">
        <MdiContentCopy />
      </Button>
    </div>
    <div v-html="html"></div>
  </div>
</template>

<script setup>
import Button from "../module/src/runtime/components/Button.vue";
import MdiBash from "~icons/mdi/bash";
import MdiContentCopy from "~icons/mdi/content-copy";

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
  lang: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    default: "",
  },
});

let html = ref("");
onMounted(async () => {
  html.value = await useCodeToHtml(props.content, props.lang);
});

watch(
  () => useColorMode().value,
  async () => {
    console.log("color mode changed");
    html.value = await useCodeToHtml(props.content, props.lang);
  }
);

const bashIcon = markRaw(MdiBash);
const route = useRoute();
const currentLocale = route.params.locale;

function handleCopy() {
  navigator.clipboard.writeText(props.content);
  useToast({
    title:
      currentLocale === "de" ? "Erfolgreich kopiert!" : "Successfully copied!",
    message: "",
    icon: bashIcon,
    type: "success",
  });
}
</script>

<style lang="scss" scoped>
:deep(.shiki) {
  background-color: transparent !important;
}
</style>
