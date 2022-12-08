<template>
  <div class="py-3 px-2">
    <div
      :id="'slot-' + props.item.name"
      class="text-2xl font-bold cursor-pointer"
      :class="
        $route.hash === '#' + ('slot-' + props.item.name)
          ? 'text-secondary'
          : 'text-primary'
      "
      @click="$hashAndCopy('slot-' + props.item.name)"
    >
      {{ props.item.name }}
    </div>
    <div class="pl-2">
      <div class="text-lg font-semibold">Description</div>
      <div v-html="props.item.description"></div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: {
      name: "SlotName",
      description: "Slot Description",
    },
  },
});
</script>

<style></style>
