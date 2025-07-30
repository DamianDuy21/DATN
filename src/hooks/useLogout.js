import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../lib/api";
import { showToast } from "../components/CostumedToast.jsx";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
      showToast({
        message: "Logout successful!",
        type: "success",
      });
    },
  });
  return { mutate, isPending, error };
};
