export const useGithubComponentUrl = (componentName: string) => {
  if (componentName) {
    return `https://github.com/fantasyflip/nuxtwind/tree/main/module/src/runtime/components/${componentName}.vue`;
  } else {
    return "https://github.com/fantasyflip/nuxtwind";
  }
};
