<template>
  <div class="relative" id="select">
    <Textfield
      @click="disabled || loading ? '' : (showSelect = true)"
      autocomplete="off"
      v-model="selectSearch"
      :outlined="props.outlined"
      :filled="props.filled"
      :disabled="props.disabled"
      :placeholder="props.placeholder"
      :color="props.color?.textfield"
      :loading="props.loading"
    />
    <div
      v-if="showSelect"
      class="overflow-auto w-full max-h-48 z-50 absolute shadow-xl rounded-lg"
    >
      <ul>
        <li
          class="p-2 hover:bg-black"
          v-for="(item, index) in selectItems"
          :class="
            index < selectItems.length - 1 ? 'border-b border-zinc-700' : ''
          "
          :key="index"
          @click.stop="setItem(item)"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
let showSelect = ref(false);
let selectSearch = ref(props.modelValue || "");

let props = defineProps({
  modelValue: {},
  items: {
    type: Array,
    required: true,
  },
  color: {
    type: Object,
    default: {},
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  filled: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: "Select",
  },
});

let emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  window.addEventListener("click", function (e) {
    if (!document.getElementById("select").contains(e.target)) {
      showSelect.value = false;
    }
  });
});

let selectItems = computed(() => {
  return props.items.filter((item) => {
    return item.toLowerCase().includes(selectSearch.value.toLowerCase());
  });
});

function setItem(value) {
  selectSearch.value = value;
  emit("update:modelValue", value);
  showSelect.value = false;
}
</script>
