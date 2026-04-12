<template>
  <div class="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
    <h1 class="mb-8 text-3xl font-bold text-gray-900 dark:text-white">
      NuxtWind Component Test
    </h1>

    <!-- Section: Buttons -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Buttons
      </h2>
      <div class="flex flex-wrap gap-4">
        <NXW-Button>Default (from config: indigo)</NXW-Button>
        <NXW-Button :color="{ bg: 'bg-green-600 hover:bg-green-700', text: 'text-white' }">
          Prop Override (green)
        </NXW-Button>
        <NXW-Button disabled>
          Disabled
        </NXW-Button>
      </div>
    </section>

    <!-- Section: Badges -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Badges
      </h2>
      <div class="flex flex-wrap gap-4">
        <NXW-Badge>Default (from config: rose)</NXW-Badge>
        <NXW-Badge :color="{ bg: 'bg-blue-500', text: 'text-white' }">
          Prop Override (blue)
        </NXW-Badge>
      </div>
    </section>

    <!-- Section: Progress -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Progress
      </h2>
      <div class="flex flex-col gap-4">
        <NXW-Progress :value="65" />
        <NXW-Progress loading />
      </div>
    </section>

    <!-- Section: Tooltip -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Tooltip
      </h2>
      <NXW-Tooltip text="Hello from NuxtWind!">
        <span class="cursor-pointer rounded bg-gray-200 px-3 py-1 dark:bg-gray-700 dark:text-white">
          Hover me
        </span>
      </NXW-Tooltip>
    </section>

    <!-- Section: Textfield -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Textfield
      </h2>
      <NXW-Textfield
        v-model="textValue"
        label="Test Input"
        placeholder="Type something..."
      />
      <p class="mt-2 text-sm text-gray-500">
        Value: {{ textValue }}
      </p>
    </section>

    <!-- Section: Checkbox -->
    <section class="mb-8">
      <h2 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-300">
        Checkbox
      </h2>
      <NXW-Checkbox
        v-model="checked"
        label="Accept terms"
      />
      <p class="mt-2 text-sm text-gray-500">
        Checked: {{ checked }}
      </p>
    </section>
  </div>
</template>

<script setup lang="ts">
const textValue = ref('')
const checked = ref(false)
</script>
