"use client";
import { Button } from "@mui/material";
import { FC } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/slices/reducer";

const FileEditor: FC = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.fileSystem.activeTab);
  const fileContents = useSelector((state) => state.fileSystem.fileContents);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!activeTab) return;
    dispatch(
      actions.updateFileContent({ id: activeTab, content: e.target.value })
    );
  };

  const handleSave = () => {
    if (!activeTab) return;
    dispatch(actions.saveFile(activeTab));
    toast.success("File saved successfully!");
  };

  if (!activeTab)
    return (
      <div className="h-full flex text-3xl font-medium w-full items-center justify-center">
        Create or select file for view here!.
      </div>
    );

  return (
    <div className="h-full p-2 last:grow relative">
      <textarea
        className="w-full h-full  border rounded bg-transparent p-8"
        value={fileContents[activeTab] ?? ""}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        className="bg-primary !text-gray-700 capitalize mt-2 absolute top-5 right-5 px-4 py-1 rounded"
        onClick={handleSave}
      >
        Save
      </Button>
    </div>
  );
};

export default FileEditor;
