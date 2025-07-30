import { useEffect, useState } from "react";
import {
  CheckIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/20/solid";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  // const [editingId, setEditingId] = useState("");

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todo") || "[]"));
  }, [setTodo]);

  const addTodo = () => {
    if (inputValue !== "") {
      const newValue = {
        isDone: false,
        title: inputValue,
        id: Date.now(),
      };
      setTodo([...todo, newValue]);
      localStorage.setItem("todo", JSON.stringify([...todo, newValue]));

      setInputValue("");
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = todo.find((v) => v.id === id);
    setInputValue(itemToEdit.title);
    // setEditingId(id);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo App</h1>

      <div className="flex  items-center gap-2 mb-4">
        <input
          type="text"
          className="border px-3 py-1 rounded-md outline-none focus:ring-2 ring-blue-400"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTodo();
            }
          }}
        />

        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition cursor-pointer"
          onClick={() => {
            addTodo();
          }}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="w-full max-w-md">
        {todo.map((v) => {
          return (
            <div
              key={v.id}
              className="flex items-center justify-between bg-white shadow-md p-3 mb-3 rounded-md"
            >
              <div className="flex gap-4">
                <label className="relative cursor-pointer">
                  <input
                    type="checkbox"
                    checked={v.isDone}
                    onChange={() => {
                      const newTodo = todo.map((v2) =>
                        v.id === v2.id ? { ...v2, isDone: !v2.isDone } : v2
                      );

                      setTodo(newTodo);
                      localStorage.setItem(
                        "todo",
                        JSON.stringify([...newTodo])
                      );
                    }}
                    className="peer hidden"
                  />
                  <div className="h-6 w-6 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-200 peer-checked:bg-blue-500 peer-checked:border-blue-500 ">
                    <CheckIcon className="h-4 w-4 text-white todo-list transition-opacity duration-200" />
                  </div>
                </label>

                <p
                  className={`${v.isDone ? "line-through text-gray-500" : ""}`}
                >
                  {v.title}
                </p>
              </div>

              <div className="flex gap-5">
                <button
                  onClick={() => handleEdit(v.id)}
                  className="bg-yellow-500 text-white hover:bg-yellow-600 px-2 py-0.5 rounded-md transition cursor-pointer"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>

                <button
                  className="bg-red-500 text-white hover:text-red-700 px-2 py-0.5 rounded-md transition cursor-pointer"
                  onClick={() => {
                    const newTodo = todo.filter((v2) => {
                      if (!(v.id === v2.id)) {
                        return true;
                      }
                    });

                    setTodo(newTodo);
                    localStorage.setItem("todo", JSON.stringify([...newTodo]));
                  }}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
