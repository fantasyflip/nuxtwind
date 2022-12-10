<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Toast></Toast>
      </template>
      <template #playground> Playground </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let componentName = "Toast";

let props = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
