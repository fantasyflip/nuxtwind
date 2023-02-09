export const useLocaleUrl = (input: string) => {
  const route = useRoute();
  return `/${route.params.locale}/${input}`;
};
