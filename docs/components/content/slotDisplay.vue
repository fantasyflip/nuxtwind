<template>
  <div class="pb-8">
    <ContentSlot
      :use="$slots.default"
      unwrap="p"
    />

    <ClientOnly>
      <p>
        <ContentSlot
          :use="$slots.description"
          unwrap="p"
        />
      </p>
    </ClientOnly>
  </div>
</template>
