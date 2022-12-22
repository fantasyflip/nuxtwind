<template>
  <div :class="navbarWrapperClass">Navbar</div>
</template>

<script setup>
let defaults = {
  color: {
    bg: "bg-primary-800",
  },
};

let props = defineProps({
  color: {
    type: Object,
    default: {
      bg: "bg-primary-800",
    },
  },
  fixed: {
    type: Boolean,
    default: true,
  },
  height: {
    type: String,
    default: "h-14",
  },
});

let navbarWrapperClass = computed(() => {
  let classes = [];

  classes.push(props.height);

  classes.push(props.color?.bg || defaults.color.bg);

  if (props.fixed) {
    classes.push("fixed");
    classes.push("top-0");
    classes.push("left-0");
    classes.push("right-0");
    classes.push("z-50");
  }

  return classes.join(" ");
});
</script>
