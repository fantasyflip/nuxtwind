<template>
  <div class="py-3 px-2">
    <HeadingHash
      element="h4"
      :hash="'slot-' + props.item.name.replace(/\s+/g, '-')"
    >
      <span
        :class="
          $route.hash === '#' + ('slot-' + props.item.name.replace(/\s+/g, '-'))
            ? 'text-secondary-800'
            : 'text-primary-800'
        "
      >
        {{ props.item.name }}
      </span>
    </HeadingHash>
    <div class="pl-2">
      <h5 class="text-lg font-semibold">Description</h5>
      <p v-html="props.item.description"></p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default() {
      return {
        name: "SlotName",
        description: "Slot Description",
      };
    },
  },
});
</script>

<style></style>
