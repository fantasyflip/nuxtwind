<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <ExampleCodeDisplay :html="codeExample.html" :js="codeExample.js">
          <Select
            ref="selectRef"
            v-model="select.value"
            :items="selectItems"
            :label="select.label"
            :placeholder="select.placeholder"
            :filled="styleCheckedBoxes[0]"
            :outlined="styleCheckedBoxes[1]"
            :loading="checkedBoxes[0]"
            :disabled="checkedBoxes[1]"
            :append-icon="checkedBoxes[2] ? selectIcon : undefined"
            :prepend-icon="checkedBoxes[3] ? selectIcon : undefined"
            :search="checkedBoxes[4]"
            :clearable="checkedBoxes[5]"
            :mark-on-focus="checkedBoxes[6]"
            reset-on-key-down
            :color="{
              textfield: {
                bg: styleCheckedBoxes[1] ? 'bg-white dark:bg-zinc-900' : '',
              },
            }"
            :width="{
              textfield: 'w-fit',
            }"
            display-property="name"
          />
        </ExampleCodeDisplay>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="md:w-2/3 w-full">
            <Textfield
              v-model="select.label"
              class="mb-4"
              label="Select-Label"
              filled
            />
            <Textfield
              v-model="select.placeholder"
              class="mb-4"
              label="Placeholder"
              filled
            />
            <Checkboxgroup
              v-model="styleCheckedBoxes"
              :items="styleProps"
              :label="
                $t(
                  'pages.component.select.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.select.content.playground.checkboxgroup.description'
                )
              "
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
          :caveats="caveats"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script lang="ts" setup>
import Select from "../../../module/src/runtime/components/Select.vue";
import Textfield from "../../../module/src/runtime/components/Textfield.vue";
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import MdiMenuDown from "~icons/mdi/menu-down";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND

const selectRef = ref<InstanceType<typeof Select> | null>(null);

onMounted(() => {
  //@ts-expect-error - ref is not null after mounted
  selectRef.value?.select.textfield.focus();
});

const selectIcon = markRaw(MdiMenuDown);

let select = ref({
  label: "Select-Label",
  placeholder: "Placeholder",
  value: {
    name: "",
    value: "",
  },
});

// let selectItems = ref(["Foo", "Bar", "Boo", "Far"]);
let selectItems = ref([
  {
    name: "Foo",
    value: "foo",
  },
  {
    name: "Bar",
    value: "bar",
  },
  {
    name: "Boo",
    value: "boo",
  },
  {
    name: "Far",
    value: "far",
  },
]);

let styleCheckedBoxes = ref([false, false, true]);

let styleProps = ref([
  {
    label: "Filled",
  },
  {
    label: "Outlined",
  },
  {
    label: "Regular",
  },
]);

let checkedBoxes = ref([false, false, true, false, true, true, true, true]);

let toggleProps = ref([
  {
    label: "Loading",
  },
  {
    label: "Disabled",
  },
  {
    label: "Append-Icon",
  },
  {
    label: "Prepend-Icon",
  },
  {
    label: "Search",
  },
  {
    label: "Clearable",
  },
  {
    label: "Mark-On-Focus",
  },
  {
    label: "Show-All-On-Focus",
  },
]);

let codeExample = computed(() => {
  let html = `<NXW-Select
  v-model="selectValue"
  :items="selectItems"${
    select.value.label ? `\n  label="${select.value.label}"` : ""
  }${
    select.value.placeholder
      ? `\n  placeholder="${select.value.placeholder}"`
      : ""
  }${styleCheckedBoxes.value[0] ? `\n  filled` : ""}${
    styleCheckedBoxes.value[1] ? `\n  outlined` : ""
  }${checkedBoxes.value[0] ? `\n  loading` : ""}${
    checkedBoxes.value[1] ? `\n  disabled` : ""
  }${checkedBoxes.value[2] ? `\n  :append-icon="selectIcon"` : ""}${
    checkedBoxes.value[3] ? `\n  :prepend-icon="selectIcon"` : ""
  }${checkedBoxes.value[4] ? `\n  search` : ""}${
    checkedBoxes.value[5] ? `\n  clearable` : ""
  }${checkedBoxes.value[6] ? `\n  markOnFocus` : ""}
/>`;
  let js = `${
    checkedBoxes.value[2] || checkedBoxes.value[3]
      ? `import MdiMenuDown from "~icons/mdi/menu-down";
let selectIcon = markRaw(MdiMenuDown);`
      : ""
  }

let selectValue = ref("${select.value.value}");

let selectItems = ref(["Foo", "Bar", "Boo", "Far"]);`;
  return { html, js };
});

//DOCUMENTATION
let componentName = "Select";

let props = [
  {
    name: "items",
    type: "Array",
    default: undefined,
    description: t(
      "pages.component.select.content.documentation.properties.items.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      textfield: {},
      bg: "bg-gray-200 dark:bg-zinc-800",
      text: "text-black dark:text-white",
      border: "border-gray-300 dark:border-zinc-700",
      hover: "hover:bg-primary-700",
    },
    description: t(
      "pages.component.select.content.documentation.properties.color.description",
      { url: useComponentReferUrl("textfield", "prop", "color") }
    ),
  },
  {
    name: "search",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.search.description"
    ),
  },
  {
    name: "label",
    type: "String",
    default: "",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "label") }
    ),
  },
  {
    name: "outlined",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "outlined") }
    ),
  },
  {
    name: "filled",
    type: "Boolean, String",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "filled") }
    ),
  },
  {
    name: "clearable",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.clearable.description"
    ),
  },
  {
    name: "showAllOnFocus",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.showAllOnFocus.description"
    ),
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.disabled.description",
      { url: useComponentReferUrl("textfield", "prop", "disabled") }
    ),
  },
  {
    name: "loading",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.loading.description",
      { url: useComponentReferUrl("textfield", "prop", "loading") }
    ),
  },
  {
    name: "placeholder",
    type: "String",
    default: " ",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "placeholder") }
    ),
  },
  {
    name: "transition",
    type: "Object, Boolean",
    default: "",
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "transition") }
    ),
  },
  {
    name: "markOnFocus",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.select.content.documentation.properties.markOnFocus.description"
    ),
  },
  {
    name: "shadow",
    type: "Boolean, String",
    default: true,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "shadow") }
    ),
  },
  {
    name: "appendIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "appendIcon") }
    ),
  },
  {
    name: "prependIcon",
    type: "Object",
    default: null,
    description: t(
      "pages.component.select.content.documentation.properties.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "prop", "prependIcon") }
    ),
  },
  {
    name: "width",
    type: "Object",
    default: {
      textfield: "",
      select: "w-full",
    },
    description: t(
      "pages.component.select.content.documentation.properties.width.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "max-h-48",
    description: t(
      "pages.component.select.content.documentation.properties.height.description"
    ),
  },
];

let slots = [
  {
    name: "prepend-icon",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "prepend-icon") }
    ),
  },
  {
    name: "append-icon",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      { url: useComponentReferUrl("textfield", "slot", "append-icon") }
    ),
  },
  {
    name: "label",
    description: t(
      "pages.component.select.content.documentation.slots.referComponent.textfield.description",
      {
        url: useComponentReferUrl("textfield", "slot", "label"),
      }
    ),
  },
  {
    name: "item",
    description: t(
      "pages.component.select.content.documentation.slots.item.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.select.content.documentation.caveats.textfield.title"
    ),
    description: t(
      "pages.component.select.content.documentation.caveats.textfield.description",
      {
        url: useLocaleUrl("component/textfield"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
