"use client";
import { IconButton } from "@mui/material";
import Image from "next/image";
import React, { FC, useCallback, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import AddItemModal from "./AddItemModal";

const Sidebar: FC = () => {
  const [addItemModal, setAddItemModal] = useState<boolean>(false);

  const onCloseAddItemModal = useCallback(() => {
    setAddItemModal(false);
  }, []);
  return (
    <React.Fragment>
      <div className="h-full min-w-72 bg-gray-900 border-r border-r-amber-100">
        <div className="p-2 flex flex-row space-x-3 border-b border-b-amber-100 items-center">
          <Image
            src={"/images/logo.png"}
            height={150}
            width={150}
            alt="logo"
            className="size-[25px] rounded-md"
          />
          <p className="text-xl font-semibold">TEXTIFY</p>

          <div className="ml-auto">
            <IconButton
              onClick={() => setAddItemModal(true)}
              size="small"
              className="!bg-amber-100 rounded-none !p-0.5"
              sx={{ borderRadius: "5px" }}
            >
              <IoMdAdd className="text-whit text-xl" />
            </IconButton>
          </div>
        </div>
        <div className="">Sidebar</div>

        <AddItemModal open={addItemModal} handleClose={onCloseAddItemModal} />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
