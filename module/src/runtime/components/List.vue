<template>
  <div :class="wrapperClass">
    <slot />
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  draggable?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  draggable: false,
});

let wrapperClass = computed(() => {
  let classes: string[] = [];
  if (props.draggable) {
    classes.push("draggable");
  }
  return classes.join(" ");
});
</script>
