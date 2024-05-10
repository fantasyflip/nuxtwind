<template>
  <div class="w-4/5 flex ">
    <div class="w-2/3  h-32 bg-gradient-to-tr dark:from-white/20 dark:to-white/5 from-black/20 to-black/5 overflow-hidden rounded-l-md">
      <div class="h-10 flex items-center justify-center dark:bg-white/30 bg-black/20">
        My App
      </div>
      <div class="flex pl-2 items-center gap-2 py-1 border-b dark:border-white/15 border-black/10">
        <UIcon
          name="i-mdi-home"
          class="size-6 text-primary-500"
        />
        <div>
          Home
        </div>
      </div>
      <div class="flex pl-2 items-center gap-2 py-1 border-b dark:border-white/15 border-black/10">
        <UIcon
          name="i-mdi-account"
          class="size-6 text-primary-500"
        />
        <div>
          Account
        </div>
      </div>
      <div class="flex pl-2 items-center gap-2 py-1 border-b dark:border-white/15 border-black/10">
        <UIcon
          name="i-mdi-cog"
          class="size-6 text-primary-500"
        />
        <div>
          Settings
        </div>
      </div>
    </div>
    <div class="w-1/3 dark:bg-white/10 bg-black/20 relative overflow-hidden rounded-r-md">
      <div class="top-0 left-0 size-full bg-black/25 z-10 absolute" />
      <div class="h-10 flex items-center ">
        <span class="-ml-9 h-5 rounded-full w-14 bg-white/40" />
      </div>
      <div class="flex flex-col gap-1 pt-1">
        <div class="w-full bg-white/40 rounded-full h-3 -ml-5" />
        <div class="w-full bg-white/40 rounded-full h-3 -ml-6" />
        <div class="w-full bg-white/40 rounded-full h-3 -ml-7" />
        <div class="w-full bg-white/40 rounded-full h-3 -ml-5" />
        <div class="w-full bg-white/40 rounded-full h-3 -ml-9" />
      </div>
    </div>
  </div>
</template>
