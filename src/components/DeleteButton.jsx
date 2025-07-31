import { TrashIcon } from "@heroicons/react/20/solid";

const DeleteButton = ({ onClick }) => {
  return (
    <button
      className="bg-red-500 text-white hover:bg-red-700 px-2 py-2 rounded-md transition cursor-pointer"
      onClick={onClick}
    >
      <TrashIcon className="h-5 w-5" />
    </button>
  );
};
export default DeleteButton;
