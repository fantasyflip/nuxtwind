<template>
  <div class="bg-gray-300 dark:bg-zinc-800 rounded-lg p-4 flex group relative">
    <div class="pr-2 h-full pt-1 text-primary-700">
      <MdiChevronRight />
    </div>
    <code class="pr-8">
      {{ props.content }}
    </code>
    <div
      class="absolute right-3 top-5 group-hover:opacity-100 opacity-0 transition-opacity"
    >
      <Button
        icon
        :ari-label="$t(' components.bashHighlight.button.copy')"
        @click="handleCopy"
      >
        <MdiContentCopy />
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  content: string;
}
import Button from "../module/src/runtime/components/Button.vue";
import MdiChevronRight from "~icons/mdi/chevron-right";
import MdiContentCopy from "~icons/mdi/content-copy";
import MdiBash from "~icons/mdi/bash";

const props = defineProps<Props>();

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
