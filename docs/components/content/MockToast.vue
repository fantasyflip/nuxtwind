<template>
  <div class="h-16 w-4/5 bg-gradient-to-tr dark:from-white/20 dark:to-white/5 from-black/15 to-black/5 rounded-md overflow-hidden">
    <div class="items-center flex h-[58px] gap-4">
      <div class="rounded-md size-7 bg-primary-500/60 ml-4 grid place-items-center">
        <UIcon
          name="i-mdi-information-outline"
          class="size-5 text-white/70"
        />
      </div>
      <div>
        <div class="font-semibold">
          NuxtWind Components
        </div>
        <div class="-mt-1 text-sm dark:text-white/60 text-black/50">
          Successfully installed!
        </div>
      </div>
    </div>
    <div>
      <div class="h-[6px] w-2/3 bg-primary-500/60 rounded-r-md" />
      <div class="h-[6px] w-1/3 bg-white/10" />
    </div>
  </div>
</template>
