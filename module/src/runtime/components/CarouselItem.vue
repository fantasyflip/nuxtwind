<template>
  <div :class="'carousel-item-' + step" class="ci">
    <transition name="fade">
      <div
        v-if="currentItem === step"
        :id="`${props.step}`"
        class="absolute top-0 left-0 w-full h-full"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  step: number;
}
import { ref, onMounted, onBeforeUnmount } from "vue";
const props = withDefaults(defineProps<Props>(), {
  step: 1,
});

let currentItem = ref(0);
let parentElement = ref<any>(null);
let observer: any = null;

onMounted(() => {
  parentElement.value = document.querySelector(
    ".carousel-item-" + props.step
  )!.parentElement;
  currentItem.value = Number(
    parentElement.value.id.replace("currentItem-", "")
  );

  observer = new MutationObserver(() => {
    currentItem.value = Number(
      parentElement.value.id.replace("currentItem-", "")
    );
  });

  observer.observe(parentElement.value, {
    attributes: true,
    attributeFilter: ["id"],
  });
});

onBeforeUnmount(() => {
  observer.disconnect();
});
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
