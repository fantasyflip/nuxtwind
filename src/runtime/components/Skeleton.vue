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
          v-for="index in props.tagOptions.p?.lines"
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
            v-for="index in props.tagOptions.article?.lines"
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

export interface Props {
  // eslint-disable-next-line vue/no-required-prop-with-default
  loading: boolean
  tag?: string
  autoDetectRootTag?: boolean
  animationClass?: string
  tagOptions?: {
    p?: {
      lines?: number
      lineHeight?: string
      color?: string
      rounded?: string
      gap?: string
    }
    article?: {
      lines?: number
      lineHeight?: string
      headingHeight?: string
      color?: string
      gap?: string
      headingGap?: string
      rounded?: string
      headingRounded?: string
    }
    img?: {
      width?: string
      height?: string
      rounded?: string
      color?: string
      iconColor?: string
      iconSize?: string
    }
    card?: {
      imgHeight?: string
      headingHeight?: string
      imgRounded?: string
      headingRounded?: string
      imgIconColor?: string
      imgIconSize?: string
      imageAspect?: string
      color?: string
      gap?: string
    }
  }
}

const defaults = {
  loading: true,
  tag: 'p',
  autoDetectRootTag: true,
  animationClass: 'animate-pulse',
  tagOptions: {
    p: {
      lines: 3,
      lineHeight: 'h-4',
      color: 'dark:bg-zinc-700 bg-zinc-200',
      rounded: 'rounded-3xl',
      gap: 'gap-2',
    },
    article: {
      lines: 5,
      lineHeight: 'h-4',
      headingHeight: 'h-6',
      color: 'dark:bg-zinc-700 bg-zinc-200',
      gap: 'gap-2',
      headingGap: 'gap-5',
      rounded: 'rounded-3xl',
      headingRounded: 'rounded-lg',
    },
    img: {
      width: 'w-full',
      height: 'h-full min-h-40',
      rounded: 'rounded',
      color: 'bg-zinc-800',
      iconColor: 'text-zinc-600',
      iconSize: 'size-10',
    },
    card: {
      imgHeight: 'h-full min-h-40',
      headingHeight: 'h-6',
      imgRounded: 'rounded',
      headingRounded: 'rounded-lg',
      imgIconColor: 'text-zinc-600',
      imgIconSize: 'size-10',
      imageAspect: 'aspect-video',
      color: 'bg-zinc-800',
      gap: 'gap-4',
    },
  },
}

const props = withDefaults(defineProps<Props>(), {
  loading: true,
  tag: 'p',
  autoDetectRootTag: true,
  animationClass: 'animate-pulse',
  tagOptions: () => {
    return {
      p: {
        lines: 3,
        lineHeight: 'h-4',
        color: 'dark:bg-zinc-700 bg-zinc-200',
        rounded: 'rounded-3xl',
        gap: 'gap-2',
      },
      article: {
        lines: 5,
        lineHeight: 'h-4',
        headingHeight: 'h-6',
        color: 'dark:bg-zinc-700 bg-zinc-200',
        gap: 'gap-2',
        headingGap: 'gap-5',
        rounded: 'rounded-3xl',
        headingRounded: 'rounded-lg',
      },
      img: {
        width: 'w-full',
        height: 'h-full min-h-40',
        rounded: 'rounded',
        color: 'bg-zinc-800',
        iconColor: 'text-zinc-600',
        iconSize: 'size-10',
      },
      card: {
        imgHeight: 'h-full min-h-40',
        headingHeight: 'h-6',
        imgRounded: 'rounded',
        headingRounded: 'rounded-lg',
        imgIconColor: 'text-zinc-600',
        imgIconSize: 'size-10',
        imageAspect: 'aspect-video',
        color: 'bg-zinc-800',
        gap: 'gap-4',
      },
    }
  },
})

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
  if (!props.loading) {
    return false
  }

  if (props.autoDetectRootTag && slotRootTag.value) {
    return slotRootTag.value?.toLocaleLowerCase() === tag.toLocaleLowerCase()
  }
  else {
    return props.tag.toLocaleLowerCase() === tag.toLocaleLowerCase()
  }
}

// p Tag styles
const pStyle = computed(() => {
  const styleClasses = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(props.tagOptions.p?.gap ?? defaults.tagOptions.p.gap)

  return styleClasses.join(' ')
})

function pItemStyle(index: number) {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(props.animationClass)

  // line width
  if (index == props.tagOptions.p?.lines && props.tagOptions.p?.lines > 1) {
    styleClasses.push('w-2/3')
  }
  else {
    styleClasses.push('w-full')
  }

  // line height
  styleClasses.push(
    props.tagOptions.p?.lineHeight ?? defaults.tagOptions.p.lineHeight,
  )

  // color
  styleClasses.push(props.tagOptions.p?.color ?? defaults.tagOptions.p.color)

  // rounded
  styleClasses.push(
    props.tagOptions.p?.rounded ?? defaults.tagOptions.p.rounded,
  )

  return styleClasses.join(' ')
}

// article Tag Styles
const articleWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(
    props.tagOptions.article?.headingGap
    ?? defaults.tagOptions.article.headingGap,
  )

  return styleClasses.join(' ')
})

const articleHeadingStyle = computed(() => {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(props.animationClass)

  // line height
  styleClasses.push(
    props.tagOptions.article?.headingHeight
    ?? defaults.tagOptions.article.headingHeight,
  )

  // color
  styleClasses.push(
    props.tagOptions.article?.color ?? defaults.tagOptions.article.color,
  )

  // rounded
  styleClasses.push(
    props.tagOptions.article?.headingRounded
    ?? defaults.tagOptions.article.headingRounded,
  )

  return styleClasses.join(' ')
})

const articlePWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(
    props.tagOptions.article?.gap ?? defaults.tagOptions.article.gap,
  )

  return styleClasses.join(' ')
})

function articlePItemStyle(index: number) {
  const styleClasses: string[] = []

  // animation
  styleClasses.push(props.animationClass)

  // line width
  if (
    index == props.tagOptions.article?.lines
    && props.tagOptions.article?.lines > 1
  ) {
    styleClasses.push('w-2/3')
  }
  else {
    styleClasses.push('w-full')
  }

  // line height
  styleClasses.push(
    props.tagOptions.article?.lineHeight
    ?? defaults.tagOptions.article.lineHeight,
  )

  // color
  styleClasses.push(
    props.tagOptions.article?.color ?? defaults.tagOptions.article.color,
  )

  // rounded
  styleClasses.push(
    props.tagOptions.article?.rounded ?? defaults.tagOptions.article.rounded,
  )

  return styleClasses.join(' ')
}

// img Tag Styles
const imgWrapperStyle = computed(() => {
  const styleClasses = ['flex', 'items-center', 'justify-center']

  // animation
  styleClasses.push(props.animationClass)

  // width
  styleClasses.push(
    props.tagOptions.img?.width ?? defaults.tagOptions.img.width,
  )

  // height
  styleClasses.push(
    props.tagOptions.img?.height ?? defaults.tagOptions.img.height,
  )

  // color
  styleClasses.push(
    props.tagOptions.img?.color ?? defaults.tagOptions.img.color,
  )

  // rounded
  styleClasses.push(
    props.tagOptions.img?.rounded ?? defaults.tagOptions.img.rounded,
  )

  return styleClasses.join(' ')
})

const imgIconStyle = computed(() => {
  const styleClasses: string[] = []

  // color
  styleClasses.push(
    props.tagOptions.img?.iconColor ?? defaults.tagOptions.img.iconColor,
  )

  // size
  styleClasses.push(
    props.tagOptions.img?.iconSize ?? defaults.tagOptions.img.iconSize,
  )

  return styleClasses.join(' ')
})

// card Tag Styles
const cardWrapperStyle = computed(() => {
  const styleClasses: string[] = ['w-full', 'flex', 'flex-col']

  // line gap
  styleClasses.push(props.tagOptions.card?.gap ?? defaults.tagOptions.card.gap)

  return styleClasses.join(' ')
})

const cardImageWrapperStyle = computed(() => {
  const styleClasses: string[] = ['flex', 'items-center', 'justify-center']

  // animation
  styleClasses.push(props.animationClass)

  // height
  styleClasses.push(
    props.tagOptions.card?.imgHeight ?? defaults.tagOptions.card.imgHeight,
  )

  // color
  styleClasses.push(
    props.tagOptions.card?.color ?? defaults.tagOptions.card.color,
  )

  // rounded
  styleClasses.push(
    props.tagOptions.card?.imgRounded ?? defaults.tagOptions.card.imgRounded,
  )

  // aspect ratio
  styleClasses.push(
    props.tagOptions.card?.imageAspect ?? defaults.tagOptions.card.imageAspect,
  )

  return styleClasses.join(' ')
})

const cardImgIconStyle = computed(() => {
  const styleClasses: string[] = []

  // color
  styleClasses.push(
    props.tagOptions.card?.imgIconColor
    ?? defaults.tagOptions.card.imgIconColor,
  )

  // size
  styleClasses.push(
    props.tagOptions.card?.imgIconSize ?? defaults.tagOptions.card.imgIconSize,
  )

  return styleClasses.join(' ')
})

const cardHeadingStyle = computed(() => {
  const styleClasses: string[] = ['mx-3']

  // animation
  styleClasses.push(props.animationClass)

  // line height
  styleClasses.push(
    props.tagOptions.card?.headingHeight
    ?? defaults.tagOptions.card.headingHeight,
  )

  // color
  styleClasses.push(
    props.tagOptions.card?.color ?? defaults.tagOptions.card.color,
  )

  // rounded
  styleClasses.push(
    props.tagOptions.card?.headingRounded
    ?? defaults.tagOptions.card.headingRounded,
  )

  return styleClasses.join(' ')
})
</script>
