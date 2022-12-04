import VueJsonPretty from "vue-json-pretty";

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.component("vue-json-pretty", VueJsonPretty);
});
