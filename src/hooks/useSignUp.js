import { useMutation, useQueryClient } from "@tanstack/react-query";
import { showToast } from "../components/CostumedToast";
import { signUpAPI } from "../lib/api";

export const useSignUp = (signUpData) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending, error } = useMutation({
    // mutationKey: ["signUp"],
    mutationFn: () => signUpAPI(signUpData),
    // update getMe in App.jsx
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
    onError: (error) => {
      // console.error("Sign up error:", error);
      // showToast({
      //   message: error?.message || "Sign up failed. Please try again.",
      //   type: "error",
      // });
    },
  });

  return {
    mutateAsync,
    isPending,
    error,
  };
};
