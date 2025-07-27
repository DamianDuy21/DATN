import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "../lib/api";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending, error } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      queryClient.invalidateQueries(["authUser"]);
    },
  });
  return { mutate, isPending, error };
};
