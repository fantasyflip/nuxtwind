<template>
  <div class="py-3 px-2">
    <div
      :id="'slot-' + props.item.name"
      class="text-xl font-bold cursor-pointer"
      :class="
        $route.hash === '#' + ('slot-' + props.item.name)
          ? 'text-secondary-800'
          : 'text-primary-800'
      "
      @click="$hashAndCopy('slot-' + props.item.name)"
    >
      <Tooltip right width="w-40">
        <span class="hover:text-secondary-800">{{ props.item.name }}</span>
        <template #tooltip>{{
          $t("components.slotDisplay.content.copyTooltip")
        }}</template>
      </Tooltip>
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
