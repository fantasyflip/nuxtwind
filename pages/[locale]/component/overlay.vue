<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <Button @click="showOverlay = !showOverlay"
            >Toggle Overlay {{ showOverlay }}</Button
          >
          <Overlay v-model="showOverlay" hide-overflow> test </Overlay>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center w-full h-full">
          <div class="md:w-2/3 w-full"></div>
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
import Button from "../../../module/src/runtime/components/Button.vue";
import Overlay from "../../../module/src/runtime/components/Overlay.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Button";

//PLAYGROUND

let showOverlay = ref(false);

let codeExample = computed(() => {
  let html = ``;
  let js = "";
  return { html, js };
});

//DOCUMENTATION

let props = [];

let slots = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
