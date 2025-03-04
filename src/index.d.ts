export type FileType = "file" | "folder";

export interface FileItem {
  id: string;
  name: string;
  type: FileType;
  parentId: string | null;
  content?: string;
  isExpanded?: boolean;
  children?: string[];
}

export interface FileSystemState {
  entities: Record<string, FileItem>;
  currentFileId: string | null;
  openFiles: string[];
}
