<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <div class="grid place-items-center w-96">
            <List v-model="listItems" draggable>
              <ListItem
                v-for="item in listItems"
                :id="item.id"
                :key="item.id"
                class="m-2 rounded-md"
              >
                <div class="w-full h-12 grid place-items-center">
                  {{ item.content }}
                </div>
              </ListItem>
            </List>
          </div>
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            {{ listItems }}
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :events="events"
          :caveats="caveats"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import List from "../../../module/src/runtime/components/List.vue";
import ListItem from "../../../module/src/runtime/components/ListItem.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND

let listItems = ref([
  {
    id: "1",
    content: "Item-1",
  },
  {
    id: "2",
    content: "Item-2",
  },
  {
    id: "3",
    content: "Item-3",
  },
]);

let codeExample = computed(() => {
  let html = ``;
  let js = ``;
  return { html, js };
});

//DOCUMENTATION
let componentName = "List";

let props = [];

let events = [];

let slots = [];

let caveats = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
