<template>
  <div class="py-3 px-2">
    <HeadingHash
      element="h4"
      :hash="'config-' + props.item.name.replace(/\s+/g, '-')"
    >
      <span
        :class="
          $route.hash ===
          '#' + ('config-' + props.item.name.replace(/\s+/g, '-'))
            ? 'text-secondary-800'
            : 'text-primary-800'
        "
      >
        {{ props.item.name }}
      </span>
    </HeadingHash>
    <div class="pl-2">
      <div class="sm:flex">
        <div class="sm:w-3/5 sm:pr-5">
          <h5 class="text-lg font-semibold">Description</h5>
          <p v-html="props.item.description"></p>
        </div>
        <div class="sm:w-2/5 sm:pt-0 pt-2">
          <h5 class="text-lg font-semibold">Structure</h5>
          <!-- v-if="typeof props.item.default === 'object'" -->
          <client-only
            v-if="typeof props.item.structure === 'object'"
            placeholder="Loading Default..."
          >
            <vue-json-pretty
              class="json-pretty"
              :highlight-selected-node="true"
              :show-double-quotes="false"
              :data="props.item.structure"
            />
          </client-only>
          <div v-else :class="getClassByType(props.item.structure)">
            {{
              typeof props.item.structure === "undefined"
                ? "undefined"
                : typeof props.item.structure === "string"
                ? '"' + props.item.structure + '"'
                : props.item.structure
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  item: {
    name: string;
    structure: object;
    description: string;
  };
}

const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {
      name: "ConfigName",
      structure: {
        name: "object-item",
        count: 2,
      },
      description: "Config Description",
    };
  },
});

function getClassByType(item: object) {
  if (typeof item === "boolean") {
    return "text-red-400";
  } else if (typeof item === "number") {
    return "text-blue-400";
  } else if (typeof item === "string") {
    return "text-green-400";
  } else {
    return "text-gray-400";
  }
}
</script>

<style>
.vjs-tree-node.is-highlight,
.vjs-tree-node:hover {
  background-color: theme("colors.primary.700") !important;
}

.vjs-value-string {
  color: theme("colors.green.400") !important;
}
</style>
