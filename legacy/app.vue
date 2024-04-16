<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <div
    class="fixed z-[100] bottom-2 bottom-2 px-1 sm:right-2 lg:w-96 sm:w-72 w-full sm:max-h-full max-h-96"
  >
    <transition-group
      name="toast-notification"
      tag="div"
      class="flex flex-col-reverse gap-3 w-full"
      @before-enter="stopBodyOverflow"
      @after-enter="allowBodyOverflow"
      @before-leave="stopBodyOverflow"
      @after-leave="allowBodyOverflow"
    >
      <Toast
        v-for="item in toasts"
        :id="item.id"
        :key="item.id"
        :type="item.type"
        :title="item.title"
        :message="item.message"
        :auto-close="item.autoClose"
        :duration="item.duration"
        :icon="item.icon"
        @close="
          () => {
            removeToast({
              id: item.id,
            });
          }
        "
      />
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import Toast from "./module/src/runtime/components/Toast.vue";
import type { Toast as ToastType } from "./composables/Toast";
import { useI18n } from "vue-i18n";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "./tailwind.config.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tw = resolveConfig(tailwindConfig as any) as any;

const config = useRuntimeConfig();

defineRobotMeta();

const route = useRoute();
const { locale } = useI18n();
watch(
  () => route.params.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      locale.value = newLocale as string;
    }
  },
  { immediate: true }
);

watch(
  () => useRoute().path,
  (newPath, oldPath) => {
    if (newPath !== oldPath) {
      let canonical = config.public.siteUrl + newPath;
      useHead({
        link: [
          {
            rel: "canonical",
            href: canonical,
          },
        ],
      });
    }
  },
  { immediate: true }
);

useHead({
  bodyAttrs: {
    class: "dark:bg-zinc-900 dark:text-white",
  },
  htmlAttrs: {
    lang: locale.value,
    style: "scroll-behavior: smooth;",
  },
  titleTemplate: "%s | NuxtWind",
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.png" },
    {
      rel: "apple-touch-icon",
      type: "image/png",
      href: "/apple-touch-icon.png",
    },
  ],
  meta: [
    {
      name: "theme-color",
      content: tw.theme.colors.primary[800],
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: "NuxtWind",
    },
  ],
});

const { toasts, removeToast, stopBodyOverflow, allowBodyOverflow } = useToast();

const { data } = useBroadcastChannel({
  name: "broadcast",
});
watch(data, (newData) => {
  const broadcastData = newData as {
    type: string;
    method: string;
    payload: ToastType;
  };
  if (
    broadcastData &&
    broadcastData.type === "toast" &&
    broadcastData.payload
  ) {
    if (broadcastData.method === "create" && !document.hidden) {
      useToast(broadcastData.payload, false);
    }

    if (broadcastData.method === "remove") {
      removeToast(broadcastData.payload);
    }
  }

  if (broadcastData && broadcastData.type === "theme") {
    if (broadcastData.method === "cycle") {
      useNuxtApp().$cycleTheme(document.hidden);
    }
  }

  if (broadcastData && broadcastData.type === "locale") {
    if (broadcastData.method === "switch") {
      useNuxtApp().$switchLocale(document.hidden);
    }
  }
});
</script>

<style>
html {
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0.625em;
}

::-webkit-scrollbar-thumb {
  background: theme("colors.primary.800");
}

::-webkit-scrollbar-thumb:hover {
  background: theme("colors.secondary.700");
}
</style>

<style lang="scss">
.toast-notification-enter-active {
  animation: toast-fade-in 0.5s ease-in-out;
}
.toast-notification-leave-active {
  animation: toast-fade-in 0.5s ease-in-out reverse;
}

@keyframes toast-fade-in {
  from {
    opacity: 0;
    transform: scale(0.4);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
