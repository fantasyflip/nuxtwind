<template>
  <div class="py-3 px-2">
    <HeadingHash
      element="h4"
      :hash="'prop-' + props.item.name.replace(/\s+/g, '-')"
    >
      <span
        :class="
          $route.hash === '#' + ('prop-' + props.item.name.replace(/\s+/g, '-'))
            ? 'text-secondary-800'
            : 'text-primary-800'
        "
      >
        {{ props.item.name }}
      </span>
    </HeadingHash>
    <div class="pl-2">
      <div class="text-lg">
        <span class="pr-1 font-semibold">Type:</span>
        {{ props.item.type }}
      </div>
      <div class="sm:flex">
        <div class="sm:w-3/5 sm:pr-5">
          <h5 class="text-lg font-semibold">Description</h5>
          <p v-html="props.item.description"></p>
        </div>
        <div class="sm:w-2/5 sm:pt-0 pt-2">
          <h5 class="text-lg font-semibold">Default</h5>
          <!-- v-if="typeof props.item.default === 'object'" -->
          <client-only
            v-if="typeof props.item.default === 'object'"
            placeholder="Loading Default..."
          >
            <vue-json-pretty
              class="json-pretty"
              :highlight-selected-node="true"
              :show-double-quotes="false"
              :data="props.item.default"
            />
          </client-only>
          <div v-else :class="getClassByType(props.item.default)">
            {{
              typeof props.item.default === "undefined"
                ? "undefined"
                : typeof props.item.default === "string"
                ? '"' + props.item.default + '"'
                : props.item.default
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
    type: string;
    default: object | string | number | boolean | undefined;
    description: string;
  };
}
const props = withDefaults(defineProps<Props>(), {
  item: () => {
    return {
      name: "PropName",
      type: "Object",
      default: {
        name: "object-item",
        count: 2,
      },
      description: "This is a description of the prop",
    };
  },
});

function getClassByType(item: object | string | number | boolean | undefined) {
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
