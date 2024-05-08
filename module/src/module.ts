import {
  defineNuxtModule,
  installModule,
  addComponentsDir,
  createResolver,
  useLogger,
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
   * Used display debug logs of the module in the console
   * @default false
   */
  debugLog?: boolean;

  /**
   * Used to set the default theme values for NuxtWind
   */
  theme: {
    primary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
    secondary: {
      50: string;
      100: string;
      200: string;
      300: string;
      400: string;
      500: string;
      600: string;
      700: string;
      800: string;
      900: string;
    };
  };
}

function nxwLog(logActive:boolean | undefined, message: string,  type: 'info' | 'success' | 'warn' | 'error' = 'info') {
  
  if (logActive || type === 'error' || type === 'warn') {
    const logger = useLogger("nuxtwind")
    if (type === 'info') logger.info(message)
    if (type === 'success') logger.success(message)
    if (type === 'warn') logger.warn(message)
    if (type === 'error') logger.error(message)
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
    debugLog: false,
    theme: {
      primary,
      secondary,
    },
  },
  async setup(_options, _nuxt) {
    nxwLog(_options.debugLog, "Setting up NuxtWind Module");
    //@ts-ignore
    const resolver = createResolver(import.meta.url);
    const runtimeDir = resolver.resolve("./runtime");

    _nuxt.options.build.transpile.push(runtimeDir);

    _nuxt.options.alias["#nuxtwind"] = runtimeDir;

    nxwLog(_options.debugLog, "Calling tailwindcss:config hook");
    _nuxt.hook("tailwindcss:config", function (tailwindConfig) {
      nxwLog(_options.debugLog, "TailwindCSS config hooked");

      //check if tailwindConfig has property 'theme'
      if (tailwindConfig.theme === undefined) {
        nxwLog(_options.debugLog, "Property 'theme' doesn't exist on 'tailwindConfig'. Creating empty instance...", 'warn');
        tailwindConfig.theme = {};
      }
      //check if tailwindConfig.theme has property 'extend'
      if (tailwindConfig.theme.extend === undefined) {
        nxwLog(_options.debugLog, "Property 'extend' doesn't exist on 'tailwindConfig.theme'. Creating empty instance...", 'warn');
        tailwindConfig.theme.extend = {};
      }

      //check if tailwindConfig.theme.extend has property 'keyframes'
      if (tailwindConfig.theme.extend.keyframes === undefined) {
        nxwLog(_options.debugLog, "Property 'keyframes' doesn't exist on 'tailwindConfig.theme.extend'. Creating empty instance...", 'warn');
        tailwindConfig.theme.extend.keyframes = {};
      }

      nxwLog(_options.debugLog, "Appending NuxtWind-Specific keyframes to tailwindConfig");
      //append keyframes to keyframes object and keep the existing keyframes
      tailwindConfig.theme.extend.keyframes = {
        ...tailwindConfig.theme.extend.keyframes,
        "indeterminate-first": {
          "0%": {
            left: "-100%",
            width: "100%",
          },
          "100%": {
            left: "100%",
            width: "10%",
          },
        },
        "indeterminate-second": {
          "0%": {
            left: "-150%",
            width: "100%",
          },
          "100%": {
            left: "100%",
            width: "10%",
          },
        },
      };

      //check if tailwindConfig.theme.extend has property 'animation'
      if (tailwindConfig.theme.extend.animation === undefined) {
        nxwLog(_options.debugLog, "Property 'animation' doesn't exist on 'tailwindConfig.theme.extend'. Creating empty instance...", 'warn');
        tailwindConfig.theme.extend.animation = {};
      }

      nxwLog(_options.debugLog, "Appending NuxtWind-Specific animations to tailwindConfig");
      //append animation to animation object and keep the existing animation
      tailwindConfig.theme.extend.animation = {
        ...tailwindConfig.theme.extend.animation,
        indeterminatebefore: "indeterminate-first 1.5s infinite ease-out",
        indeterminateafter: "indeterminate-second 1.5s infinite ease-in",
      };
    });

    nxwLog(_options.debugLog, "Installing @nuxtjs/color-mode module");
    await installModule("@nuxtjs/color-mode", { classSuffix: "" });
    nxwLog(_options.debugLog, "Installing @nuxtjs/tailwindcss module");
    await installModule("@nuxtjs/tailwindcss", {
      // module configuration
      config: {
        content: {
          files: [resolver.resolve(runtimeDir, "components/**/*.{vue,mjs,ts}")],
        },
        theme: {
          extend: {
            colors: _options.theme,
          },
        },
      },
    });

    nxwLog(_options.debugLog, "Adding components directory");
    //components
    addComponentsDir({
      prefix: _options.prefix,
      path: resolver.resolve(runtimeDir, "components"),
      global: _options.global,
    });

    nxwLog(true, "NuxtWind Module setup complete", 'success');
  },
});
