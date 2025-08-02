<template>
  <div>
    <NXW-Drawer
      v-model="drawerOpen"
      width="w-64"
      :expand-on-hover="false"
    >
      <div class="dark:text-white">
        Test-Drawer
      </div>
    </NXW-Drawer>
    <div class="flex flex-col items-center justify-center h-screen">
      <NXW-Button @click="drawerOpen = !drawerOpen">
        Toggle-Drawer
      </NXW-Button>
    </div>
  </div>
</template>

<script setup lang="ts">
const drawerOpen = ref(false)
</script>
