import Sidebar from "components/Sidebar";
import Topbar from "components/Topbar";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-full  flex flex-row">
      <Sidebar />
      <div className="grow overflow-auto flex flex-col">
        <Topbar />
        <div className="bg-gray-700 grow overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;

//  <div className="h-screen flex ">
//    <Sidebar />
//    <div className="flex flex-col bg-gray-700 h-full overscroll-y-auto">
//      <Topbar />
//      <div className="flex-grow overflow-auto p-4">{children}</div>
//    </div>
//  </div>;
