export const useOgpImageUrl = (component, description, dir) => {
  let ogp = {
    component: null,
    description: null,
    dir: null,
  };
  if (component) {
    ogp.component = component.replace(/ /g, "%20");
  }
  if (description) {
    ogp.description = description.split(":")[0].replace(/ /g, "%20");
  }
  if (dir) {
    ogp.dir = dir.replace(/ /g, "-");
  }
  let imageUrl = "https://og.nuxtwind.com/api/nuxtwind/component";

  if (ogp.component) {
    if (imageUrl.includes("?")) {
      imageUrl += `&component=${ogp.component}`;
    } else {
      imageUrl += `?component=${ogp.component}`;
    }
  }
  if (ogp.description) {
    if (imageUrl.includes("?")) {
      imageUrl += `&description=${ogp.description}`;
    } else {
      imageUrl += `?description=${ogp.description}`;
    }
  }
  if (ogp.dir) {
    if (imageUrl.includes("?")) {
      imageUrl += `&dir=${ogp.dir}`;
    } else {
      imageUrl += `?dir=${ogp.dir}`;
    }
  }

  return imageUrl;
};
