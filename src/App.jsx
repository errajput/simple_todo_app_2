import { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");

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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Todo App</h1>

      <div className="flex items-center gap-2 mb-4">
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
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition"
          onClick={() => {
            addTodo();
          }}
        >
          Add
        </button>
      </div>
      <div className="w-full max-w-md justify-between">
        {todo.map((v) => {
          return (
            <div
              key={v.id}
              className="flex items-center justify-between bg-white shadow-md p-3 mb-3 rounded-md"
            >
              <div className="flex items-center gap-3">
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

                <button
                  className="bg-red-500 text-white hover:text-red-700 px-2 py-0.5 rounded-md transition"
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
                  delete
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
