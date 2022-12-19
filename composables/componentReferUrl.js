export const useComponentReferUrl = (component, documentationType, item) => {
  const route = useRoute();
  return `/${route.params.locale}/component/${component}${
    documentationType ? "#" + documentationType + (item ? "-" + item : "") : ""
  }`;
};
