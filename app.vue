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
        :key="item.id"
        :id="item.id"
        :type="item.type"
        :title="item.title"
        :message="item.message"
        :auto-close="item.autoClose"
        :duration="item.duration"
        :icon="item.icon"
        @close="
          () => {
            removeToast(item.id);
          }
        "
      />
    </transition-group>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
const route = useRoute();
const { locale } = useI18n();
watch(
  () => route.params.locale,
  (newLocale, oldLocale) => {
    if (newLocale !== oldLocale) {
      locale.value = newLocale;
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
  link: [{ rel: "icon", type: "image/png", href: "/favicon.png" }],
});

const { toasts, removeToast, stopBodyOverflow, allowBodyOverflow } = useToast();

const { data } = useBroadcastChannel("broadcast");

watch(data, (newData) => {
  if (newData && newData.type === "toast" && newData.payload) {
    if (newData.method === "create" && !document.hidden) {
      useToast(newData.payload, false);
    }

    if (newData.method === "remove") {
      removeToast(newData.payload);
    }
  }

  if (newData && newData.type === "theme") {
    if (newData.method === "cycle") {
      useNuxtApp().$cycleTheme(document.hidden);
    }
  }

  if (newData && newData.type === "locale") {
    if (newData.method === "switch") {
      useNuxtApp().$switchLocale(document.hidden);
    }
  }
});
</script>

<style>
html {
  overflow: auto;

  user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  -o-user-select: none;
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
