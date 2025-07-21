<template>
  <div class="w-full flex-col md:flex-row flex gap-3 pb-3">
    <MockComponentCard
      :title="card1.title"
      :new="card1.new"
      :link="'/components/'+card1.title.toLowerCase()"
      class="w-full md:w-1/2"
    >
      <ContentSlot
        :use="$slots.card1"
        unwrap="p"
      />
    </MockComponentCard>
    <MockComponentCard
      v-if="card2.title"
      :title="card2.title"
      :new="card2.new"
      :link="'/components/'+card2.title.toLowerCase()"
      class="w-full md:w-1/2"
    >
      <ContentSlot
        :use="$slots.card2"
        unwrap="p"
      />
    </MockComponentCard>
  </div>
</template>

<script lang="ts" setup>
import type { Props as Card } from './MockComponentCard.vue'

export interface Props {
  card1: Card
  card2: Card
}

withDefaults(defineProps<Props>(), {
  card1: {
    title: 'Component 1',
    new: false,
  },
  card2: {
    title: '',
    new: false,
  },
})
</script>
