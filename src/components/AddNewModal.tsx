import {
  Button,
  FormControl,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "redux/slices/reducer";
import { FileType } from "types";
import { v4 as uuid } from "uuid";

interface IProps {
  open: boolean;
  parentId?: string;
  type?: FileType;
  handleClose: () => void;
}

const AddNewModal: FC<IProps> = ({ open, handleClose, type, parentId }) => {
  const [fileType, setFileType] = useState<FileType>("folder");
  const [name, setName] = useState<string>("");
  const dispatch = useDispatch();

  const handleCreate = useCallback(() => {
    if (!name.trim()) return;
    dispatch(
      actions.addItem({
        name:
          type === "file" && !name.trim().endsWith(".txt")
            ? name.trim() + ".txt"
            : name.trim(),
        type: type ?? fileType,
        parentId,
        id: uuid(),
      })
    );
    handleClose();
    setName("");
  }, [name, parentId, fileType]);

  const handleChange = useCallback((event: SelectChangeEvent) => {
    setFileType(event.target.value as any);
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="flex items-center justify-center"
    >
      <div className="bg-gray-600 p-5 min-w-[350px] rounded-xl">
        <p className="text-xl font-medium mb-3 ">Add {type ?? fileType}</p>

        <div className="">
          {!type && (
            <FormControl
              fullWidth
              className="bg-primary border-none outline-none rounded-md mb-5"
            >
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fileType}
                onChange={handleChange}
              >
                <MenuItem value={"folder"}>Folder</MenuItem>
                <MenuItem value={"file"}>File</MenuItem>
              </Select>
            </FormControl>
          )}
          <TextField
            className="w-full bg-primary rounded-md mb-8"
            placeholder={`Enter ${type ?? fileType} name`}
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>

        <div className="flex justify-end">
          <Button
            variant="contained"
            className="bg-primary !text-gray-700 capitalize"
            onClick={handleCreate}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddNewModal;
