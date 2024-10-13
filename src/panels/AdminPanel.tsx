import { FC, useState } from "react";
import { Panel, NavIdProps } from "@vkontakte/vkui";
import { UserInfo } from "@vkontakte/vk-bridge";
import { useFileUpload } from "../hooks/useFileUpload";
import { useFileDelete } from "../hooks/useFileDelete";
import { useGetAchiement } from "../hooks/useGetAchiement";

export interface AdminPanelProps extends NavIdProps {
  fetchedUser?: UserInfo;
}

export const AdminPanel: FC<AdminPanelProps> = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileId, setFileId] = useState<string>();
  const { data } = useGetAchiement();
  const { mutate: uploadFile, isPending } = useFileUpload();
  const { mutate: deleteFile, error } = useFileDelete();

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
    if (fileId) {
      deleteFile(fileId);
    }
  };

  return (
    <Panel id={id}>
      <h2 className="text-center text-2xl">Admin File storage</h2>
      <div className="border-2 border-black p-4">
        <h3>Upload img</h3>
        <input
          accept=".jpg,.jpeg,.png,.webp,.gif,.svg"
          type="file"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} disabled={isPending}>
          Upload
        </button>
        {isPending && <p>Uploading...</p>}
        {error && <p>Error uploading img: {error.message}</p>}
        {data && (
          <div>
            <p>Upload successful!</p>
            <p>img URL: {data.url}</p>
            <p>img ID: {data.id}</p>
          </div>
        )}
      </div>
      <div className="border-2 border-black p-4">
        <h3>Delete File by id</h3>
        <div>
          <input
            type="text"
            placeholder="Enter file ID"
            onChange={(e) => setFileId(e.target.value)}
          />
          <button onClick={handleDelete}>Delete File</button>
          {error && <p>Error deleting file: {error.message}</p>}
          {data && <p>File deleted successfully!</p>}
        </div>
      </div>

      <h2 className="text-center text-2xl">Admin Achievement Api</h2>

      <div className="border-2 border-black p-4">
        <h3>Achievement</h3>
        {data}
      </div>
    </Panel>
  );
};
