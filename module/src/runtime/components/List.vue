<template>
  <ul :id="props.draggable ? 'draggable' : ''" :class="wrapperClass">
    <slot />
  </ul>
</template>
<script lang="ts" setup>
export interface Props {
  modelValue?: any[];
  draggable?: boolean;
  hintClasses?: string;
  activeClasses?: string;
}
import { computed, onMounted } from "vue";
const props = withDefaults(defineProps<Props>(), {
  draggable: false,
  hintClasses: "hint opacity-50",
  activeClasses: "active bg-primary-300",
});

const emit = defineEmits<{
  (e: "update:modelValue", id: any[]): void;
}>();

let wrapperClass = computed(() => {
  let classes: string[] = [];
  if (props.draggable) {
    classes.push("draggable");
  }
  classes.push("w-full");
  return classes.join(" ");
});

const hintClasses = computed(() => {
  let classes: string[] = [];
  if (props.hintClasses) {
    classes = props.hintClasses.split(" ");
  }

  return classes;
});

const activeClasses = computed(() => {
  let classes: string[] = [];
  if (props.activeClasses) {
    classes = props.activeClasses.split(" ");
  }

  return classes;
});

function slist(target) {
  //SET CSS + GET ALL LIST ITEMS
  target.classList.add("slist");
  let items = target.getElementsByTagName("li"),
    current = null;

  //MAKE ITEMS DRAGGABLE + SORTABLE
  for (let i of items) {
    //ATTACH DRAGGABLE
    i.draggable = true;

    //DRAG START - YELLOW HIGHLIGHT DROPZONES
    i.ondragstart = (e) => {
      current = i;
      for (let it of items) {
        if (it != current) {
          for (let hintClass of hintClasses.value) {
            it.classList.add(hintClass);
          }
        }
      }
    };

    //DRAG ENTER - RED HIGHLIGHT DROPZONE
    i.ondragenter = (e) => {
      if (i != current) {
        for (let activeClass of activeClasses.value) {
          i.classList.add(activeClass);
        }
      }
    };

    //DRAG LEAVE - REMOVE RED HIGHLIGHT
    i.ondragleave = () => {
      for (let activeClass of activeClasses.value) {
        i.classList.remove(activeClass);
      }
    };

    //DRAG END - REMOVE ALL HIGHLIGHTS
    i.ondragend = () => {
      for (let it of items) {
        for (let hintClass of hintClasses.value) {
          it.classList.remove(hintClass);
        }
        for (let activeClass of activeClasses.value) {
          it.classList.remove(activeClass);
        }
      }
    };

    //DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
    i.ondragover = (e) => e.preventDefault();

    //ON DROP - DO SOMETHING
    i.ondrop = (e) => {
      e.preventDefault();
      if (i != current) {
        let currentpos = 0,
          droppedpos = 0;
        for (let it = 0; it < items.length; it++) {
          if (current == items[it]) {
            currentpos = it;
          }
          if (i == items[it]) {
            droppedpos = it;
          }
        }
        if (currentpos < droppedpos) {
          i.parentNode.insertBefore(current, i.nextSibling);
        } else {
          i.parentNode.insertBefore(current, i);
        }
      }
      resortData();
    };
  }
}

function resortData() {
  let items = document.getElementById("draggable")!.getElementsByTagName("li");
  let newOrder: string[] = [];
  for (let i of items) {
    newOrder.push(i.id.split("list-item")[1]);
  }

  let currentOrder = props.modelValue;

  let updatedOrder = currentOrder?.slice().sort((a, b) => {
    return newOrder.indexOf(a.id) - newOrder.indexOf(b.id);
  });

  emit("update:modelValue", updatedOrder!);
}

// (C) INIT ON PAGE LOAD
onMounted(() => {
  slist(document.getElementById("draggable"));
});
</script>
