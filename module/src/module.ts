import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver,
} from "@nuxt/kit";

//@ts-ignore
import { name, version } from "../package.json";
//@ts-ignore
import { primary, secondary } from "./runtime/colors.json";

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Used to set the prefix for NuxtWind components
   * @default 'NXW-'
   */
  prefix?: string;

  /**
   * Used to decide whether components should be registered globally or not
   * @default false
   */
  global?: boolean;

  /**
   * Used to set the default theme values for NuxtWind
   */
  theme: {
    primary:{
      50: string,
      100: string,
      200: string,
      300: string,
      400: string,
      500: string,
      600: string,
      700: string,
      800: string,
      900: string,
    },
    secondary:{
      50: string,
      100: string,
      200: string,
      300: string,
      400: string,
      500: string,
      600: string,
      700: string,
      800: string,
      900: string,
    }
  }
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
    theme: {
      primary,
      secondary
    }
  },
  async setup(_options, _nuxt) {
    //@ts-ignore
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime");

    _nuxt.options.build.transpile.push(runtimeDir);

    _nuxt.options.alias["#nuxtwind"] = runtimeDir;

    await installModule('@nuxtjs/color-mode', { classSuffix: '' })
    await installModule("@nuxtjs/tailwindcss", {
      // module configuration
      config: {
        content: {
          files: [
            resolver.resolve(runtimeDir, 'components/**/*.{vue,mjs,ts}'),
          ],
        },
        theme:  {
          extend: {
            colors: _options.theme,
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
