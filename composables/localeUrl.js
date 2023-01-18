export const useLocaleUrl = (input) => {
  const route = useRoute();
  return `/${route.params.locale}/${input}`;
};
