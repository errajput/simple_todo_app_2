import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
import CustomCheckbox from "./components/CustomCheckbox";
import CustomCheckbox2 from "./components/CustomCheckbox2";
import CustomEdit from "./components/CustomEdit";
import DeleteButton from "./components/DeleteButton";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todo") || "[]"));
  }, []);

  const saveTodo = (updatedTodos) => {
    setTodo(updatedTodos);
    localStorage.setItem("todo", JSON.stringify(updatedTodos));
  };

  const addOrUpdateTodo = () => {
    if (inputValue.trim() === "") return;

    if (editingId) {
      const updatedTodos = todo.map((item) =>
        item.id === editingId ? { ...item, title: inputValue } : item
      );
      saveTodo(updatedTodos);
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        isDone: false,
      };
      saveTodo([...todo, newTodo]);
    }

    setInputValue("");
  };

  const handleEdit = (id) => {
    const item = todo.find((t) => t.id === id);
    setInputValue(item.title);
    setEditingId(id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className=" no-underline md:underline text-3xl font-bold text-blue-500 mb-6">
        Todo App
      </h1>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="border border-blue-400 px-3 py-1 rounded-md outline-none focus:ring-1 ring-blue-400"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addOrUpdateTodo();
            }
          }}
        />

        <button
          className="bg-blue-500 h-8.5 text-white px-4 py-1 rounded-md hover:bg-blue-600  transition cursor-pointer"
          onClick={addOrUpdateTodo}
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>

      <div className="w-full max-w-md">
        {todo.map((v) => (
          <div
            key={v.id}
            className="flex items-center justify-between bg-white shadow-md p-3 mb-3 rounded-md"
          >
            <div className="flex gap-4">
              <CustomCheckbox2
                checked={v.isDone}
                onChange={() => {
                  const updatedTodos = todo.map((item) =>
                    item.id === v.id ? { ...item, isDone: !item.isDone } : item
                  );
                  saveTodo(updatedTodos);
                }}
              />

              <p className={`${v.isDone ? "line-through text-gray-500" : ""}`}>
                {v.title}
              </p>
            </div>

            <div className="flex gap-5">
              <CustomEdit onClick={() => handleEdit(v.id)} />

              <DeleteButton
                onClick={() => {
                  const updatedTodos = todo.filter((item) => item.id !== v.id);
                  saveTodo(updatedTodos);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
