<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Progress </template>
      <template #component>
        <Progress rounded loading />
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
      <template #events>
        <div
          v-for="(event, index) in events"
          :class="index < events.length - 1 ? 'border-b' : ''"
        >
          <EventDisplay :item="event" />
        </div>
      </template>
      <template #eventCount>{{ events.length }}</template>
      <template #slots>
        <div
          v-for="(slot, index) in slots"
          :class="index < slots.length - 1 ? 'border-b' : ''"
        >
          <SlotDisplay :item="slot" />
        </div>
      </template>
      <template #slotCount>{{ slots.length }}</template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
let props = [];

let events = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
