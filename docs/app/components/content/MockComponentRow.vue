<template>
  <div class="w-full flex-col md:flex-row flex gap-3 pb-3">
    <MockComponentCard
      :title="card1.title"
      :new="card1.new"
      :link="'/components/'+card1.title.toLowerCase()"
      class="w-full md:w-1/2"
    >
      <slot name="card1" />
    </MockComponentCard>
    <MockComponentCard
      v-if="card2.title"
      :title="card2.title"
      :new="card2.new"
      :link="'/components/'+card2.title.toLowerCase()"
      class="w-full md:w-1/2"
    >
      <slot
        name="card2"
      />
    </MockComponentCard>
  </div>
</template>

<script lang="ts" setup>
export interface Card {
  title: string
  new: boolean
}

export interface Props {
  card1?: Card
  card2?: Card
}

withDefaults(defineProps<Props>(), {
  card1: () => ({
    title: 'Component 1',
    new: false,
  }),
  card2: () => ({
    title: '',
    new: false,
  }),
})
</script>
