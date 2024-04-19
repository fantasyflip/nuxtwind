<template>
  <div>
    <div class="flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <ContentSlot :use="$slots.default" unwrap="p" />
        <div class="text-green-500 dark:text-green-500 font-light pt-5">
          {{ props.type }}
        </div>
      </div>
   
      <div v-if="props.required" class="text-white/50 font-light">
        required
      </div>
    </div>
    <div class="pl-4">
      <div class="flex gap-3 font-semibold">
        <span>Default:</span>
        <span
          class="font-light" :class="{
            'text-green-500 dark:text-green-500': props.type=='string',
            'text-orange-500 dark:text-orange-500': props.type=='boolean',
            'text-blue-500 dark:text-blue-500': props.type=='number',
          }"
        >{{ props.default }}</span>
      </div>
      <p>
        <ContentSlot :use="$slots.description" unwrap="p" />
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
    required: boolean;
    type: 'boolean' | 'string' | 'number' | 'object';
    default: string;
}

const props = withDefaults(defineProps<Props>(), {
    required: false,
    type: 'string',
    default: 'default',
})
</script>