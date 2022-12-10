<template>
  <div
    class="lg:text-3xl text-2xl font-bold cursor-pointer mx-4"
    id="playground"
    @click="$hashAndCopy('playground')"
  >
    <span
      >{{ $t("components.documentationDisplay.content.documentation") }} -
    </span>
    <span class="text-primary-800">
      {{ props.componentName }}
    </span>
  </div>
  <div class="mx-2">
    <div v-if="props.props.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="properties"
        @click="$hashAndCopy('properties')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.props") }}
          <span class="font-normal"> ({{ props.props.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(prop, index) in props.props"
        :class="index < props.props.length - 1 ? 'border-b' : ''"
      >
        <PropDisplay :item="prop" />
      </div>
    </div>
    <div v-if="props.events.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="events"
        @click="$hashAndCopy('events')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.events") }}
          <span class="font-normal"> ({{ props.events.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(event, index) in props.events"
        :class="index < props.events.length - 1 ? 'border-b' : ''"
      >
        <EventDisplay :item="event" />
      </div>
    </div>
    <div v-if="props.slots.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="slots"
        @click="$hashAndCopy('slots')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.slots") }}
          <span class="font-normal"> ({{ props.slots.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(slot, index) in props.slots"
        :class="index < props.slots.length - 1 ? 'border-b' : ''"
      >
        <SlotDisplay :item="slot" />
      </div>
    </div>
    <div v-if="props.configs.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="configs"
        @click="$hashAndCopy('configs')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.configs") }}
          <span class="font-normal"> ({{ props.configs.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(config, index) in props.configs"
        :class="index < props.configs.length - 1 ? 'border-b' : ''"
      >
        <ConfigDisplay :item="config" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  componentName: {
    type: String,
    default: "componentName",
  },
  props: {
    type: Array,
    default: [],
  },
  events: {
    type: Array,
    default: [],
  },
  slots: {
    type: Array,
    default: [],
  },
  configs: {
    type: Array,
    default: [],
  },
});
</script>
