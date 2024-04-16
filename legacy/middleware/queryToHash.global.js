export default defineNuxtRouteMiddleware((to) => {
  if (to.query && to.query.hash) {
    let hash = to.query.hash;
    let query = to.query;
    delete query.hash;
    const router = useRouter();
    router.replace({
      path: to.path,
      query,
      hash: "#" + hash,
    });
  }
});
