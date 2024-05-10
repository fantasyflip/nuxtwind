<template>
  <div>
    <ComponentCard name="NXW-Tooltip" :component-props="compProps" :options="compOptions" :component-slots="compSlots" @option-update="handleOptionUpdate">
      <template #custom-component>
        <div class="h-36 flex items-center justify-center mx-auto w-full ">
          <NXW-Tooltip
            v-bind="compProps"
          >
            <NXW-Button>Hover over me!</NXW-Button>
            <template #tooltip>
              Good Job! :D
            </template>
          </NXW-Tooltip>
        </div>
      </template>
    </ComponentCard>
  </div>
</template>
  
  <script setup lang="ts">
  import ComponentCard from './ComponentCard.vue'
  
  const compProps = ref({
    bottom: false,
    top: true,
    right: false,
    left: false,
    rounded: true,
    interactive: false,
  })
  
  const compOptions = [
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'bottom',
        default: false,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'top',
        default: false,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'right',
        default: false,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'left',
        default: false,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'rounded',
        default: true,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'interactive',
        default: false,
    },
  ]
  
  const compSlots = [
    {
        slot: 'default',
        content: `
        <NXW-Button>Hover over me!</NXW-Button>`,
        isOption: false,
    },
    {
        slot: 'tooltip',
        content: `
        Good Job! :D`,
        isOption: false,
    },
  ]

  
  function handleOptionUpdate({ name, event, options }) {
    if(options.find(option => option.name === name)) {
        compProps.value[name] = event
    }
  }
  </script>