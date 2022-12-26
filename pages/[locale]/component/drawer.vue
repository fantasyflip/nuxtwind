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
            >
              <!-- https://medium.com/@9cv9official/create-a-beautiful-hover-triggered-expandable-sidebar-with-simple-html-css-and-javascript-9f5f80a908d1 -->
              <Appbar :color="{ bg: 'dark:bg-zinc-600 bg-gray-400' }">
                <div class="w-full h-full grid place-items-center">Drawer</div>
              </Appbar>
              <div class="w-full flex">
                <div class="bg-red-700">
                  <div class="w-12"></div>
                </div>
                <div class="w-12">Test</div>
              </div>
              <div class="h-24 whitespace-pre">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptas accusantium impedit quasi ex laborum eveniet a ea
                asperiores, expedita saepe iusto dolor quisquam minus nisi,
                repellat adipisci minima ipsa amet!
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
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND

let showDrawer = ref(false);

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
