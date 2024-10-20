import { useState } from "react";
import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { useCreateLvl } from "../../hooks/useCreateLvl";

interface GameLvlApiProps {
  className?: string;
  uploadData: {
    id: number;
    url: string;
  };
}

export const GameLvlApi: React.FC<GameLvlApiProps> = ({
  className = "",
  uploadData,
}) => {
  const [lvl, setLvl] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [countCatOnLvl] = useState<number>(5);
  const [crop, setCrop] = useState<Crop>();
  const [numberGameLvlCat, setNumberGameLvlCat] = useState(1);
  const [GameLvlCatsList, setGameLvlCatsList] = useState<GameLvlCatItem[]>([]);
  type GameLvlCatItem = {
    fileId: number;
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
  };

  const onCreateGameLvlCat = () => {
    setNumberGameLvlCat(numberGameLvlCat + 1);
    console.log(crop);

    setGameLvlCatsList([
      ...GameLvlCatsList,
      {
        fileId: numberGameLvlCat,
        unit: crop?.unit || "",
        x: crop?.x || 0,
        y: crop?.y || 0,
        width: crop?.width || 0,
        height: crop?.height || 0,
      },
    ]);
  };
  const { mutate: createLvl, error: createLvlError } = useCreateLvl();

  const onCreateGameLvl = () => {
    if (lvl > 0 && duration > 0 && GameLvlCatsList.length === countCatOnLvl) {
      createLvl(
        {
          lvl: lvl,
          duration: duration,
          gameLvlCats: GameLvlCatsList,
        },

        {
          onSuccess: () => {
            console.log(`Successfully created/updated game level ${lvl}`);
          },
          onError: (error) => {
            console.error(`Failed to create/update game level ${lvl}:`, error);
          },
        },
      );
    } else {
      console.error(
        "Invalid data: Ensure that lvl, duration, and GameLvlCatsList are properly set.",
      );
    }
  };

  return (
    <div className={className}>
      <h2 className="text-center text-2xl">Create GameLvl</h2>
      <div className="border-2 border-black p-4">
        <h3>GameLvl</h3>
        <input
          value={1}
          type="number"
          placeholder="Enter lvl"
          onChange={(e) => setLvl(Number(e.target.value))}
        />
        <input
          value={30}
          type="number"
          placeholder="Enter duration"
          onChange={(e) => setDuration(Number(e.target.value))}
        />

        {uploadData && (
          <>
            <p>x: {crop?.x}</p>
            <p>y: {crop?.y}</p>
            <p>width: {crop?.width}</p>
            <p>height: {crop?.height}</p>
            <p>unit: {crop?.unit}</p>
            <ReactCrop
              crop={crop}
              onChange={(crop, percentCrop) => {
                setCrop(percentCrop);
              }}
            >
              <img src={"https://fc.nxt.zbc.su/" + uploadData.url} />
            </ReactCrop>
            {numberGameLvlCat <= countCatOnLvl && (
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onCreateGameLvlCat}
              >
                <p>
                  {numberGameLvlCat + " "}
                  create cat
                </p>
              </button>
            )}
            {GameLvlCatsList.length === countCatOnLvl && (
              <button
                onClick={onCreateGameLvl}
                className="bg-blue-500  text-white font-bold py-2 px-4 rounded"
              >
                create lvl
              </button>
            )}
            {createLvlError && (
              <p>Error creating level: {createLvlError.message}</p>
            )}
            <details>
              <summary>GameLvlCats</summary>
              <div>
                {GameLvlCatsList.length > 0 ? (
                  <>
                    {GameLvlCatsList.map((cat, index) => (
                      <div key={index} className="game-lvl-cat-item">
                        <h3>Game Level Category {index + 1}</h3>
                        <p>File ID: {cat.fileId}</p>
                        <p>Unit: {cat.unit}</p>
                        <p>
                          X: {cat.x}, Y: {cat.y}
                        </p>
                        <p>
                          Width: {cat.width}, Height: {cat.height}
                        </p>
                        <br />
                      </div>
                    ))}
                  </>
                ) : (
                  <p>No game level categories yet.</p>
                )}
              </div>
            </details>
          </>
        )}
      </div>
      ;
    </div>
  );
};
