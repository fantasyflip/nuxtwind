<template>
  <div class="flex flex-col gap-5 items-center justify-center h-screen">
    <div class="w-1/3">
      <NXW-Skeleton :loading="loading">
        <p class="dark:text-white">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius minima nihil excepturi necessitatibus voluptates doloremque dolorum reiciendis, ipsum sapiente fugiat aspernatur consectetur placeat facere mollitia similique maxime nisi fugit deserunt.
        </p>
      </NXW-Skeleton>
    </div>
    <NXW-Button @click="loading = !loading">
      Toggle Loading
    </NXW-Button>
  </div>
</template>

<script setup lang="ts">
const loading = ref(false)
</script>
