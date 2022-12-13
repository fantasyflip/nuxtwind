<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Select
          :items="['Foo', 'Bar', 'Boo', 'Far', 'Foo', 'Bar', 'Boo', 'Far']"
          v-model="selectValue"
          label="Select"
          placeholder="Select an item"
          outlined
        />
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">Playground</div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

let selectValue = ref("");

//DOCUMENTATION
let componentName = "Select";

let props = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
