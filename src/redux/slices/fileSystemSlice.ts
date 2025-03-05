import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileNode, FileSystemState } from "types";

const initialState: FileSystemState = {
  root: [],
  openFolders: {},
  openTabs: [],
  activeTab: null,
  fileContents: {},
};

export const fileSystemSlice = createSlice({
  name: "fileSystem",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<FileNode>) => {
      const { id, name, type, parentId } = action.payload;
      const formattedName =
        type === "file" && !name.endsWith(".txt") ? name + ".txt" : name;

      const newItem: FileNode = {
        id,
        name: formattedName,
        type,
        children: type === "folder" ? [] : undefined,
        parentId,
      };

      if (!parentId) {
        state.root.push(newItem);
      } else {
        const findAndAdd = (nodes: FileNode[]) => {
          for (const node of nodes) {
            if (node.id === parentId && node.type === "folder") {
              node.children?.push(newItem);
              return;
            }
            if (node.children) findAndAdd(node.children);
          }
        };
        findAndAdd(state.root);
      }
    },

    deleteItem: (state, action: PayloadAction<string>) => {
      const idToDelete = action.payload;
      let idsToRemove = new Set<string>([idToDelete]);

      const collectIds = (nodes: FileNode[]) => {
        for (const node of nodes) {
          idsToRemove.add(node.id);
          if (node.children) {
            node.children.forEach((child) => collectIds([child]));
          }
        }
      };

      const findAndCollect = (nodes: FileNode[]) => {
        for (const node of nodes) {
          if (node.id === idToDelete) {
            if (node.type === "folder") collectIds([node]);
            break;
          } else if (node.children) {
            findAndCollect(node.children);
          }
        }
      };

      findAndCollect(state.root);

      const removeNode = (nodes: FileNode[]): FileNode[] => {
        return nodes.filter((node) => {
          if (idsToRemove.has(node.id)) return false;
          if (node.children) node.children = removeNode(node.children);
          return true;
        });
      };

      state.root = removeNode(state.root);

      state.openTabs = state.openTabs.filter((tab) => !idsToRemove.has(tab.id));

      if (state.activeTab && idsToRemove.has(state.activeTab)) {
        state.activeTab =
          state.openTabs.length > 0 ? state.openTabs[0].id : null;
      }
    },

    toggleFolder: (state, action: PayloadAction<string>) => {
      state.openFolders[action.payload] = !(
        state.openFolders[action.payload] ?? false
      );
    },

    openFile: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const { id, name } = action.payload;

      if (!state.openTabs.some((tab) => tab.id === id)) {
        state.openTabs.push({ id, name });
      }

      state.activeTab = id;
      state.fileContents[id] = localStorage.getItem(id) ?? "";
    },

    closeFile: (state, action: PayloadAction<string>) => {
      state.openTabs = state.openTabs.filter(
        (tab) => tab.id !== action.payload
      );

      if (state.activeTab === action.payload) {
        state.activeTab =
          state.openTabs.length > 0 ? state.openTabs[0].id : null;
      }
    },

    updateFileContent: (
      state,
      action: PayloadAction<{ id: string; content: string }>
    ) => {
      state.fileContents[action.payload.id] = action.payload.content;
    },

    saveFile: (state, action: PayloadAction<string>) => {
      if (state.fileContents[action.payload] !== undefined) {
        localStorage.setItem(
          action.payload,
          state.fileContents[action.payload]
        );
      }
    },
  },
});
