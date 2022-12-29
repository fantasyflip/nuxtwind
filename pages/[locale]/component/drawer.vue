<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div class="lg:w-2/3 lg:h-2/3 w-full h-80 bg-gray-200 dark:bg-zinc-800">
          <div class="w-full h-full relative">
            <Drawer
              v-model="showDrawer"
              absolute
              height="h-full"
              :color="{
                bg: 'bg-gray-200 dark:bg-zinc-800',
              }"
              z-index="z-[99]"
              :disable-overflow="checkedBoxes[0]"
              :expand-on-hover="checkedBoxes[1]"
              :overlay="checkedBoxes[2]"
              :no-mobile="checkedBoxes[3]"
              :right="checkedBoxes[4]"
            >
              <Appbar :color="{ bg: 'dark:bg-zinc-600 bg-gray-400' }">
                <div class="w-full h-full grid place-items-center">
                  {{ showDrawer ? "Drawer" : "" }}
                </div>
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
              :color="{ bg: 'dark:bg-zinc-600 bg-gray-400' }"
              absolute
            >
              <div class="w-full h-full grid place-items-center">
                Application-Bar
              </div>
            </Appbar>
            <div
              class="p-4 pt-16 text-justify text-ellipsis h-full"
              :class="
                checkedBoxes[1] ? (checkedBoxes[4] ? 'pr-14' : 'pl-14') : ''
              "
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              voluptas suscipit perspiciatis unde pariatur! Reiciendis quibusdam
              aut tempora at eveniet fugiat nemo, doloribus eum, dolore
              asperiores debitis modi, quisquam ab?
            </div>
          </div>
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
              :label="
                $t(
                  'pages.component.drawer.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.drawer.content.playground.checkboxgroup.description'
                )
              "
            />
          </div>
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

let checkedBoxes = ref([true, true, true, false, false]);

let toggleProps = computed(() => {
  return [
    {
      label: "Disable Overflow",
    },
    {
      label: "Expand on Hover",
    },
    {
      label: "Overlay",
    },
    {
      label: "No Mobile",
    },
    {
      label: "Right",
    },
  ];
});

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
