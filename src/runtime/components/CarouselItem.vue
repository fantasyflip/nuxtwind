<template>
  <div
    ref="carouselItemRef"
    :class="'carousel-item-' + step"
    class="ci"
  >
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
import { ref, onMounted, onBeforeUnmount } from 'vue'

export interface Props {
  // eslint-disable-next-line vue/no-required-prop-with-default
  step: number
}
const props = withDefaults(defineProps<Props>(), {
  step: 1,
})

const currentItem = ref(0)
const carouselItemRef = ref<HTMLElement | null>(null)
const parentElement = ref<HTMLElement | null>(null)
let observer: MutationObserver | null = null

onMounted(() => {
  // Get the direct parent carousel by traversing up the DOM tree
  let element = carouselItemRef.value?.parentElement
  while (element) {
    if (element.classList.contains('carousel')) {
      parentElement.value = element
      break
    }
    element = element.parentElement
  }

  if (!parentElement.value) return

  currentItem.value = Number(
    parentElement.value.id.replace('currentItem-', ''),
  )

  observer = new MutationObserver(() => {
    if (!parentElement.value) return
    currentItem.value = Number(
      parentElement.value.id.replace('currentItem-', ''),
    )
  })

  observer.observe(parentElement.value, {
    attributes: true,
    attributeFilter: ['id'],
  })
})

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
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
