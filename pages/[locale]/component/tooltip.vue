<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <Tooltip
          :top="checkedPositionBoxes[0]"
          :bottom="checkedPositionBoxes[1]"
          :right="checkedPositionBoxes[2]"
          :left="checkedPositionBoxes[3]"
          :rounded="rounded"
        >
          <Button
            @click="
              useToast({
                title: '(╯°□°)╯︵ ┻━┻',
                message: 'You´re supposed to hover over me and not click!',
                autoClose: true,
                type: 'warning',
              })
            "
            >Hover over me!</Button
          >

          <template #tooltip>
            {{ tooltip }}
          </template>
        </Tooltip>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Textfield
              v-model="tooltip"
              class="mb-4"
              label="Tooltip Text"
              filled
            />
            <Checkboxgroup
              v-model="checkedPositionBoxes"
              not-zero
              :items="postitionProps"
              :label="
                $t(
                  'pages.component.tooltip.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.tooltip.content.playground.checkboxgroup.description'
                )
              "
            />
            <div class="w-full">
              <Checkbox v-model="rounded" label="Rounded" />
            </div>
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :componentName="componentName"
          :props="props"
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
let tooltip = ref("This is a tooltip telling you not to click the button! :)");
let checkedPositionBoxes = ref([true, false, false, false]);

let postitionProps = ref([
  {
    label: "Top",
  },
  {
    label: "Bottom",
  },
  {
    label: "Right",
  },
  {
    label: "Left",
  },
]);

let rounded = ref(true);

//DOCUMENTATION
let componentName = "Tooltip";

let props = [];

let slots = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
