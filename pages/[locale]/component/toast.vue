<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Toast id="playground"></Toast>
      </template>
      <template #playground>
        Playground
        <Button
          @click="
            createNotification({
              title: 'Title',
              message: 'Message',
              type: 'warning',
              icon: iconToast,
              autoClose: false,
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
import MdiThemeLightDark from "~icons/mdi/theme-light-dark";
import { useI18n } from "vue-i18n";

const iconToast = markRaw(MdiThemeLightDark);
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
