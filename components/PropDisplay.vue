<template>
  <div class="py-3 px-2">
    <div
      :id="props.item.name"
      class="text-2xl font-bold cursor-pointer"
      :class="
        $route.hash === '#' + props.item.name
          ? 'text-secondary'
          : 'text-primary'
      "
      @click="$hashAndCopy(props.item.name)"
    >
      {{ props.item.name }}
    </div>
    <div class="pl-2">
      <div class="text-lg">
        <span class="pr-1 font-semibold">Type:</span>
        {{ props.item.type }}
      </div>
      <div class="flex">
        <div class="w-3/5">
          <div class="text-lg font-semibold">Description</div>
          <div v-html="props.item.description"></div>
        </div>
        <div>
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
  background-color: theme("colors.primary") !important;
}

.vjs-value-string {
  color: theme("colors.green.400") !important;
}
</style>
