<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Tooltip />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2"></div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :events="events"
          :caveats="caveats"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND

//DOCUMENTATION
let componentName = "Tooltip";

let props = [];

let events = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
