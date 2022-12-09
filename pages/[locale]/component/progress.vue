<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Progress </template>
      <template #component>
        <Progress rounded loading> </Progress>
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
let props = [
  {
    name: "size",
    type: "Object",
    default: {
      width: "w-full",
      height: "h-1",
    },
    description: t(
      "pages.component.progress.content.properties.size.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      circle: "#27272a",
      circleProgress: "#155e75",
      circleCutout: "before:bg-zinc-900",
      background: "bg-zinc-800",
      firstStrike: "before:bg-cyan-800",
      secondStrike: "after:bg-cyan-600",
      linearProgress: "bg-cyan-800",
      linearProgressHover: "hover:bg-emerald-700",
    },
    description: t(
      "pages.component.progress.content.properties.color.description"
    ),
  },
  {
    name: "circular",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.progress.content.properties.circular.description"
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.progress.content.properties.loading.description"
    ),
  },
  {
    name: "initialLoadTime",
    type: "Number, Boolean",
    default: 100,
    description: t(
      "pages.component.progress.content.properties.initialLoadTime.description"
    ),
  },
  {
    name: "transition",
    type: "Boolean, Object",
    default: true,
  },
  {
    name: "rounded",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.progress.content.properties.rounded.description"
    ),
  },
];

let events = [];

let slots = [
  {
    name: "inner-circle",
    description: t(
      "pages.component.progress.content.slots.innerCircle.description"
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
