<template>
  <div
    :id="props.item.name"
    class="text-2xl font-bold"
    :class="
      $route.hash === '#' + props.item.name ? 'text-secondary' : 'text-primary'
    "
  >
    {{ props.item.name }}
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {
      name: "PropName",
      required: true,
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
