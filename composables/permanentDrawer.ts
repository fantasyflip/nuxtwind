const permanentDrawer = ref(false);

export const usePermanentDrawer = (
  newValue?: boolean,
  updateLocalStorage = true
) => {
  if (typeof newValue === "boolean") {
    permanentDrawer.value = newValue;
    if (updateLocalStorage) {
      localStorage.setItem("permanentDrawer", newValue.toString());
    }
  }
  return permanentDrawer.value;
};
