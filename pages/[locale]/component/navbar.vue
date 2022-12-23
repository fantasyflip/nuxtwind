<template>
  <div>
    <NuxtLayout name="component">
      <template #componentName> {{ componentName }} </template>
      <template #component>
        <div
          ref="scroll"
          class="w-2/3 h-2/3 overflow-y-auto overflow-x-hidden bg-gray-200 dark:bg-zinc-800"
        >
          <div class="w-full h-screen relative">
            <Navbar
              sticky
              elevate-on-scroll
              :scroll-offset="y"
              shrink-on-scroll
              extension
              :color="{
                bg: 'bg-gray-300 dark:bg-zinc-700',
              }"
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
                  <div>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Similique recusandae, ducimus ut sequi quasi ullam quia cum
                    minima ab sapiente non nisi unde soluta pariatur aspernatur,
                    accusamus nulla facilis sed!
                  </div>
                </div>
              </template>
            </Navbar>
            <div>
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
          <div class="grid place-items-center sm:w-1/2 gap-3 py-2"></div>
        </div>
      </template>
      <template #documentation>
        <DocumentationDisplay :componentName="componentName" :props="props" />
      </template>
    </NuxtLayout>
  </div>
</template>
<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();

//PLAYGROUND
const scroll = ref(null);

const { y } = useScroll(scroll);

// onMounted(() => {
//   scrollbox.value = document.getElementById("scrollbox");
//   console.log(scrollbox.value);
// });

//DOCUMENTATION
let componentName = "Navbar";

let props = [];

definePageMeta({
  layout: false,
});
</script>
<style scoped></style>
