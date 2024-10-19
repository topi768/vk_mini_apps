import { FC, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useFileUpload } from "../hooks/useFileUpload";
import { useFileDelete } from "../hooks/useFileDelete";
import { useGetAchiement } from "../hooks/useGetAchiement";
import { useCreateLvl } from "../hooks/useCreateLvl";

import ReactCrop, { type Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

export interface AdminPanelProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const AdminPanel: FC<AdminPanelProps> = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>();
  const [lvl, setLvl] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [countCatOnLvl, setCountCatOnLvl] = useState<number>(5);
  const [crop, setCrop] = useState<Crop>();
  const [numberGameLvlCat, setNumberGameLvlCat] = useState(1);
  const [GameLvlCatsList, setGameLvlCatsList] = useState<GameLvlCatItem[]>([]);

  const {
    data: achievementData,
    isPending: isAchievementPending,
    error: achievementError,
  } = useGetAchiement();

  const {
    mutate: uploadFile,
    isPending: isUploadPending,
    error: uploadError,
    data: uploadData,
  } = useFileUpload();

  const {
    mutate: deleteFile,
    isPending: isDeletePending,
    error: deleteError,
    data: deleteData,
  } = useFileDelete();

  const { mutate: createLvl, error: createLvlError } = useCreateLvl();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  const handleDelete = () => {
    if (fileName) {
      deleteFile(fileName);
    }
  };

  const onCreateGameLvlCat = () => {
    setNumberGameLvlCat(numberGameLvlCat + 1);
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

  interface GameLvlCatItem {
    fileId: number;
    unit: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }

  return (
    <Panel id={id}>
      <h2 className="text-center text-2xl">Admin File Storage</h2>
      <div className="border-2 border-black p-4">
        <h3>Upload img</h3>
        <input
          accept=".jpg,.jpeg,.png,.webp,.gif,.svg"
          type="file"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={isUploadPending}>
          Upload
        </button>
        {isUploadPending && <p>Uploading...</p>}
        {uploadError && <p>Error uploading img: {uploadError.message}</p>}
        {uploadData && (
          <div>
            <p>Upload successful!</p>
            <p>img URL: {uploadData.url}</p>
            <p>img ID: {uploadData.id}</p>
          </div>
        )}
      </div>
      <div className="border-2 border-black p-4">
        <h3>Delete File by ID</h3>
        <div>
          <input
            type="text"
            placeholder="Enter file src"
            onChange={(e) => setFileName(e.target.value)}
          />
          <button onClick={handleDelete} disabled={isDeletePending}>
            Delete File
          </button>
          {isDeletePending && <p>Deleting...</p>}
          {deleteError && <p>Error deleting file: {deleteError.message}</p>}
          {deleteData && <p>File deleted successfully!</p>}
        </div>
      </div>

      <h2 className="text-center text-2xl">Admin Achievement API</h2>

      <div className="border-2 border-black p-4">
        <h3>Achievement</h3>
        {isAchievementPending && <p>Loading achievement...</p>}
        {achievementError && (
          <p>Error loading achievement: {achievementError.message}</p>
        )}
        {achievementData && <div>{achievementData}</div>}
      </div>

      <h2 className="text-center text-2xl">Admin GameLvl Api</h2>

      <div className="border-2 border-black p-4">
        <h3>GameLvl</h3>
        <input
          type="number"
          placeholder="Enter lvl"
          onChange={(e) => setLvl(Number(e.target.value))}
        />
        <input
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
            <ReactCrop crop={crop} onChange={(c) => setCrop(c)}>
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
    </Panel>
  );
};
