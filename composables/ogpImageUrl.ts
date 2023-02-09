export const useOgpImageUrl = (
  component?: string,
  description?: string,
  dir?: string
) => {
  const ogp = {
    component,
    description,
    dir: "",
  };
  if (dir) {
    ogp.dir = dir.replace(/ /g, "-");
  }
  const imageUrl = new URL("https://og.nuxtwind.com/api/nuxtwind/component");
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
