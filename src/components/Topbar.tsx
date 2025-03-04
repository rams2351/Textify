import { FC } from "react";

const Topbar: FC = () => {
  return (
    <div className="bg-gray-900 min-h-[45px] border-b border-b-amber-100 overflow-x-auto flex flex-row sticky top-0 custom-scrollbar">
      {[
        1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, 4, 5, 6,
        7, 8, 9, 0, 1, 1, 1, 1, 1, 1, 1, 1,
      ].map((d, i) => (
        <div key={i} className="h-full min-w-80 flex  bg-black-50 text-black">
          Topbar {d}
        </div>
      ))}
    </div>
  );
};

export default Topbar;
