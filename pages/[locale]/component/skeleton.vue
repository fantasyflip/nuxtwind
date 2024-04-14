<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <Skeleton
            :loading="loading"
            class="size-72"
            :tag="selectedTag.value"
            :auto-detect-root-tag="autoDetectRootTag"
          >
            <img
              v-if="selectedTag.value === 'img'"
              src="https://images.unsplash.com/photo-1666030809086-f21069785386?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <p
              v-else-if="selectedTag.value === 'p'"
              class="text-justify hyphens-auto"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              inventore dolore cumque voluptatum?
            </p>
            <article
              v-else-if="selectedTag.value === 'article'"
              class="flex flex-col gap-3"
            >
              <div class="font-bold text-2xl">Lorem ipsum dolor sit</div>
              <p class="text-justify hypehens-auto">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
                architecto assumenda accusantium ipsam alias, eaque iusto
                voluptatem necessitatibus esse quae nesciunt
              </p>
            </article>
            <div
              v-else-if="selectedTag.value === 'card'"
              class="flex flex-col gap-2"
            >
              <img
                class="aspect-video"
                src="https://images.unsplash.com/photo-1666030853687-426a8eb56636?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
              <div class="font-bold text-2xl mx-3">Lorem ipsum dolor sit</div>
            </div>
          </Skeleton>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center w-full h-full">
          <div class="md:w-2/3 w-full">
            <Select
              v-model="selectedTag"
              filled
              label="Tag"
              class="mb-4"
              :items="tagSelectItems"
              display-property="name"
              search
              show-all-on-focus
              mark-on-focus
            />
            <Checkbox
              v-model="autoDetectRootTag"
              class="mb-4"
              label="Auto-Detect-Root-Tag"
            />
            <Button grow @click="loading = !loading">Toggle Loading</Button>
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :slots="slots"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import Skeleton from "../../../module/src/runtime/components/Skeleton.vue";
import Button from "../../../module/src/runtime/components/Button.vue";
import Select from "../../../module/src/runtime/components/Select.vue";
import Checkbox from "../../../module/src/runtime/components/Checkbox.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Skeleton";

//PLAYGROUND

const selectedTag = ref({ value: "article", name: "Article" });

const tagSelectItems = [
  {
    value: "p",
    name: "Paragraph",
  },
  {
    value: "article",
    name: "Article",
  },
  {
    value: "img",
    name: "Image",
  },
  {
    value: "card",
    name: "Card",
  },
];

const autoDetectRootTag = ref(true);

const loading = ref(true);

let codeExample = computed(() => {
  let html = `<NXW-Skeleton
  class="size-72"
  :loading="${loading.value}"
  :tag="${selectedTag.value.value}"
  :auto-detect-root-tag="${autoDetectRootTag.value}"
>
... your Content
</NXW-Skeleton>`;
  let js = `const loading = ref(${loading.value});`;
  return { html, js };
});

watch(selectedTag, () => {
  if (selectedTag.value.value == "card") {
    autoDetectRootTag.value = false;
  }
});

//DOCUMENTATION

let props = [
  {
    name: "tag",
    type: "String",
    default: "p",
    description: t(
      "pages.component.skeleton.content.documentation.properties.tag.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.skeleton.content.documentation.properties.loading.description"
    ),
  },
  {
    name: "autoDetectRootTag",
    type: "Boolean",
    default: true,
    description: t(
      "pages.component.skeleton.content.documentation.properties.autoDetectRootTag.description"
    ),
  },
  {
    name: "animationClass",
    type: "String",
    default: "animate-pulse",
    description: t(
      "pages.component.skeleton.content.documentation.properties.animationClass.description"
    ),
  },
  {
    name: "tagOptions",
    type: "Object",
    default: {
      p: {
        lines: 3,
        lineHeight: "h-4",
        color: "dark:bg-zinc-700 bg-zinc-200",
        rounded: "rounded-3xl",
        gap: "gap-2",
      },
      article: {
        lines: 5,
        lineHeight: "h-4",
        headingHeight: "h-6",
        color: "dark:bg-zinc-700 bg-zinc-200",
        gap: "gap-2",
        headingGap: "gap-5",
        rounded: "rounded-3xl",
        headingRounded: "rounded-lg",
      },
      img: {
        width: "w-full",
        height: "h-full",
        rounded: "rounded",
        color: "bg-zinc-800",
        iconColor: "text-zinc-600",
        iconSize: "size-10",
      },
      card: {
        imgHeight: "h-full",
        headingHeight: "h-6",
        imgRounded: "rounded",
        headingRounded: "rounded-lg",
        imgIconColor: "text-zinc-600",
        imgIconSize: "size-10",
        imageAspect: "aspect-video",
        color: "bg-zinc-800",
        gap: "gap-4",
      },
    },
    description: t(
      "pages.component.skeleton.content.documentation.properties.tagOptions.description"
    ),
  },
];

let slots = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
