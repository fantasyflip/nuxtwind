<template>
  <div
    class="grid h-screen w-screen place-items-center bg-green-100 text-black dark:bg-black dark:text-white"
  >
    <div class="mx-auto w-3/5">
      <div class="flex w-full items-center justify-center gap-4">
        <svg
          width="61"
          height="42"
          viewBox="0 0 61 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.9869 41.2211H56.412C57.1243 41.2212 57.824 41.0336 58.4408 40.6772C59.0576 40.3209 59.5698 39.8083 59.9258 39.191C60.2818 38.5737 60.469 37.8736 60.4687 37.1609C60.4684 36.4482 60.2805 35.7482 59.924 35.1313L44.864 9.03129C44.508 8.41416 43.996 7.90168 43.3793 7.54537C42.7626 7.18906 42.063 7.00147 41.3509 7.00147C40.6387 7.00147 39.9391 7.18906 39.3225 7.54537C38.7058 7.90168 38.1937 8.41416 37.8377 9.03129L33.9869 15.7093L26.458 2.65061C26.1018 2.03354 25.5895 1.52113 24.9726 1.16489C24.3557 0.808639 23.656 0.621094 22.9438 0.621094C22.2316 0.621094 21.5318 0.808639 20.915 1.16489C20.2981 1.52113 19.7858 2.03354 19.4296 2.65061L0.689224 35.1313C0.332704 35.7482 0.144842 36.4482 0.144532 37.1609C0.144222 37.8736 0.331476 38.5737 0.687459 39.191C1.04344 39.8083 1.5556 40.3209 2.17243 40.6772C2.78925 41.0336 3.48899 41.2212 4.20126 41.2211H18.2778C23.8551 41.2211 27.9682 38.7699 30.7984 33.9876L37.6694 22.0813L41.3498 15.7093L52.3951 34.8492H37.6694L33.9869 41.2211ZM18.0484 34.8426L8.2247 34.8404L22.9504 9.32211L30.2979 22.0813L25.3784 30.6092C23.4989 33.7121 21.3637 34.8426 18.0484 34.8426Z"
            fill="#00DC82"
            data-v-inspector="node_modules/.pnpm/@nuxt+ui-templates@1.3.1/node_modules/@nuxt/ui-templates/dist/templates/welcome.vue:40:423"
            data-v-5186e9ca=""
          ></path>
        </svg>
        <span class="pb-3 text-7xl font-extralight text-gray-500">/</span>
        <a href="https://github.com/fantasyflip" target="_blank">
          <img
            src="https://github.com/fantasyflip.png"
            alt="FantasyFlip-Image"
            class="size-16 rounded-full border-2 border-[#00DC82]"
          />
        </a>
      </div>
      <h1 class="pb-16 pt-6 text-center text-5xl font-bold">
        Welcome to Nuxt-Basic Starter!
      </h1>
      <div
        id="background-gradient"
        ref="GetStartedCard"
        :style="getStartedWrapperStyle"
        class="group relative isolate flex size-full flex-1 flex-col rounded-md before:absolute before:-inset-px before:z-[-1] before:hidden before:size-[calc(100%+2px)] before:rounded-[8px] after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:size-[calc(100%-1px)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md before:lg:block"
      >
        <!-- test {{ elementX }} -->
        <div
          class="relative flex w-full flex-col items-center gap-3 rounded-lg bg-gradient-to-br from-white to-green-200 p-6 dark:from-zinc-900 dark:to-zinc-950"
        >
          <div
            class="absolute -top-10 rounded-full border-2 border-[#00DC82] bg-gradient-to-br from-white to-green-200 p-6 dark:from-zinc-900 dark:to-zinc-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              class="size-8"
            >
              <path
                fill="currentColor"
                d="m2.45 10.575l4.2-4.2q.35-.35.825-.5t.975-.05l1.3.275Q8.4 7.7 7.625 9t-1.5 3.15zm5.125 2.275q.575-1.8 1.563-3.4t2.387-3q2.2-2.2 5.025-3.287t5.275-.663q.425 2.45-.65 5.275T17.9 12.8q-1.375 1.375-3 2.388t-3.425 1.587zm6.9-3q.575.575 1.413.575T17.3 9.85q.575-.575.575-1.412T17.3 7.025q-.575-.575-1.412-.575t-1.413.575Q13.9 7.6 13.9 8.438t.575 1.412m-.7 12.025l-1.6-3.675q1.85-.725 3.163-1.5t2.912-2.125l.25 1.3q.1.5-.05.988t-.5.837zM4.05 16.05q.875-.875 2.125-.888t2.125.863q.875.875.875 2.125T8.3 20.275q-.625.625-2.087 1.075t-4.038.8q.35-2.575.8-4.025T4.05 16.05"
              />
            </svg>
          </div>
          <h2 class="pt-6 text-2xl font-semibold">Get started</h2>
          <p class="mb-2 text-start text-black/70 dark:text-white/70">
            Remove this welcome page by replacing
            <span
              class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
              >&lt;TemplateWelcome /&gt;</span
            >
            in
            <a
              href="https://nuxt.com/docs/guide/directory-structure/app"
              target="_blank"
              rel="noopener"
              class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
              >pages/index.vue</a
            >
            with your own code.
            <br />
            This Repository contains features like i18n, open graph protocol,
            theme-switching, TailwindCSS, VueUse and eslint support out of the
            box.
          </p>
        </div>
      </div>
      <div class="flex gap-5 pt-5">
        <div class="flex w-2/3 flex-col gap-5">
          <div
            id="background-gradient2"
            ref="I18nCard"
            :style="I18nWrapperStyle"
            class="group relative isolate flex size-full flex-1 flex-col rounded-md before:absolute before:-inset-px before:z-[-1] before:hidden before:size-[calc(100%+2px)] before:rounded-[8px] after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:size-[calc(100%-1px)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md before:lg:block"
          >
            <div
              class="flex rounded-lg bg-gradient-to-br from-white to-green-200 p-6 dark:from-zinc-900 dark:to-zinc-950"
            >
              <div class="grid w-1/6 place-items-center pr-4">
                <svg
                  viewBox="0 0 24 24"
                  width="1.2em"
                  height="1.2em"
                  data-v-e7c577cc=""
                  class="size-12"
                >
                  <path
                    fill="currentColor"
                    d="m12.87 15.07l-2.54-2.51l.03-.03A17.52 17.52 0 0 0 14.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z"
                  ></path>
                </svg>
              </div>
              <div class="w-4/6">
                <h3 class="text-xl font-semibold">Nuxt-i18n</h3>
                <p class="text-black/70 dark:text-white/70">
                  This Template has
                  <a
                    href="https://i18n.nuxtjs.org/"
                    target="_blank"
                    class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                    >@nuxtjs/i18n</a
                  >
                  integrated and already configured for the languages
                  <span
                    class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                    >de-DE</span
                  >
                  and
                  <span
                    class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                    >en-US</span
                  >.
                </p>
              </div>
              <div class="grid h-full w-1/6 place-items-center">
                <NuxtLink
                  v-for="(loc, index) in availableLocales"
                  :key="index"
                  :to="
                    switchLocalePath(typeof loc === 'string' ? loc : loc.code)
                  "
                  class="flex size-fit cursor-pointer items-center justify-center rounded-md bg-[#00DC82] p-2 text-sm text-black shadow-md transition-all duration-300 ease-in-out hover:text-black hover:shadow-[0_0px_15px_2px] hover:shadow-[#00DC82] dark:bg-[#00DC82]"
                  ><div class="relative">
                    <div
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <!---->
                    </div>
                    <div class="">
                      {{ typeof loc === "string" ? loc : loc.name }}
                    </div>
                  </div></NuxtLink
                >
              </div>
            </div>
          </div>
          <div
            id="background-gradient3"
            ref="ColorModeCard"
            :style="ColorModeWrapperStyle"
            class="group relative isolate flex size-full flex-1 flex-col rounded-md before:absolute before:-inset-px before:z-[-1] before:hidden before:size-[calc(100%+2px)] before:rounded-[8px] after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:size-[calc(100%-1px)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md before:lg:block"
          >
            <div
              class="flex rounded-lg bg-gradient-to-br from-white to-green-200 p-6 dark:from-zinc-900 dark:to-zinc-950"
            >
              <div class="grid w-1/6 place-items-center pr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  class="size-12"
                >
                  <path
                    fill="currentColor"
                    d="M7.5 2c-1.79 1.15-3 3.18-3 5.5s1.21 4.35 3.03 5.5C4.46 13 2 10.54 2 7.5A5.5 5.5 0 0 1 7.5 2m11.57 1.5l1.43 1.43L4.93 20.5L3.5 19.07L19.07 3.5m-6.18 2.43L11.41 5L9.97 6l.42-1.7L9 3.24l1.75-.12l.58-1.65L12 3.1l1.73.03l-1.35 1.13l.51 1.67m-3.3 3.61l-1.16-.73l-1.12.78l.34-1.32l-1.09-.83l1.36-.09l.45-1.29l.51 1.27l1.36.03l-1.05.87l.4 1.31M19 13.5a5.5 5.5 0 0 1-5.5 5.5c-1.22 0-2.35-.4-3.26-1.07l7.69-7.69c.67.91 1.07 2.04 1.07 3.26m-4.4 6.58l2.77-1.15l-.24 3.35l-2.53-2.2m4.33-2.7l1.15-2.77l2.2 2.54l-3.35.23m1.15-4.96l-1.14-2.78l3.34.24l-2.2 2.54M9.63 18.93l2.77 1.15l-2.53 2.19l-.24-3.34Z"
                  />
                </svg>
              </div>
              <div class="w-4/6">
                <h3 class="text-xl font-semibold">Color-Mode</h3>
                <p class="text-black/70 dark:text-white/70">
                  The
                  <a
                    href="https://color-mode.nuxtjs.org/"
                    target="_blank"
                    class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                    >@nuxtjs/color-mode</a
                  >
                  is preconfigured and integrated for the use with TailwindCSS.
                </p>
              </div>
              <div class="grid h-full w-1/6 place-items-center">
                <div
                  class="flex size-fit cursor-pointer items-center justify-center rounded-md bg-[#00DC82] p-2 text-sm text-black shadow-md transition-all duration-300 ease-in-out hover:text-black hover:shadow-[0_0px_15px_2px] hover:shadow-[#00DC82] dark:bg-[#00DC82]"
                  @click="
                    $colorMode.value === 'dark'
                      ? ($colorMode.value = 'light')
                      : ($colorMode.value = 'dark')
                  "
                >
                  <div class="relative">
                    <div
                      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                      <!---->
                    </div>
                    <div class="">
                      {{ $colorMode.value === "dark" ? "Light" : "Dark" }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          id="background-gradient4"
          ref="DevExperienceCard"
          :style="DevExperienceWrapperStyle"
          class="group relative isolate flex size-full w-1/3 flex-1 flex-col rounded-md before:absolute before:-inset-px before:z-[-1] before:hidden before:size-[calc(100%+2px)] before:rounded-[8px] after:absolute after:left-1/2 after:top-1/2 after:z-[-1] after:size-[calc(100%-1px)] after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-md before:lg:block"
        >
          <div
            class="flex size-full flex-col rounded-lg bg-gradient-to-br from-white to-green-200 p-6 dark:from-zinc-900 dark:to-zinc-950"
          >
            <h3 class="text-xl font-semibold">DEV-Experience</h3>
            <p class="text-black/70 dark:text-white/70">
              For the ease of development, this template comes with eslint,
              TailwindCSS and
              <a
                href="https://nuxtseo.com/og-image/getting-started/installation"
                target="_blank"
                class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                >OG-Image</a
              >
              preconfigured and includes the
              <a
                href="https://vueuse.org/"
                target="_blank"
                class="rounded bg-gray-100 p-1 font-mono font-bold text-[#00DC82] dark:bg-white/10"
                >VueUse</a
              >-Library.
            </p>
            <div
              class="flex w-full grow items-center justify-center gap-8 pt-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="size-20"
              >
                <path
                  fill="currentColor"
                  d="m7.95 9.55l3.89-2.25c.1-.05.22-.05.32 0l3.89 2.25c.1.06.16.16.16.27v4.5c0 .11-.06.21-.16.27l-3.89 2.25a.36.36 0 0 1-.32 0l-3.89-2.25a.315.315 0 0 1-.16-.27v-4.5c0-.11.06-.21.16-.27m14.17 2.05c.17.29.17.63 0 .93l-4.65 8.03c-.17.3-.47.44-.82.44h-9.3c-.35 0-.65-.15-.82-.44l-4.65-8.03a.949.949 0 0 1 0-.95L6.53 3.5c.17-.28.47-.5.82-.5h9.3c.35 0 .65.22.82.5l4.65 8.1m-3.85 3.9V8.65c0-.12-.07-.23-.18-.29l-5.93-3.41a.325.325 0 0 0-.33 0L5.91 8.36c-.11.06-.18.17-.18.29v6.85c0 .11.07.22.18.28l5.93 3.41c.1.06.23.06.33 0l5.92-3.41a.33.33 0 0 0 .18-.28Z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29.58"
                height="32"
                viewBox="0 0 256 277"
                class="size-20"
              >
                <path
                  fill="#35495E"
                  d="M202.968 0v148.146c0 41.405-33.563 74.967-74.968 74.967s-74.968-33.562-74.968-74.967V0h53.036v148.146a21.932 21.932 0 1 0 43.864 0V0z"
                />
                <path
                  fill="#41B883"
                  d="M256 0v148.146c0 70.694-57.306 128.019-128 128.019S0 218.84 0 148.145V0h53.032v148.146c0 41.405 33.566 74.967 74.968 74.967s74.968-33.562 74.968-74.967V0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                class="size-20"
              >
                <path
                  fill="currentColor"
                  d="M12 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.31.74 1.91 1.35c.98 1 2.09 2.15 4.59 2.15c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12Z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: "Index",
});

const { locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => {
    if (typeof i === "string") return i;
    return i.code !== locale.value;
  });
});

const GetStartedCard = ref(null);
const { elementX, elementY } = useMouseInElement(GetStartedCard);

const getStartedWrapperStyle = computed(() => {
  return {
    "--x": `${elementX.value}px`,
    "--y": `${elementY.value}px`,
  };
});

const I18nCard = ref(null);
const { elementX: I18nX, elementY: I18nY } = useMouseInElement(I18nCard);

const I18nWrapperStyle = computed(() => {
  return {
    "--translateX": `${I18nX.value}px`,
    "--translateY": `${I18nY.value}px`,
  };
});

const ColorModeCard = ref(null);
const { elementX: ColorModeX, elementY: ColorModeY } =
  useMouseInElement(ColorModeCard);

const ColorModeWrapperStyle = computed(() => {
  return {
    "--colorX": `${ColorModeX.value}px`,
    "--colorY": `${ColorModeY.value}px`,
  };
});

const DevExperienceCard = ref(null);
const { elementX: DevExperienceX, elementY: DevExperienceY } =
  useMouseInElement(DevExperienceCard);

const DevExperienceWrapperStyle = computed(() => {
  return {
    "--devX": `${DevExperienceX.value}px`,
    "--devY": `${DevExperienceY.value}px`,
  };
});
</script>

<style scoped>
#background-gradient::before {
  background: radial-gradient(
    150px circle at var(--x) var(--y),
    #00dc82 0%,
    transparent 100%
  );
  will-change: background;
}
#background-gradient2::before {
  background: radial-gradient(
    150px circle at var(--translateX) var(--translateY),
    #00dc82 0%,
    transparent 100%
  );
  will-change: background;
}
#background-gradient3::before {
  background: radial-gradient(
    150px circle at var(--colorX) var(--colorY),
    #00dc82 0%,
    transparent 100%
  );
  will-change: background;
}
#background-gradient4::before {
  background: radial-gradient(
    150px circle at var(--devX) var(--devY),
    #00dc82 0%,
    transparent 100%
  );
  will-change: background;
}
</style>
