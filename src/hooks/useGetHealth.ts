import { useQuery } from "@tanstack/react-query";
import { getHealth } from "../services/api";

export const useGetHealth = () => {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: getHealth,
    select: (data) => data.data,
  });
};
