<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <NXW-Tooltip
      :color="{
        bgPointer: 'text-red-500 dark:text-red-500',
      }"
      bottom
    >
      <NXW-Button>Button</NXW-Button>

      <template #tooltip>
        Click me!
      </template>
    </NXW-Tooltip>
  </div>
</template>
