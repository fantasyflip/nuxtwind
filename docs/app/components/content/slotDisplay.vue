<template>
  <div class="pb-8">
    <slot
      :use="$slots.default"
      unwrap="p"
    />

    <ClientOnly>
      <p>
        <slot
          :use="$slots.description"
          unwrap="p"
        />
      </p>
    </ClientOnly>
  </div>
</template>
