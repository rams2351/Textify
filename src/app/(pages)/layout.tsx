import Sidebar from "components/Sidebar";
import Tabs from "components/Tabs";
import { FC, PropsWithChildren } from "react";

const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="h-screen w-full  flex flex-row">
      <Sidebar />
      <div className="grow overflow-auto flex flex-col">
        <Tabs />
        <div className="bg-gray-700 grow overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default PageLayout;
