# NuxtWind

A library of Nuxt 3 components styled with TailwindCSS. The design and useability is inspired by Vuetify and Flowbite.

## :book: Documentation

For full documentation visit [NuxtWind](https://nuxtwind.com/).

## :rocket: Getting started

Since the components don't require any installation the process to get them working is pretty straight forward.

1. Search through the components on [NuxtWind](https://nuxtwind.com/) until you find the component you were searching for. If you can't find a suitable component feel free to [request](#star--requesting-components) it
2. Click on the github icon on the top-right corner. This will open up the components source-code.
3. Copy the complete source-code, create a component in your project and paste the copied source-code.
4. Check dependencies of the selected component on [NuxtWind](https://nuxtwind.com/) in the caveat-section. If there is no caveat-section. You're good to go to use your new component. Documentation on how to customize the component can also be found on [NuxtWind](https://nuxtwind.com/). If there is one refer to [Handling Caveats](#chains-handling-caveats).

## :chains: Handling Caveats

Some components depend on other components, require NPM-Packages or need specific changes to your TailwindCSS configuration file.

### :link: Depending on other Components

When a component depends on another one this is mentioned in the caveat section on [NuxtWind](https://nuxtwind.com/) of the parent component. You need to repeat the steps mentioned in [Getting started](#getting-started) for the child component(s).

### :package: Require NPM-Packages

When a component requires one or more NPM-Packages this is mentioned in the caveat section on [NuxtWind](https://nuxtwind.com/) of the component. Install them to get the components to work in the inteded way.

#### Avoiding Unplugin-Icons-Package

If you chose a component that requires the [unplugin-icons-package](https://github.com/antfu/unplugin-icons) and you want to use your own icons you can simply remove the icons out of the source-code you copied earlier and replace them with your own icons.

### :gear: Changes to TailwindCSS configuration

When a component needs specific changes to your TailwindCSS configuration this is mentioned in the caveat section on [NuxtWind](https://nuxtwind.com/) of the component. Adjust your configuration as mentioned there. You'll need to restart your Nuxt 3 Dev-Server for the changes to take effect.

## :star: Requesting components

If you can't find the component you're searching for feel free to open an issue in this repository including the following information:

- Name of the Component
- Use
- Example

#### Example:

    Issue-Title: [Component-Request]: Navbar

    Issue-Body:

        Name: Navbar
        Use: A bar to stick at the top of
        the application to provide navigation for the user.
        Example: https://vuetifyjs.com/en/components/app-bars/

## :speech_balloon: Further questions / Contact

If you have further questions or just want to chat about component ideas feel free to hit me up:

[Discord-Profile](https://discordapp.com/users/171313670096289792)
