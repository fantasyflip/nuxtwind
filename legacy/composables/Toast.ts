export interface Toast {
  id?: string;
  title?: string;
  message?: string;
  duration?: number;
  autoClose?: boolean;
  type?: string;
  icon?: object;
}
const toasts = ref<Toast[]>([]);

export const useToast = (options?: Toast, isBroadcast?: boolean) => {
  if (options) {
    const id = generateId() + (isBroadcast ? "-broadcast" : "");
    const toast: Toast = options;
    if (!options.id) {
      toast.id = id;
    }

    if (isBroadcast) {
      const { post } = useBroadcastChannel({
        name: "broadcast",
      });
      post({ type: "toast", method: "create", payload: toast });
    } else {
      toasts.value.unshift(toast);
    }
  }

  const removeToast = (toast: Toast) => {
    if (toast.id && toast.id.includes("-broadcast")) {
      const { post } = useBroadcastChannel({
        name: "broadcast",
      });
      const newId = toast.id.replace("-broadcast", "");
      post({ type: "toast", method: "remove", payload: newId });
    } else {
      toasts.value = toasts.value.filter((n) => {
        if (!n.id) return false;
        if (!toast.id) return false;
        return !n?.id.includes(toast.id);
      });
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
