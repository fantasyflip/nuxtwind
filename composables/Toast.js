const toasts = ref([]);

export const useToast = (options) => {
  if (options) {
    const id = generateId();
    const toast = { ...options, id };
    toasts.value.unshift(toast);
  }

  const removeToast = (id) => {
    toasts.value = toasts.value.filter((n) => n.id !== id);
  };

  const stopBodyOverflow = () => {
    document && document.body.classList.add(...["hide-overflow"]);
  };

  const allowBodyOverflow = () => {
    document && document.body.classList.remove(...["hide-overflow"]);
  };

  return {
    toasts,
    removeToast,
    stopBodyOverflow,
    allowBodyOverflow,
  };
};
