<template>
  <div class="py-3 px-2">
    <div
      :id="'caveat-' + props.item.name.replace(/\s+/g, '-')"
      class="text-xl font-bold cursor-pointer"
      :class="
        $route.hash === '#' + ('caveat-' + props.item.name.replace(/\s+/g, '-'))
          ? 'text-secondary-800'
          : 'text-primary-800'
      "
      @click="$hashAndCopy('caveat-' + props.item.name.replace(/\s+/g, '-'))"
    >
      <Tooltip right width="w-40">
        <span class="hover:text-secondary-800">{{ props.item.name }}</span>
        <template #tooltip>{{
          $t("components.caveatDisplay.content.copyTooltip")
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
      name: "CaveatName",
      description: "Caveat Description",
    },
  },
});
</script>

<style></style>
