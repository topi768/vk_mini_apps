import { apiUrls, instance } from "../instance";

export const getUserFetcher = async () => {
  const response = await instance.get(apiUrls.user.data);
  console.log(response.data);

  return response.data;
};
