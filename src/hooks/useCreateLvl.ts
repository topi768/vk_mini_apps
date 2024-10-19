import { useMutation } from "@tanstack/react-query";
import { createLvl } from "../api/admin/gameLvl.ts";

export const useCreateLvl = () => {
  return useMutation({
    mutationFn: async (gameLevelData: {
      lvl: number;
      duration: number;
      gameLvlCats: Array<{
        fileId: number;
        unit: string;
        x: number;
        y: number;
        width: number;
        height: number;
      }>;
    }) => {
      console.log("created lvl ", gameLevelData);

      try {
        const result = await createLvl(
          gameLevelData.lvl,
          gameLevelData.duration,
          gameLevelData.gameLvlCats,
        );

        return result;
      } catch (error) {
        console.error("Error creating/updating game level:", error);
        throw error;
      }
    },
    onSuccess: (data, variables) => {
      console.log(`Successfully created/updated game level ${variables.lvl}!`);
    },
    onError: (error, variables, context) => {
      console.error(
        `Failed to create/update game level ${variables.lvl}:`,
        error,
      );
    },
    retry: 3,
  });
};
