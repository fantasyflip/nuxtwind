const permanentDrawer = ref(false);

export const usePermanentDrawer = (newValue, updateLocalStorage = true) => {
  if (typeof newValue === "boolean") {
    permanentDrawer.value = newValue;
    if (updateLocalStorage) {
      localStorage.setItem("permanentDrawer", newValue);
    }
  }
  return permanentDrawer.value;
};
