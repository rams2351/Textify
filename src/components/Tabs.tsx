"use client";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "redux/slices/reducer";

const Tabs: FC = () => {
  const dispatch = useDispatch();
  const openTabs = useSelector((state) => state.fileSystem.openTabs);
  const activeTab = useSelector((state) => state.fileSystem.activeTab);

  return (
    <div className="bg-gray-900 min-h-[45px] border-b border-b-amber-100 overflow-x-auto flex flex-row sticky top-0 custom-scrollbar">
      {openTabs?.map((tab, index) => (
        <div
          key={index}
          className={`px-4 py-2 cursor-pointer ${
            activeTab === tab.id
              ? "bg-gray-800 border-l border-r text-amber-200 border-amber-50"
              : "bg-gray-950"
          }`}
          onClick={() => dispatch(actions.openFile(tab))}
        >
          {tab.name}
          <span
            className="ml-2 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(actions.closeFile(tab.id));
            }}
          >
            x
          </span>
        </div>
      ))}
    </div>
  );
};

export default Tabs;
