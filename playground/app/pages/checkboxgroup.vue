<template>
  <div class="flex gap-3 flex-col items-center justify-center h-screen">
    <NXW-Checkboxgroup
      v-model="modelValue"
      label="Checkboxgroup"
      description="This is a group of checkboxes. The returned value is an array of booleans."
      :items="items"
      width="w-fit"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = ref([false, true, false, false, false])
const items = ref([
  {
    label: 'Option 1',
    description: 'This is a checkbox with customized color.',
    color: {
      label: 'text-green-500 dark:text-green-500',
      description: 'text-green-400 dark:text-green-400',
    },
  },
  {
    label: 'Option 2',
    description:
      'This is a checkbox with long text.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. In atque quaerat temporibus aspernatur tempora culpa magni quis necessitatibus ducimus, error dolore, dolorem molestias esse nam amet vitae, maxime possimus sunt.',
  },
  {
    label: 'Option 3',
    description: 'This is a checkbox with loading state.',
    loading: true,
  },
  {
    label: 'Option 4',
    description: 'This is a disabled checkbox.',
    disabled: true,
  },
  {
    label: 'Option 5',
  },
])
</script>
