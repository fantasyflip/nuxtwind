<template>
  <div class="py-3 px-2">
    <div
      :id="'prop-' + props.item.name"
      class="text-xl font-bold cursor-pointer"
      :class="
        $route.hash === '#' + ('prop-' + props.item.name)
          ? 'text-secondary-800'
          : 'text-primary-800'
      "
      @click="$hashAndCopy('prop-' + props.item.name)"
    >
      <Tooltip right width="w-40">
        <span class="hover:text-secondary-800">{{ props.item.name }}</span>
        <template #tooltip>{{
          $t("components.propDisplay.content.copyTooltip")
        }}</template>
      </Tooltip>
    </div>
    <div class="pl-2">
      <div class="text-lg">
        <span class="pr-1 font-semibold">Type:</span>
        {{ props.item.type }}
      </div>
      <div class="sm:flex">
        <div class="sm:w-3/5 sm:pr-5">
          <div class="text-lg font-semibold">Description</div>
          <div v-html="props.item.description"></div>
        </div>
        <div class="sm:w-2/5 sm:pt-0 pt-2">
          <div class="text-lg font-semibold">Default</div>
          <!-- v-if="typeof props.item.default === 'object'" -->
          <client-only
            placeholder="Loading Default..."
            v-if="typeof props.item.default === 'object'"
          >
            <vue-json-pretty
              class="json-pretty"
              :highlightSelectedNode="true"
              :showDoubleQuotes="false"
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

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {
      name: "PropName",
      type: "Object",
      default: {
        name: "object-item",
        count: 2,
      },
      description: "This is a description of the prop",
    },
  },
});

function getClassByType(item) {
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
