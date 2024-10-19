import { apiUrls, instance } from "../instance";

export const createLvl = async (
  lvl: number,
  duration: number,
  gameLvlCats: Array<{
    fileId: number;
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>,
) => {
  try {
    const response = await instance.post(
      `${apiUrls.admin.game.lvl}`,
      {
        lvl,
        duration,
        gameLvlCats,
      },
      {
        timeout: 10000,
      },
    );

    return response.data;
  } catch (error) {
    console.error("Error creating/updating game level category:", error);
    throw new Error("Failed to create/update game level category");
  }
};
