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
      name: prefix + "Appbar", // name of the component to be used in vue templates
      filePath: resolve(componentsDir, "Appbar.vue"), // resolve(runtimeDir, 'components', 'MyComponent.vue')
    });
    addComponent({
      name: prefix + "Badge",
      filePath: resolve(componentsDir, "Badge.vue"),
    });
    addComponent({
      name: prefix + "Button",
      filePath: resolve(componentsDir, "Button.vue"),
    });
    addComponent({
      name: prefix + "Carousel",
      filePath: resolve(componentsDir, "Carousel.vue"),
    });
    addComponent({
      name: prefix + "CarouselItem",
      filePath: resolve(componentsDir, "CarouselItem.vue"),
    });
    addComponent({
      name: prefix + "Checkbox",
      filePath: resolve(componentsDir, "Checkbox.vue"),
    });
    addComponent({
      name: prefix + "Checkboxgroup",
      filePath: resolve(componentsDir, "Checkboxgroup.vue"),
    });
    addComponent({
      name: prefix + "Drawer",
      filePath: resolve(componentsDir, "Drawer.vue"),
    });
    addComponent({
      name: prefix + "Progress",
      filePath: resolve(componentsDir, "Progress.vue"),
    });
    addComponent({
      name: prefix + "Select",
      filePath: resolve(componentsDir, "Select.vue"),
    });
    addComponent({
      name: prefix + "Slider",
      filePath: resolve(componentsDir, "Slider.vue"),
    });
    addComponent({
      name: prefix + "Textarea",
      filePath: resolve(componentsDir, "Textarea.vue"),
    });
    addComponent({
      name: prefix + "Textfield",
      filePath: resolve(componentsDir, "Textfield.vue"),
    });
    addComponent({
      name: prefix + "Toast",
      filePath: resolve(componentsDir, "Toast.vue"),
    });
    addComponent({
      name: prefix + "Tooltip",
      filePath: resolve(componentsDir, "Tooltip.vue"),
    });
  },
});
