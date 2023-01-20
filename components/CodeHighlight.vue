<template>
  <div class="bg-zinc-800 rounded-lg p-4 flex group relative group">
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
import { getHighlighter } from "shiki-es";

const highlighter = await getHighlighter({
  theme: "github-dark",
  langs: ["js", "vue", "json", "ts"],
});

let html = highlighter.codeToHtml(props.content, { lang: props.lang });
html = html.replace(
  'class="shiki" style="background-color: #0d1117"',
  'class="shiki bg-zinc-800"'
);

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

const bashIcon = markRaw(MdiBash);
const route = useRoute();
const currentLocale = route.params.locale;

function handleCopy() {
  console.log("copy");
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
