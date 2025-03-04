import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileItem } from "types";
import { v6 as uuid } from "uuid";

const initialState: any = {
  entities: {
    root: {
      id: "root",
      name: "Root",
      type: "folder",
      parentId: null,
      isExpanded: true,
      children: [],
    },
  } as Record<string, FileItem>,
  currentFileId: null,
  openFiles: [],
};

export const fileSystemSlice = createSlice({
  name: "filesystem",
  initialState,
  reducers: {
    createItem: (state, action: PayloadAction<Omit<FileItem, "id">>) => {
      const id = uuid();
      const parent = state.entities[action.payload.parentId || "root"];
      parent.children?.push(id);
      state.entities[id] = { ...action.payload, id };
    },
    toggleFolder: (state, action: PayloadAction<string>) => {
      const item = state.entities[action.payload];
      if (item.type === "folder") {
        item.isExpanded = !item.isExpanded;
      }
    },
    // Add other reducers for editing, deleting, etc.
  },
});
