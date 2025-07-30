import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../lib/api";
import { showToast } from "../components/CostumedToast.jsx";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, error } = useMutation({
    // mutationKey: ["signUp"],
    mutationFn: (loginData) => loginAPI(loginData),
    // update getMe in App.jsx
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      showToast({
        message: "Sign in successful!",
        type: "success",
      });
    },
    onError: (error) => {
      showToast({
        message: error?.response?.data?.message || "Sign in failed",
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
