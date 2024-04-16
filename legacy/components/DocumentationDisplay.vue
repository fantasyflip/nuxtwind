<template>
  <HeadingHash element="h2" hash="documentation" class="mx-4">
    <span
      >{{ $t("components.documentationDisplay.content.documentation") }} -
    </span>
    <span class="text-primary-800">
      {{ props.componentName }}
    </span>
  </HeadingHash>
  <div class="mx-2">
    <section v-if="sortedProps.length > 0" class="mx-4 mt-4">
      <HeadingHash element="h3" hash="properties">
        <span
          >{{ $t("components.documentationDisplay.content.props") }}
          <span class="font-normal"> ({{ sortedProps.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </HeadingHash>
      <ul>
        <li
          v-for="(prop, index) in sortedProps"
          :key="index"
          :class="index < sortedProps.length - 1 ? 'border-b' : ''"
        >
          <PropDisplay :item="prop" />
        </li>
      </ul>
    </section>
    <section v-if="props.events.length > 0" class="mx-4 mt-4">
      <HeadingHash element="h3" hash="events">
        <span
          >{{ $t("components.documentationDisplay.content.events") }}
          <span class="font-normal"> ({{ props.events.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </HeadingHash>
      <ul>
        <li
          v-for="(event, index) in props.events"
          :key="index"
          :class="index < props.events.length - 1 ? 'border-b' : ''"
        >
          <EventDisplay :item="event" />
        </li>
      </ul>
    </section>
    <section v-if="sortedSlots.length > 0" class="mx-4 mt-4">
      <HeadingHash element="h3" hash="slots">
        <span
          >{{ $t("components.documentationDisplay.content.slots") }}
          <span class="font-normal"> ({{ sortedSlots.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </HeadingHash>
      <ul>
        <li
          v-for="(slot, index) in sortedSlots"
          :key="index"
          :class="index < sortedSlots.length - 1 ? 'border-b' : ''"
        >
          <SlotDisplay :item="slot" />
        </li>
      </ul>
    </section>
    <section v-if="sortedConfigs.length > 0" class="mx-4 mt-4">
      <HeadingHash element="h3" hash="configs">
        <span
          >{{ $t("components.documentationDisplay.content.configs") }}
          <span class="font-normal"> ({{ sortedConfigs.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </HeadingHash>
      <ul>
        <li
          v-for="(config, index) in sortedConfigs"
          :key="index"
          :class="index < sortedConfigs.length - 1 ? 'border-b' : ''"
        >
          <ConfigDisplay :item="config" />
        </li>
      </ul>
    </section>
    <section v-if="sortedCaveats.length > 0" class="mx-4 mt-4">
      <HeadingHash element="h3" hash="caveats">
        <span
          >{{ $t("components.documentationDisplay.content.caveats") }}
          <span class="font-normal"> ({{ sortedCaveats.length }})</span> -
        </span>
        <span class="text-primary-800">
          {{ props.componentName }}
        </span>
      </HeadingHash>
      <ul>
        <li
          v-for="(caveat, index) in sortedCaveats"
          :key="index"
          :class="index < sortedCaveats.length - 1 ? 'border-b' : ''"
        >
          <CaveatDisplay :item="caveat" />
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  componentName: string;
  props?: Array<{
    name: string;
    type: string;
    default: any;
    description: string;
  }>;
  events?: Array<{
    name: string;
    structure: object | string | undefined;
    description: string;
  }>;
  slots?: Array<{
    name: string;
    description: string;
  }>;
  configs?: Array<{
    name: string;
    structure: object;
    description: string;
  }>;
  caveats?: Array<{
    name: string;
    description: string;
  }>;
}

const props = withDefaults(defineProps<Props>(), {
  componentName: "componentName",
  props: () => [],
  events: () => [],
  slots: () => [],
  configs: () => [],
  caveats: () => [],
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
