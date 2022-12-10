<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Toast
          id="playground"
          width="sm:w-1/2 max-w-4/5"
          :auto-close="false"
        ></Toast>
      </template>
      <template #playground>
        Playground
        <Button
          @click="
            createNotification({
              title: 'Warning!',
              message: 'This is a test warning!',
              type: 'warning',
            })
          "
          >Notify</Button
        >
      </template>
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

const createNotification = inject("create-notification");

let componentName = "Toast";

let props = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
