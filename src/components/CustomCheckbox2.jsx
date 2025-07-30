import { CheckIcon } from "@heroicons/react/20/solid";

const CustomCheckbox2 = ({ checked, onChange }) => {
  return (
    <label className="relative cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer hidden"
      />
      <div className="h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-200 peer-checked:bg-green-500 peer-checked:border-green-500 ">
        <CheckIcon className="h-4 w-4 text-white" />
      </div>
    </label>
  );
};

export default CustomCheckbox2;
