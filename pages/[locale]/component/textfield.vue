<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Textfield </template>
      <template #component>
        <Textfield prepend-icon>
          <template #icon>
            <MdiMagnify />
          </template>
        </Textfield>
      </template>
      <template #playground> Playground </template>
      <template #props>
        <div
          v-for="(prop, index) in props"
          :class="index < props.length - 1 ? 'border-b' : ''"
        >
          <PropDisplay :item="prop" />
        </div>
      </template>
      <template #propertyCount>{{ props.length }}</template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import MdiMagnify from "~icons/mdi/magnify";

import { useI18n } from "vue-i18n";
const { t } = useI18n();
let props = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
