<template>
  <div class="flex gap-2 h-screen items-center justify-center">
    <NXW-Button
      v-for="component in components"
      :key="component.name"
      :link="component.path"
    >
      {{ component.name }}
    </NXW-Button>
  </div>
</template>

<script setup lang="ts">
const components = [
  {
    name: 'Appbar',
    path: '/appbar',
  },
  {
    name: 'Badge',
    path: '/badge',
  },
  {
    name: 'Button',
    path: '/button',
  },
  {
    name: 'Carousel',
    path: '/carousel',
  },
  {
    name: 'Checkbox',
    path: '/checkbox',
  },
  {
    name: 'CheckboxGroup',
    path: '/checkboxgroup',
  },
  {
    name: 'Drawer',
    path: '/drawer',
  },
  {
    name: 'Progress',
    path: '/progress',
  },
  {
    name: 'Select',
    path: '/select',
  },
  {
    name: 'Skeleton',
    path: '/skeleton',
  },
  {
    name: 'Slider',
    path: '/slider',
  },
  {
    name: 'Textarea',
    path: '/textarea',
  },
  {
    name: 'Textfield',
    path: '/textfield',
  },
  {
    name: 'Toast',
    path: '/toast',
  },
  {
    name: 'Tooltip',
    path: '/tooltip',
  },
]
</script>
