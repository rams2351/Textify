"use client";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/slices/reducer";
import { ContextMenuState, FileNode, IAddModal } from "types";
import AddNewModal from "./AddNewModal";
import ContextMenu from "./ContextMenu";

const Sidebar: FC = () => {
  const [addModal, setAddModal] = useState<IAddModal>({
    open: false,
  });
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);

  const dispatch = useDispatch();
  const fileSystem = useSelector((state) => state.fileSystem.root);
  const openFolders = useSelector((state) => state.fileSystem.openFolders);

  const onCloseAddItemModal = useCallback(() => {
    setAddModal({ open: false });
  }, []);

  const handleRightClick = useCallback(
    (event: React.MouseEvent, node: FileNode) => {
      event.preventDefault();

      setContextMenu({
        x: event.pageX,
        y: event.pageY,
        options:
          node.type === "folder"
            ? [
                {
                  label: "📄 Create File",
                  action: () => {
                    setAddModal({
                      open: true,
                      type: "file",
                      parentId: node.id,
                    }),
                      setContextMenu(null);
                  },
                },
                {
                  label: "📁 Create Folder",
                  action: () => {
                    setAddModal({
                      open: true,
                      type: "folder",
                      parentId: node.id,
                    }),
                      setContextMenu(null);
                  },
                },
                {
                  label: "🗑 Delete Folder",
                  action: () => {
                    dispatch(actions.deleteItem(node.id)), setContextMenu(null);
                    setContextMenu(null);
                  },
                },
              ]
            : [
                {
                  label: "🗑 Delete File",
                  action: () => {
                    setContextMenu(null);
                    dispatch(actions.deleteItem(node.id));
                  },
                },
              ],
      });
    },
    [addModal]
  );

  const handleFileClick = useCallback((node: FileNode) => {
    if (node.type === "file" && node.name.endsWith(".txt")) {
      dispatch(actions.openFile({ id: node.id, name: node.name }));
    }
  }, []);

  const renderTree = useCallback(
    (nodes: FileNode[]) => {
      return (
        <ul className="ml-4">
          {nodes.map((node, index) => (
            <li key={index} className="my-1 w-full">
              <span
                onClick={() => {
                  setContextMenu(null);
                  node.type === "folder"
                    ? dispatch(actions.toggleFolder(node.id))
                    : handleFileClick(node);
                }}
                className="cursor-pointer truncate hover:border-gray-400 border border-transparent px-2 rounded-sm w-full flex"
                onContextMenu={(e) => {
                  handleRightClick(e, node);
                }}
              >
                {node.type === "folder"
                  ? openFolders[node.id]
                    ? "📂"
                    : "📁"
                  : "📄"}{" "}
                {node.name}
              </span>
              {node.children &&
                openFolders[node.id] &&
                renderTree(node.children)}
            </li>
          ))}
        </ul>
      );
    },
    [openFolders]
  );

  return (
    <React.Fragment>
      <div className="h-full min-w-72 max-w-72 bg-gray-900 border-r border-r-amber-100">
        <div className="p-2 flex flex-row border-b border-b-amber-100 items-center w-full">
          <Image
            src={"/images/logo.png"}
            height={150}
            width={150}
            alt="logo"
            className="size-[25px] rounded-md"
          />
          <p className="text-xl font-semibold px-3">TEXTIFY</p>

          <IconButton
            onClick={() => setAddModal({ open: true })}
            size="small"
            className="bg-amber-100 rounded-md p-0.5 ml-auto mr-2"
            sx={{ borderRadius: "5px" }}
          >
            <IoMdAdd className="text-whit text-xl" />
          </IconButton>
        </div>
        <div className="">
          <div className="relative p-2">
            {renderTree(fileSystem)}

            {contextMenu && (
              <ContextMenu
                {...contextMenu}
                onClose={() => setContextMenu(null)}
              />
            )}
          </div>
        </div>

        <AddNewModal
          open={addModal?.open}
          handleClose={onCloseAddItemModal}
          type={addModal.type}
          parentId={addModal.parentId ?? undefined}
        />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
