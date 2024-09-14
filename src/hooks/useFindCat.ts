import { useQuery } from "@tanstack/react-query";
import { getFindCat } from "../services/api";

export const useFindCat = () => {
  return useQuery({
    queryKey: ["repoData"],
    queryFn: getFindCat,
    select: (data) => data.data,
  });
};
