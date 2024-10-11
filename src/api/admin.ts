import { apiUrls, instance } from "./instance";

export const getToken = async () => {
  const response = await instance.post(apiUrls.admin.login, {
    username: "findcatadmin",
    password: "a2Vx68vUFdRFEYUSmxZd",
  });

  return response.data.token;
};
