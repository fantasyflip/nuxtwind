<template>
  <li
    :id="'list-item' + props.id"
    :class="isDraggable ? props.draggableHoverClasses : ''"
    class="relative group"
  >
    <slot>List-Item {{ isDraggable ? " - Draggable" : "" }}</slot>
    <div
      class="absolute right-3 bottom-3 group-hover:opacity-100 opacity-0 cursor-grab"
    >
      <svg viewBox="0 0 24 24" width="1.4em" height="1.4em">
        <path
          fill="currentColor"
          d="M7 19v-2h2v2H7m4 0v-2h2v2h-2m4 0v-2h2v2h-2m-8-4v-2h2v2H7m4 0v-2h2v2h-2m4 0v-2h2v2h-2m-8-4V9h2v2H7m4 0V9h2v2h-2m4 0V9h2v2h-2M7 7V5h2v2H7m4 0V5h2v2h-2m4 0V5h2v2h-2Z\"
        />
      </svg>
    </div>
  </li>
</template>

<script lang="ts" setup>
export interface Props {
  id: string;
  draggableHoverClasses?: string;
}
import { onMounted, ref } from "vue";

let isDraggable = ref<boolean>(false);

const props = withDefaults(defineProps<Props>(), {
  draggableHoverClasses: "hover:bg-secondary-700",
});

onMounted(() => {
  let parentElement = document.getElementById(
    "list-item" + props.id
  )!.parentElement;
  let classList = parentElement!.classList;
  if (classList.contains("draggable")) {
    isDraggable.value = true;
  }
});
</script>
