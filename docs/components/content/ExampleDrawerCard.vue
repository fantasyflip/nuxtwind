<template>
  <div>
    <ComponentCard name="NXW-Drawer" :component-props="compProps" :options="compOptions" :component-slots="compSlots" @option-update="handleOptionUpdate">
      <template #custom-component>
        <div class="h-72 relative">
          <NXW-Appbar navigation-icon @navigation-icon-click="compProps.modelValue = !compProps.modelValue">
            <div class="flex size-full justify-center items-center">
              Appbar
            </div>
          </NXW-Appbar>
          <NXW-Drawer v-model="compProps.modelValue" :overlay="compProps.overlay" :expand-on-hover="compProps['expand-on-hover']" height="h-full" absolute :disable-overflow="false" :border="compProps.border">
            <div v-for="item in drawerItems" :key="item.text" class="h-14 w-full cursor-pointer flex items-center px-2 gap-10 hover:bg-primary-400/50 transition-color ease-in-out duration-300">
              <div class="w-12 grid place-items-center">
                <UIcon :name="item.icon" class="size-7" />
              </div>
              <div>
                {{ item.text }}
              </div>
            </div>
          </NXW-Drawer>
        </div>
      </template>
    </ComponentCard>
  </div>
</template>
  
  <script setup lang="ts">
  import ComponentCard from './ComponentCard.vue'
  
  const compProps = ref({
      modelValue: false,
      'expand-on-hover': true,
      border: true,
      overlay:true
  })
  
  const compOptions = [
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'expand-on-hover',
        default: false,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'border',
        default: true,
    },
    {
        type: 'boolean',
        propType: 'boolean',
        name: 'overlay',
        default: true,
    },
  ]
  
  const compSlots = [
      {
          slot: 'default',
          content: `
          <div v-for="item in drawerItems" :key="item.text" class="h-14 w-full flex items-center cursor-pointer px-2 gap-10 hover:bg-primary-400/50 transition-color ease-in-out duration-300">
              <div class="w-12 grid place-items-center">
                <UIcon :name="item.icon" class="size-7" />
              </div>
              <div>
                {{ item.text }}
              </div>
            </div>
          `,
          isOption: false,
      },
  ]

  const drawerItems= [
    {
        icon: 'i-mdi-home',
        text: 'Home',
    },
    {
        icon: 'i-mdi-account',
        text: 'Profile',
    },
    {
        icon: 'i-mdi-settings',
        text: 'Settings',
    },
  ]

  
  function handleOptionUpdate({ name, event, options }) {
      if(options.find(option => option.name === name)) {
          compProps.value[name] = event
      }
  }
  </script>