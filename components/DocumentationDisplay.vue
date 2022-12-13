<template>
  <div
    class="lg:text-3xl text-2xl font-bold cursor-pointer mx-4"
    id="documentation"
    @click="$hashAndCopy('documentation')"
  >
    <span
      >{{ $t("components.documentationDisplay.content.documentation") }} -
    </span>
    <span class="text-primary-800">
      {{ props.componentName }}
    </span>
  </div>
  <div class="mx-2">
    <div v-if="sortedProps.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="properties"
        @click="$hashAndCopy('properties')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.props") }}
          <span class="font-normal"> ({{ sortedProps.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(prop, index) in sortedProps"
        :class="index < sortedProps.length - 1 ? 'border-b' : ''"
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
    <div v-if="sortedSlots.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="slots"
        @click="$hashAndCopy('slots')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.slots") }}
          <span class="font-normal"> ({{ sortedSlots.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(slot, index) in sortedSlots"
        :class="index < sortedSlots.length - 1 ? 'border-b' : ''"
      >
        <SlotDisplay :item="slot" />
      </div>
    </div>
    <div v-if="sortedConfigs.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="configs"
        @click="$hashAndCopy('configs')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.configs") }}
          <span class="font-normal"> ({{ sortedConfigs.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(config, index) in sortedConfigs"
        :class="index < sortedConfigs.length - 1 ? 'border-b' : ''"
      >
        <ConfigDisplay :item="config" />
      </div>
    </div>
    <div v-if="sortedCaveats.length > 0" class="mx-4 mt-4">
      <div
        class="lg:text-2xl text-xl font-bold cursor-pointer"
        id="caveats"
        @click="$hashAndCopy('caveats')"
      >
        <span
          >{{ $t("components.documentationDisplay.content.caveats") }}
          <span class="font-normal"> ({{ sortedCaveats.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </div>
      <div
        v-for="(caveat, index) in sortedCaveats"
        :class="index < sortedCaveats.length - 1 ? 'border-b' : ''"
      >
        <CaveatDisplay :item="caveat" />
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
  caveats: {
    type: Array,
    default: [],
  },
});

let sortedProps = computed(() => {
  return props.props.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});

let sortedSlots = computed(() => {
  return props.slots.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});

let sortedConfigs = computed(() => {
  return props.configs.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});

let sortedCaveats = computed(() => {
  return props.caveats.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
});
</script>
