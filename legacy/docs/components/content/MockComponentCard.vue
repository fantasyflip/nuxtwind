<template>
  <NuxtLink
    :to="link"
    class="border-b-0"
  >
    <ULandingCard class="h-full cursor-pointer">
      <div class="-mt-4">
        <div class="flex justify-between items-start ">
          <h2 class="font-bold text-xl mt-0  mb-0">
            {{ title }}
          </h2>
          <UBadge
            v-if="props.new"
            label="new"
            variant="subtle"
            class="mb-0.5"
          />
        </div>
        <div class="py-4 w-full flex justify-center items-center h-full">
          <ContentSlot
            :use="$slots.default"
            unwrap="p"
          >
            Mockup
          </ContentSlot>
        </div>
      </div>
    </ULandingCard>
  </NuxtLink>
</template>

<script setup lang=ts>
export interface Props {
  title?: string
  new?: boolean
  link: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Component',
  new: false,
})
</script>
