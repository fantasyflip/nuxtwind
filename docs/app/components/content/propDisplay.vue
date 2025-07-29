<template>
  <div class="pb-8">
    <div class="flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <slot
          unwrap="p"
        />
        <div class="flex gap-2">
          <div
            v-for="(propType, index) in props.types"
            :key="propType"
            class="flex pt-5"
          >
            <div class="text-green-500 dark:text-green-500 font-light">
              {{ propType }}
            </div>
            <div
              v-if="index != props.types.length - 1"
              class="pl-1 -mr-1"
            >
              |
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="props.required"
        class="text-white/50 font-light"
      >
        required
      </div>
    </div>
    <div
      class="flex"
      :class="props.defaultTop ? 'flex-col-reverse' : 'flex-col'"
    >
      <ClientOnly>
        <slot
          name="description"
          unwrap="p"
        />
      </ClientOnly>
      <div
        v-if="props.default || props.types.includes('boolean') || props.types.includes('object')"
        :class="!props.defaultTop ? 'pt-2' : ''"
      >
        <div class="font-semibold">
          Default
        </div>
        <div
          v-if="typeof props.default === 'object'"
        >
          <slot
            name="defaultValue"
          />
        </div>
        <div
          v-else
          class="font-light"
          :class="{
            'text-green-500 dark:text-green-500':
              typeof props.default == 'string',
            'text-red-500 dark:text-red-500':
              typeof props.default == 'boolean' && !props.default,
            'text-orange-500 dark:text-orange-500':
              typeof props.default == 'boolean' && props.default,
            'text-blue-500 dark:text-blue-500':
              typeof props.default == 'number',
          }"
        >
          {{ props.default }}
        </div>
      </div>
      <div
        v-if="props.example"
        class="pt-4"
      >
        <div class="font-semibold">
          Example
        </div>
        <div
          v-if="typeof props.example == 'object'"
        >
          <slot name="example" />
        </div>
        <div
          v-else
          class="font-light"
          :class="{
            'text-green-500 dark:text-green-500':
              typeof props.example == 'string',
            'text-red-500 dark:text-red-500':
              typeof props.example == 'boolean' && !props.example,
            'text-orange-500 dark:text-orange-500':
              typeof props.example == 'boolean' && props.example,
            'text-blue-500 dark:text-blue-500':
              typeof props.example == 'number',
          }"
        >
          {{ props.example }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
export interface Props {
  name: string
  required?: boolean
  types?: string[]
  default?: string | object | boolean | number
  example?: string | object | boolean | number
  defaultTop?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  types: () => {
    return ['string']
  },
  defaultTop: false,
})
</script>
