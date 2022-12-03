<template>
  <div class="py-3 px-2">
    <div
      :id="props.item.name"
      class="text-2xl font-bold"
      :class="
        $route.hash === '#' + props.item.name
          ? 'text-secondary'
          : 'text-primary'
      "
    >
      {{ props.item.name }}
    </div>
    <div class="pl-2">
      <div class="text-lg">
        <span class="pr-1 font-semibold">Type:</span>
        {{ props.item.type }}
      </div>
      <div class="flex">
        <div class="w-2/3">
          <div class="text-lg font-semibold">Description</div>
          <div>
            {{ props.item.description }}
          </div>
        </div>
        <div>
          <div class="text-lg font-semibold">Default</div>
          <pre>
            {{ props.item.default }}
          </pre>
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
</script>
