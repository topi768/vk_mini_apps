import { apiUrls, instance } from "../api/instance";

export const getLvls = async () => {
  const response = await instance.get(apiUrls.game.lvls);

  return response.data;
};
