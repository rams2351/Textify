import Image from "next/image";
import { FC } from "react";

const Sidebar: FC = () => {
  return (
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
      </div>
      <div className="">Sidebar</div>
    </div>
  );
};

export default Sidebar;
