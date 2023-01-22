<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div
          ref="scroll"
          class="lg:w-2/3 lg:h-2/3 w-9/10 h-[50vh] overflow-y-auto overflow-x-hidden bg-gray-200 dark:bg-zinc-800"
        >
          <div class="w-full h-screen relative">
            <Appbar
              :absolute="checkedPositionBoxes[0]"
              :sticky="checkedPositionBoxes[1]"
              :fixed="checkedPositionBoxes[2]"
              :extension="checkedBoxes[0]"
              :shrink-on-scroll="checkedBoxes[1]"
              :elevate-on-scroll="checkedBoxes[2]"
              :navigation-icon="checkedBoxes[3]"
              :bottom="checkedBoxes[4]"
              :scroll-offset="
                checkedPositionBoxes[2] && checkedBoxes[0] && checkedBoxes[1]
                  ? null
                  : y
              "
              :color="{
                bg: 'bg-gray-300 dark:bg-zinc-700',
              }"
              :z-index="checkedPositionBoxes[2] ? 'z-[101]' : 'z-[9]'"
            >
              <template #default>
                <div class="w-full h-full relative">
                  <div
                    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-primary-800"
                  >
                    Navigation-Bar
                  </div>
                </div>
              </template>
              <template #extension>
                <div class="p-4">
                  <div class="font-bold">Extension</div>
                  <div class="py-2">This Extension shrinks on scroll.</div>
                  <div class="text-justify" style="hyphens: auto">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Similique recusandae, ducimus ut sequi quasi ullam quia cum
                    minima ab sapiente non nisi unde soluta pariatur aspernatur,
                    accusamus nulla facilis sed!
                  </div>
                </div>
              </template>
            </Appbar>
            <div class="p-4 text-justify" style="hyphens: auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
              minima veniam ipsam aspernatur tenetur ad dolore nisi, adipisci
              deserunt voluptas assumenda a iste non rerum modi inventore sit
              fuga nihil. Est minima tenetur officia debitis quisquam id soluta
              similique et saepe beatae culpa aliquid itaque corporis nisi
              dolore, at ut! Reprehenderit qui laborum repellendus modi fugit.
              Odit rem consectetur deleniti! Blanditiis quia doloremque quae.
              Tempora ipsum, perferendis debitis quod porro hic expedita vitae
              iusto laborum excepturi dolore blanditiis quisquam consequatur
              eveniet inventore dolor beatae animi rerum quae. Facere, nemo
              odio. Placeat modi non excepturi recusandae nam praesentium ut
              eaque debitis. Laudantium a illo quae illum ea quam molestiae
              nobis explicabo nemo, aut voluptatibus minus. Eaque, officia.
              Dolor tenetur explicabo omnis! Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Dicta, saepe rem dolores est
              sapiente iure mollitia explicabo, eveniet vero laborum vitae ullam
              ex suscipit, quibusdam molestias repellat. Ipsum, voluptas non!
              Animi accusamus corporis, quam eaque numquam eveniet eligendi
              praesentium nemo, debitis et itaque, ex minima iste placeat dicta
              facere nisi at quos. Quaerat ab maiores doloremque excepturi velit
              ipsam. Asperiores. Ullam corrupti magni eveniet expedita, cumque
              officiis ut? Architecto omnis iure nobis corporis, nemo
              perspiciatis accusamus culpa nostrum placeat doloribus,
              consectetur odio molestiae soluta minima vitae iste saepe sapiente
              ad. Nulla optio illum, harum eius aut accusantium obcaecati
              aspernatur ratione dolorem reiciendis quos rerum! Impedit, in!
              Delectus dignissimos quae sit odio ex a, aperiam quibusdam error
              adipisci totam, minima eum. Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Aliquid reprehenderit aut quibusdam modi odit
              deleniti harum quasi odio assumenda veritatis aperiam sequi eum
              consequatur quis, vitae totam nam culpa suscipit? Ex rerum nihil
              perspiciatis quasi, ab non fugit eveniet consequuntur asperiores
              id laborum sint error, facilis eligendi saepe. Neque repellat
              possimus natus ipsum consequuntur aspernatur exercitationem rerum
              quo eaque ratione. Optio ipsam voluptatem atque velit dolore ex
              hic mollitia iusto iure, neque sit nam non natus perferendis,
              fugit ea nihil a. Nesciunt natus ipsam optio a doloribus ratione
              consequatur asperiores. Quidem cumque quibusdam sint a deleniti
              quasi dolorum libero, temporibus fuga recusandae vero voluptatem
              veritatis quis animi possimus ut expedita necessitatibus hic iste
              maiores? Voluptates quo harum alias provident ab.
            </div>
          </div>
        </div>
      </template>
      <template #playground>
        <div class="grid place-items-center h-full w-full">
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2">
            <Checkboxgroup
              v-model="checkedPositionBoxes"
              not-zero
              :items="postitionProps"
              :label="
                $t(
                  'pages.component.appbar.content.playground.checkboxgroup.label'
                )
              "
              :description="
                $t(
                  'pages.component.appbar.content.playground.checkboxgroup.description'
                )
              "
            />
            <Checkboxgroup
              v-model="checkedBoxes"
              multiple
              :items="toggleProps"
            />
          </div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay
          :component-name="componentName"
          :props="props"
          :events="events"
          :caveats="caveats"
          :slots="slots"
        />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import Appbar from "../../../module/src/runtime/components/Appbar.vue";
import Checkboxgroup from "../../../module/src/runtime/components/Checkboxgroup.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
const scroll = ref(null);

const { y } = useScroll(scroll);

let checkedPositionBoxes = ref([false, true, false]);

let postitionProps = ref([
  {
    label: "Absolute",
  },
  {
    label: "Sticky",
  },
  {
    label: "Fixed",
  },
]);

let checkedBoxes = ref([false, false, true, true, false]);

let toggleProps = computed(() => {
  return [
    {
      label: "Extension",
    },
    {
      label: "Shrink-On-Scroll",
      disabled: !checkedBoxes.value[0],
      description: t(
        "pages.component.appbar.content.playground.checkboxgroup.item.shrinkOnScroll.description"
      ),
    },
    {
      label: "Elevate-On-Scroll",
      disabled: checkedPositionBoxes.value[0],
      description: t(
        "pages.component.appbar.content.playground.checkboxgroup.item.elevateOnScroll.description"
      ),
    },
    {
      label: "Navigation-Icon",
    },
    {
      label: "Bottom",
      disabled: checkedPositionBoxes.value[1],
      description: t(
        "pages.component.appbar.content.playground.checkboxgroup.item.bottom.description"
      ),
    },
  ];
});

let isFixed = computed(() => {
  return checkedPositionBoxes.value[2];
});

watch(isFixed, (value) => {
  if (value) {
    let timeout = 10;
    useToast(
      {
        title: "Fixed-Prop",
        message:
          "Since the fixed prop overlays the standard appbar, it'll be reset after " +
          timeout +
          " seconds.",
        autoClose: true,
        duration: timeout,
        type: "info",
      },
      true
    );
    setTimeout(() => {
      checkedPositionBoxes.value = [false, true, false];
    }, timeout * 1000);
  }
});

//DOCUMENTATION
let componentName = "Appbar";

let props = [
  {
    name: "zIndex",
    type: "String",
    default: "z-10",
    description: t(
      "pages.component.appbar.content.documentation.properties.zIndex.description"
    ),
  },
  {
    name: "color",
    type: "Object",
    default: {
      bg: "bg-white dark:bg-zinc-900",
    },
    description: t(
      "pages.component.appbar.content.documentation.properties.color.description"
    ),
  },
  {
    name: "fixed",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.fixed.description"
    ),
  },
  {
    name: "absolute",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.absolute.description"
    ),
  },
  {
    name: "sticky",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.sticky.description"
    ),
  },
  {
    name: "bottom",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.bottom.description"
    ),
  },
  {
    name: "extension",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.extension.description"
    ),
  },
  {
    name: "shrinkOnScroll",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.shrinkOnScroll.description"
    ),
  },
  {
    name: "elevateOnScroll",
    type: "Boolean",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.elevateOnScroll.description"
    ),
  },
  {
    name: "navigationIcon",
    type: "Boolean, Object",
    default: false,
    description: t(
      "pages.component.appbar.content.documentation.properties.navigationIcon.description"
    ),
  },
  {
    name: "scrollOffset",
    type: "Number",
    default: null,
    description: t(
      "pages.component.appbar.content.documentation.properties.scrollOffset.description"
    ),
  },
  {
    name: "height",
    type: "String",
    default: "h-14",
    description: t(
      "pages.component.appbar.content.documentation.properties.height.description"
    ),
  },
];

let events = [
  {
    name: "navigation-icon-click",
    structure: undefined,
    description: t(
      "pages.component.appbar.content.documentation.events.navigationIconClick.description"
    ),
  },
];

let slots = [
  {
    name: "navigation-icon",
    description: t(
      "pages.component.appbar.content.documentation.slots.navigationIcon.description"
    ),
  },
];

let caveats = [
  {
    name: t(
      "pages.component.appbar.content.documentation.caveats.button.title"
    ),
    description: t(
      "pages.component.appbar.content.documentation.caveats.button.description",
      {
        url: useLocaleUrl("component/button"),
      }
    ),
  },
];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
