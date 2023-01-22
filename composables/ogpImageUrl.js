export const useOgpImageUrl = (component, description, dir) => {
  let ogp = {
    component,
    description,
    dir: null,
  };
  if (dir) {
    ogp.dir = dir.replace(/ /g, "-");
  }
  let imageUrl = new URL("https://og.nuxtwind.com/api/nuxtwind/component");
  if (ogp.component) {
    imageUrl.searchParams.append("component", ogp.component);
  }
  if (ogp.description) {
    imageUrl.searchParams.append("description", ogp.description);
  }
  if (ogp.dir) {
    imageUrl.searchParams.append("dir", ogp.dir);
  }

  return imageUrl.href;
};
