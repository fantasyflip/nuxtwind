export const useComponentReferUrl = (
  component: string,
  documentationType: string,
  item?: string
) => {
  const route = useRoute();
  return `/${route.params.locale}/component/${component}${
    documentationType ? "#" + documentationType + (item ? "-" + item : "") : ""
  }`;
};
