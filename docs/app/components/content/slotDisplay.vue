<template>
  <div class="pb-8">
    <slot
      unwrap="p"
    />

    <p>
      <slot
        name="description"
        unwrap="p"
      />
    </p>
  </div>
</template>
