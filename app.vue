<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const route = useRoute();
const { locale } = useI18n();
watch(
  () => route.params.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      locale.value = newLocale;
    }
  },
  { immediate: true }
);
</script>
