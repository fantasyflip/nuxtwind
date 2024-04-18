import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver,
} from "@nuxt/kit";

//@ts-ignore
import { name, version } from "../package.json";
import { primary, secondary } from "./runtime/colors.json";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * @default 'NXW-'
   */
  prefix?: string;

  /**
   * @default false
   */
  global?: boolean;

  /**
   * Used to adress the primary color in the theme (text-primary-500)
   * @default 'primary'
   */
  primaryColorClassName?: string;

  /**
   * Used to adress the secondary color in the theme (text-secondary-500)
   * @default 'secondary'
   */
  secondaryColorClassName?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "nuxtwind",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  // Default configuration options of the Nuxt module
  defaults: {
    prefix: "NXW-",
    global: false,
    primaryColorClassName: "primary",
    secondaryColorClassName: "secondary",
  },
  async setup(_options, _nuxt) {
    //@ts-ignore
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime");

    _nuxt.options.build.transpile.push(runtimeDir);

    _nuxt.options.alias["#nuxtwind"] = runtimeDir;

    let namedColors = {
      [_options.primaryColorClassName!]: primary,
      [_options.secondaryColorClassName!]: secondary,
    };

    await installModule("@nuxtjs/color-mode", { classSuffix: "" });
    await installModule("@nuxtjs/tailwindcss", {
      // module configuration
      config: {
        content: {
          files: [
            resolver.resolve("./runtime/components/**/*.{vue,mjs,ts}"),
            resolver.resolve("./runtime/*.{mjs,js,ts}"),
          ],
        },
        theme: {
          extend: {
            colors: namedColors,
          },
        },
      },
    });

    //components
    addComponentsDir({
      prefix: _options.prefix,
      path: resolver.resolve(runtimeDir, "components"),
      global: _options.global,
    });
  },
});
