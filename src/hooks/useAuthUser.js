import { useQuery } from "@tanstack/react-query";
import { getAuthUserAPI } from "../lib/api";

export const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUserAPI,
    retry: false,
  });
  return {
    isLoading: authUser.isLoading,
    authUser: authUser.data?.data,
    error: authUser.error,
  };
};
