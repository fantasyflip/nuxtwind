<template>
  <div class="w-full">
    {{ name }}

    <component :is="name"/>

    <component :is="name">
      <ContentSlot :use="$slots.default" unwrap="p" />
    </component>
    <div>
      <ContentSlot :use="$slots.default" unwrap="p" />
    </div>
  </div>
</template>
  
  <script lang="ts" setup>
  export interface Props {
    name: string,
    new: boolean;
  }
  
  const props = withDefaults(defineProps<Props>(), {
      new:false
  })
  </script>