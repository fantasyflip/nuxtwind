<template>
  <div
    id="documentation"
    class="lg:text-3xl text-2xl font-bold cursor-pointer mx-4"
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
        id="properties"
        class="lg:text-2xl text-xl font-bold cursor-pointer"
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
        :key="index"
        :class="index < sortedProps.length - 1 ? 'border-b' : ''"
      >
        <PropDisplay :item="prop" />
      </div>
    </div>
    <div v-if="props.events.length > 0" class="mx-4 mt-4">
      <div
        id="events"
        class="lg:text-2xl text-xl font-bold cursor-pointer"
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
        :key="index"
        :class="index < props.events.length - 1 ? 'border-b' : ''"
      >
        <EventDisplay :item="event" />
      </div>
    </div>
    <div v-if="sortedSlots.length > 0" class="mx-4 mt-4">
      <div
        id="slots"
        class="lg:text-2xl text-xl font-bold cursor-pointer"
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
        :key="index"
        :class="index < sortedSlots.length - 1 ? 'border-b' : ''"
      >
        <SlotDisplay :item="slot" />
      </div>
    </div>
    <div v-if="sortedConfigs.length > 0" class="mx-4 mt-4">
      <div
        id="configs"
        class="lg:text-2xl text-xl font-bold cursor-pointer"
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
        :key="index"
        :class="index < sortedConfigs.length - 1 ? 'border-b' : ''"
      >
        <ConfigDisplay :item="config" />
      </div>
    </div>
    <div v-if="sortedCaveats.length > 0" class="mx-4 mt-4">
      <div
        id="caveats"
        class="lg:text-2xl text-xl font-bold cursor-pointer"
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
        :key="index"
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
    default() {
      return [];
    },
  },
  events: {
    type: Array,
    default() {
      return [];
    },
  },
  slots: {
    type: Array,
    default() {
      return [];
    },
  },
  configs: {
    type: Array,
    default() {
      return [];
    },
  },
  caveats: {
    type: Array,
    default() {
      return [];
    },
  },
});

let sortedProps = computed(() => {
  let propsArray = props.props;
  return propsArray.sort((a, b) => {
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
  let slotsArray = props.slots;
  return slotsArray.sort((a, b) => {
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
  let configsArray = props.configs;
  return configsArray.sort((a, b) => {
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
  let caveatsArray = props.caveats;
  return caveatsArray.sort((a, b) => {
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
