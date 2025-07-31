import React from "react";
import { PencilIcon } from "@heroicons/react/20/solid";

const CustomEdit = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      aria-label="Edit"
      className="bg-yellow-500 text-white hover:bg-yellow-600 px-2 py-2 rounded-md transition cursor-pointer"
    >
      <PencilIcon className="h-5 w-5" />
    </button>
  );
};
export default CustomEdit;
