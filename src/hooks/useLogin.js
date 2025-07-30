import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../components/CostumedToast.jsx";
import { loginAPI } from "../lib/api";
import { useTranslation } from "react-i18next";

export const useLogin = () => {
  const { t } = useTranslation("loginPage");
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    // mutationKey: ["signUp"],
    mutationFn: (loginData) => loginAPI(loginData),
    // update getMe in App.jsx
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      showToast({
        message: data?.message || t("toast.useLogin.success"),
        type: "success",
      });
    },
    onError: (error) => {
      showToast({
        message: error?.response?.data?.message || t("toast.useLogin.error"),
        type: "error",
      });
    },
  });
  return {
    mutateAsync,
    isPending,
    error,
  };
};
