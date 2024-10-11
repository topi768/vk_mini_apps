import { apiUrls, instance } from "../api/instance";

export const getRatingTop5 = async () => {
  const response = await instance.get(apiUrls.rating.top5);

  return response.data;
};
