// utils/toast.js
import { toast } from "react-toastify";

export const showSuccessToast = (message) =>
  toast.success(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });

export const showInfoToast = (message) =>
  toast.info(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });

export const showErrorToast = (message) =>
  toast.error(message, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });
