import { defineNuxtModule, addComponent, createResolver } from "@nuxt/kit";
import { resolve } from "path";

import { name, version } from "../package.json";

export default defineNuxtModule({
  meta: {
    name,
    version,
    configKey: "nuxtwind",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  setup(options, nuxt) {
    const reslover = createResolver(import.meta.url);
    const runtimeDir = reslover.resolve("./runtime");

    nuxt.options.build.transpile.push(runtimeDir);

    const componentsDir = reslover.resolve(runtimeDir, "components");
    const prefix = options.customPrefix || "NXW-";
    addComponent({
      name: prefix + "Badge", // name of the component to be used in vue templates
      filePath: resolve(componentsDir, "Badge.vue"), // resolve(runtimeDir, 'components', 'MyComponent.vue')
    });
  },
});
