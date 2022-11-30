<template>
  <div>
    <component :is="selectedComponent" />
  </div>
</template>

<script setup>

import selectedComponent from ()=>{
    const { params } = useRoute();
    const selectedComponent = params.componentName;
    let componentPath = `~/components/${selectedComponent}.vue`;
    return componentPath
};
</script>
