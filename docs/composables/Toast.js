const toasts = ref([]);

export const useToast = (options, isBroadcast) => {
  if (options) {
    const id = generateId() + (isBroadcast ? "-broadcast" : "");
    const toast = options;
    if (!options.id) {
      toast.id = id;
    }

    if (isBroadcast) {
      const { post } = useBroadcastChannel("broadcast");
      post({ type: "toast", method: "create", payload: toast });
    } else {
      toasts.value.unshift(toast);
    }
  }

  const removeToast = (id) => {
    if (id.includes("-broadcast")) {
      const { post } = useBroadcastChannel("broadcast");
      let newId = id.replace("-broadcast", "");
      post({ type: "toast", method: "remove", payload: newId });
    } else {
      toasts.value = toasts.value.filter((n) => !n.id.includes(id));
    }
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
