import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "../lib/api";
import { showToast } from "../components/CostumedToast";

export const useLogin = (loginData) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    // mutationKey: ["signUp"],
    mutationFn: () => loginAPI(loginData),
    // update getMe in App.jsx
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
      showToast({
        message: "Sign in successful! Welcome back.",
        type: "success",
      });
    },
    onError: (error) => {
      console.error("Login error:", error);
      showToast({
        message: error?.message || "Login failed. Please try again.",
        type: "error",
      });
    },
  });
  return {
    mutate,
    isPending,
    error,
  };
};
