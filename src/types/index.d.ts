declare module "react-redux" {
  interface UseSelector {
    <TState extends AppState, Selected = unknown>(
      selector: (state: TState) => Selected,
      equalityFnOrOptions?: EqualityFn<Selected> | any
    ): Selected;
  }
}

export type FileType = "folder" | "file";

export interface FileNode {
  id: string;
  name: string;
  type: FileType;
  children?: FileNode[];
  parentId?: string | null;
}

export interface FileSystemState {
  root: FileNode[];
  openFolders: Record<string, boolean>;
  openTabs: { id: string; name: string }[];
  activeTab: string | null;
  fileContents: Record<string, string>;
}

export interface AppState {
  fileSystem: FileSystemState;
}

export interface IAddModal {
  open: boolean;
  type?: FileType;
  parentId?: string | null;
}

export interface ContextMenuOption {
  label: string;
  action: () => void;
}

export interface ContextMenuState {
  x: number;
  y: number;
  options: ContextMenuOption[];
}
