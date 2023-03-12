<template>
  <div v-if="props.modelValue" :class="wrapperClass">
    <div ref="contentWrapper" class="bg-red-500">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface Props {
  modelValue: boolean;
  bgOpacity?: string;
  bgColor?: string;
  zIndex?: string;
  hideOverflow?: boolean;
  persistent?: boolean;
}
import { computed, ref, onMounted, watch } from "vue";

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  bgOpacity: "bg-opacity-50",
  bgColor: "bg-black",
  zIndex: "z-[110]",
  hideOverflow: false,
  persistent: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", id: boolean): void;
}>();

const contentWrapper = ref(null);
let outsideClickCounter = 0;

onMounted(() => {
  if (!props.persistent) {
    window.addEventListener("click", function (e) {
      if (outsideClickCounter > 0) {
        emit("update:modelValue", false);
        outsideClickCounter = 0;
      } else {
        outsideClickCounter++;
      }
    });
  }
});

const wrapperClass = computed(() => {
  let classes: string[] = [];

  classes.push("fixed", "w-full", "h-full", "top-0", "left-0");

  classes.push(props.bgColor);
  classes.push(props.bgOpacity);
  classes.push(props.zIndex);

  if (props.hideOverflow) {
    console.log("hide overflow");

    classes.push("overscroll-none");
  }

  return classes.join(" ");
});
</script>
