<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Badge
          :right="positionHorizontalCheckedBoxes[0]"
          :left="positionHorizontalCheckedBoxes[1]"
          :top="positionVerticalCheckedBoxes[0]"
          :bottom="positionVerticalCheckedBoxes[1]"
          :border="checkedBoxes[0]"
        >
          <Button></Button>
          <template #badge-content>
            <div v-if="iconContent"><MdiExclamationThick /></div>
            <div v-else>{{ badgeContent }}</div>
          </template>
        </Badge>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="badgeContent"
              class="mb-4"
              :label="
                t('pages.component.badge.content.playground.textfield.label')
              "
              filled
              :disabled="iconContent"
            />
            <Checkbox
              v-model="iconContent"
              :label="
                t('pages.component.badge.content.playground.checkbox.label')
              "
              :description="
                t(
                  'pages.component.badge.content.playground.checkbox.description'
                )
              "
            />
            <Checkboxgroup
              v-model="positionHorizontalCheckedBoxes"
              class="mt-2"
              :items="positionHorizontalProps"
              :label="
                $t(
                  'pages.component.badge.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.badge.content.playground.checkboxgroup.description'
                )
              "
            />
            <Checkboxgroup
              v-model="positionVerticalCheckedBoxes"
              :items="positionVerticalProps"
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
            />
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import MdiExclamationThick from "~icons/mdi/exclamation-thick";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
let badgeContent = ref("20");
let iconContent = ref(false);

let positionHorizontalCheckedBoxes = ref([true, false]);

let positionHorizontalProps = ref([
  {
    label: "Right",
  },
  {
    label: "Left",
  },
]);

let positionVerticalCheckedBoxes = ref([true, false]);

let positionVerticalProps = ref([
  {
    label: "Top",
  },
  {
    label: "Bottom",
  },
]);

let checkedBoxes = ref([true]);

let toggleProps = ref([
  {
    label: "Border",
  },
]);

//DOCUMENTATION
let componentName = "Badge";

let props = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
