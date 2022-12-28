<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="lg:w-2/3 lg:h-2/3 w-9/10 bg-gray-200 dark:bg-zinc-800">
          <div class="w-full h-full relative">
            <Drawer
              v-model="showDrawer"
              absolute
              height="h-full"
              :color="{
                bg: 'bg-gray-200 dark:bg-zinc-800',
              }"
              expand-on-hover
              z-index="z-[99]"
            >
              <!-- https://medium.com/@9cv9official/create-a-beautiful-hover-triggered-expandable-sidebar-with-simple-html-css-and-javascript-9f5f80a908d1 -->
              <Appbar :color="{ bg: 'dark:bg-zinc-600 bg-gray-400' }">
                <div class="w-full h-full grid place-items-center">Drawer</div>
              </Appbar>
              <div
                v-for="item in drawerItems"
                :key="item.name"
                :class="
                  (item.name === 'Logout' ? 'fixed bottom-1' : '') +
                  ' w-full flex h-12 hover:bg-primary-800 cursor-pointer'
                "
                @click="
                  useToast({
                    title: 'Example Drawer Notification',
                    message: 'You clicked on ' + item.name + '!',
                    autoClose: true,
                    type: 'info',
                  })
                "
              >
                <div
                  class="h-full grid place-items-center text-xl"
                  :id="'icon-' + item.name"
                >
                  <component class="w-12" :is="item.icon" />
                </div>
                <div class="h-full grid content-center">
                  {{ item.name }}
                </div>
              </div>
            </Drawer>
            <Appbar
              navigation-icon
              @navigation-icon-click="showDrawer = true"
              absolute
              :color="{ bg: 'dark:bg-zinc-600 bg-gray-400' }"
            >
              <div class="w-full h-full grid place-items-center">
                Application-Bar
              </div>
            </Appbar>
          </div>
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2"></div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
          :events="events"
          :caveats="caveats"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import MdiHome from "~icons/mdi/home";
import MdiCog from "~icons/mdi/cog";
import MdiLogout from "~icons/mdi/logout";
import MdiPhone from "~icons/mdi/phone";

import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND

let showDrawer = ref(false);

let drawerItems = [
  {
    name: "Home",
    icon: MdiHome,
  },
  {
    name: "Settings",
    icon: MdiCog,
  },
  {
    name: "Logout",
    icon: MdiLogout,
  },
  {
    name: "Phone",
    icon: MdiPhone,
  },
];

//DOCUMENTATION
let componentName = "Drawer";

let props = [];

let events = [];

let slots = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
