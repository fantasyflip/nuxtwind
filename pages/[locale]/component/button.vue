<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> Button </template>
      <template #component>
        <Button
          :color="{
            bg: 'bg-red-500',
          }"
          border-radius
          grow
          link="https://google.com"
          target="_blank"
        ></Button>
      </template>
      <template #playground> Playground </template>
      <template #props>
        <PropDisplay v-for="prop in props" :item="prop" />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
let props = [
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-cyan-900",
      text: "text-white",
      border: "border-white",
      hover: "hover:bg-cyan-800",
    },
    description: "The color of the button.",
  },
  {
    name: "borderRadius",
    type: "Boolean, String",
    default: false,
    description: "The border radius of the button.",
  },
  {
    name: "grow",
    type: "Boolean, Object",
    default: false,
    description: "The grow animation of the button.",
  },
  {
    name: "link",
    type: "Object, String",
    default: "undefined",
    description: "The link of the button.",
  },
  {
    name: "target",
    type: "String",
    default: "_self",
    description: "The target of the button.",
  },
  {
    name: "disabled",
    type: "Boolean",
    default: false,
    description: "The disabled state of the button.",
  },
  {
    name: "icon",
    type: "Boolean",
    default: false,
    description: "The icon state of the button.",
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
