import { FC, useEffect } from "react";

interface ContextMenuProps {
  x: number;
  y: number;
  options: { label: string; action: () => void }[];
  onClose: () => void;
}

const ContextMenu: FC<ContextMenuProps> = ({ x, y, options, onClose }) => {
  useEffect(() => {
    const handleClickOutside = () => onClose();
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div
      className="absolute min-w-[180px] bg-gray-600 shadow-md border rounded z-50"
      style={{ top: y - 40, left: x }}
    >
      {options.map((option, index) => (
        <div
          key={index}
          className="px-4 py-2 hover:bg-gray-500 cursor-pointer"
          onClick={option.action}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
