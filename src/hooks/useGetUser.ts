import { useQuery } from "@tanstack/react-query";
import { getUserData } from "../api/appInfo/user";

export const useGetUserData = () => {
  return useQuery({
    queryKey: ["UserData"],
    queryFn: async () => await getUserData(),
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
};
