import {
  defineNuxtModule,
  addComponentsDir,
  createResolver,
} from "@nuxt/kit";

//@ts-ignore
import { name, version } from "../package.json";

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
  },
  async setup(_options, _nuxt) {
    //@ts-ignore
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime");

    _nuxt.options.build.transpile.push(runtimeDir);

    _nuxt.options.alias["#nuxtwind"] = runtimeDir;

    //components
    addComponentsDir({
      prefix: _options.prefix,
      path: resolver.resolve(runtimeDir, "components"),
      global: _options.global,
    });
  },
});
