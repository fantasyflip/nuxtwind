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
      <Button
        icon
        :ari-label="$t(' components.codeHighlight.button.copy')"
        @click="handleCopy"
      >
        <MdiContentCopy />
      </Button>
    </div>
    <div :class="props.path ? 'pt-2' : ''" class="pr-6" v-html="html"></div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  content: string;
  lang: string;
  path?: string;
}
import Button from "../module/src/runtime/components/Button.vue";
import MdiBash from "~icons/mdi/bash";
import MdiContentCopy from "~icons/mdi/content-copy";

const props = withDefaults(defineProps<Props>(), {
  path: "",
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

let contentComputed = computed(() => {
  return props.content;
});

//watch contentComputed to update content when it changes
watch(contentComputed, async () => {
  html.value = await useCodeToHtml(props.content, props.lang);
});

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
  white-space: pre-wrap;
  word-break: break-word;
}
</style>
