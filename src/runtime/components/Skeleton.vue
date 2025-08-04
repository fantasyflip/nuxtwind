<template>
  <div>
    <div
      v-show="!props.loading"
      ref="SlotWrapper"
    >
      <slot />
    </div>
    <slot name="skeleton">
      <div
        v-if="isTag('p')"
        :class="pStyle"
      >
        <div
          v-for="index in config.tagOptions.p?.lines"
          :key="index"
          :class="pItemStyle(index)"
        />
      </div>
      <div
        v-else-if="isTag('article')"
        :class="articleWrapperStyle"
      >
        <div :class="articleHeadingStyle" />
        <div :class="articlePWrapperStyle">
          <!-- eslint-disable-next-line vue/require-v-for-key -->
          <div
            v-for="index in config.tagOptions.article?.lines"
            :class="articlePItemStyle(index)"
          />
        </div>
      </div>
      <div
        v-else-if="isTag('img')"
        :class="imgWrapperStyle"
      >
        <svg
          :class="imgIconStyle"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 18"
        >
          <path
            d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
          />
        </svg>
      </div>
      <div
        v-else-if="isTag('card')"
        :class="cardWrapperStyle"
      >
        <div :class="cardImageWrapperStyle">
          <svg
            :class="cardImgIconStyle"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
            />
          </svg>
        </div>
        <div :class="cardHeadingStyle" />
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import type { SkeletonProps } from '../types/props'
import type { SkeletonConfig } from '../types/merged'
import useComponentConfig from '../composables/useComponentConfig'

export interface RequiredSkeletonProps extends SkeletonProps {
  // eslint-disable-next-line vue/no-required-prop-with-default
  loading: boolean
}

const props = withDefaults(defineProps<RequiredSkeletonProps>(), {
  loading: undefined,
  autoDetectRootTag: undefined,
})

const config = computed<SkeletonConfig>(() => useComponentConfig('skeleton', props))

const SlotWrapper = ref<HTMLElement | null>(null)

const slotRootTag = ref<string | undefined>()

watch(
  SlotWrapper,
  (value) => {
    if (!value) return
    slotRootTag.value = SlotWrapper.value?.firstElementChild?.tagName
  },
  { immediate: true },
)

// watch template ref for inner changes
onMounted(() => {
  // observer for slot changes
  const observer = new MutationObserver(() => {
    slotRootTag.value = SlotWrapper.value?.firstElementChild?.tagName
  })

  observer.observe(SlotWrapper.value as Node, {
    childList: true,
    subtree: true,
  })
})

function isTag(tag: string) {
  if (!config.value.loading) {
    return false
  }

  if (config.value.autoDetectRootTag && slotRootTag.value) {
    return slotRootTag.value?.toLocaleLowerCase() === tag.toLocaleLowerCase()
  }
  else {
    return config.value.tag.toLocaleLowerCase() === tag.toLocaleLowerCase()
  }
}

// p Tag styles
const pStyle = computed(() => {
  const styleClasses = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(config.value.tagOptions.p.gap)

  return styleClasses.join(' ')
})

function pItemStyle(index: number) {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(config.value.animationClass)

  // line width
  if (index == config.value.tagOptions.p?.lines && config.value.tagOptions.p.lines > 1) {
    styleClasses.push('w-2/3')
  }
  else {
    styleClasses.push('w-full')
  }

  // line height
  styleClasses.push(
    config.value.tagOptions.p?.lineHeight,
  )

  // color
  styleClasses.push(config.value.tagOptions.p?.color)

  // rounded
  styleClasses.push(
    config.value.tagOptions.p?.rounded,
  )

  return styleClasses.join(' ')
}

// article Tag Styles
const articleWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(
    config.value.tagOptions.article?.headingGap,
  )

  return styleClasses.join(' ')
})

const articleHeadingStyle = computed(() => {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(config.value.animationClass)

  // line height
  styleClasses.push(
    config.value.tagOptions.article?.headingHeight,
  )

  // color
  styleClasses.push(
    config.value.tagOptions.article?.color,
  )

  // rounded
  styleClasses.push(
    config.value.tagOptions.article?.headingRounded,
  )

  return styleClasses.join(' ')
})

const articlePWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(
    config.value.tagOptions.article?.gap,
  )

  return styleClasses.join(' ')
})

function articlePItemStyle(index: number) {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(config.value.animationClass)

  // line width
  if (
    index == config.value.tagOptions.article?.lines
    && config.value.tagOptions.article.lines > 1
  ) {
    styleClasses.push('w-2/3')
  }
  else {
    styleClasses.push('w-full')
  }

  // line height
  styleClasses.push(
    config.value.tagOptions.article?.lineHeight,
  )

  // color
  styleClasses.push(
    config.value.tagOptions.article.color,
  )

  // rounded
  styleClasses.push(
    config.value.tagOptions.article?.rounded,
  )

  return styleClasses.join(' ')
}

// img Tag Styles
const imgWrapperStyle = computed(() => {
  const styleClasses = ['flex', 'items-center', 'justify-center']

  // animation
  styleClasses.push(config.value.animationClass)

  // width
  styleClasses.push(
    config.value.tagOptions.img?.width,
  )

  // height
  styleClasses.push(
    config.value.tagOptions.img?.height,
  )

  // color
  styleClasses.push(
    config.value.tagOptions.img?.color,
  )

  // rounded
  styleClasses.push(
    config.value.tagOptions.img?.rounded,
  )

  return styleClasses.join(' ')
})

const imgIconStyle = computed(() => {
  const styleClasses: string[] = []

  // color
  styleClasses.push(
    config.value.tagOptions.img?.iconColor,
  )

  // size
  styleClasses.push(
    config.value.tagOptions.img?.iconSize,
  )

  return styleClasses.join(' ')
})

// card Tag Styles
const cardWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(config.value.tagOptions.card?.gap)

  return styleClasses.join(' ')
})

const cardImageWrapperStyle = computed(() => {
  const styleClasses: string[] = ['flex', 'items-center', 'justify-center']

  // animation
  styleClasses.push(config.value.animationClass)

  // height
  styleClasses.push(
    config.value.tagOptions.card.imgHeight,
  )

  // color
  styleClasses.push(
    config.value.tagOptions.card?.color,
  )

  // rounded
  styleClasses.push(
    config.value.tagOptions.card?.imgRounded,
  )

  // aspect ratio
  styleClasses.push(
    config.value.tagOptions.card?.imageAspect,
  )

  return styleClasses.join(' ')
})

const cardImgIconStyle = computed(() => {
  const styleClasses: string[] = []

  // color
  styleClasses.push(
    config.value.tagOptions.card?.imgIconColor,
  )

  // size
  styleClasses.push(
    config.value.tagOptions.card?.imgIconSize,
  )

  return styleClasses.join(' ')
})

const cardHeadingStyle = computed(() => {
  const styleClasses: string[] = ['mx-3']

  // animation
  styleClasses.push(config.value.animationClass)

  // line height
  styleClasses.push(
    config.value.tagOptions.card?.headingHeight,
  )

  // color
  styleClasses.push(
    config.value.tagOptions.card?.color,
  )

  // rounded
  styleClasses.push(
    config.value.tagOptions.card?.headingRounded,
  )

  return styleClasses.join(' ')
})
</script>
