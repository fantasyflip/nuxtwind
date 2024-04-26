<template>
  <div>
    <ULandingCard class="h-full">
      <h2 class="font-bold text-xl -mt-6 mb-0">
        {{ title }}
      </h2>
      <div class="py-4 w-full flex justify-center items-center h-full">
        <ContentSlot :use="$slots.default" unwrap="p">
          Mockup
        </ContentSlot>
      </div>
    </ULandingCard>
  </div>
</template>

<script setup lang=ts>
export interface Props {
  title: string,
  new: boolean;
}
  
const props = withDefaults(defineProps<Props>(), {
  title: 'Component',
  new:false
})
</script>