import { useEffect, useState } from "react";
import { PlusIcon, TrashIcon, PencilIcon } from "@heroicons/react/20/solid";
// import CustomCheckbox from "./components/CustomCheckbox";
import CustomCheckbox2 from "./components/CustomCheckbox2";
import CustomEdit from "./components/CustomEdit";
import DeleteButton from "./components/DeleteButton";

function App() {
  const [todo, setTodo] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [draggingId, setDraggingId] = useState(null);

  useEffect(() => {
    setTodo(JSON.parse(localStorage.getItem("todo") || "[]"));
  }, []);

  const saveTodo = (updatedTodos) => {
    setTodo(updatedTodos); //Update the State
    localStorage.setItem("todo", JSON.stringify(updatedTodos)); //Local storage
  };

  const addOrUpdateTodo = () => {
    if (inputValue.trim() === "") return; // checks if Input is empty then prevent blank tasks

    if (editingId) {
      const updatedTodos = todo.map((item) =>
        item.id === editingId ? { ...item, title: inputValue } : item
      );
      saveTodo(updatedTodos); //Update State and Local Storage
      setEditingId(null);
    } else {
      const newTodo = {
        id: Date.now(),
        title: inputValue,
        isDone: false,
      };

      saveTodo([newTodo, ...todo]); //Add new Todos on Top
    }

    setInputValue(""); //For clear Input
  };

  const handleEdit = (id) => {
    const item = todo.find((t) => t.id === id);
    setInputValue(item.title);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this todo?");
    if (confirmDelete) {
      const updatedTodos = todo.filter((item) => item.id !== id);
      saveTodo(updatedTodos);
    }
  };

  const sortedTodos = [...todo].sort((a, b) => {
    if (a.isDone === b.isDone) return 0;
    return a.isDone ? 1 : -1;
  });

  // Drag Code
  // 1. Make the Element Draggable
  // 2. Get the Element which we are dragging

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
          onChange={(e) => setInputValue(e.target.value)} //updates state
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
        {/* || sortedTodos.every((item) => item.isDone) */}
        {sortedTodos.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white shadow-md rounded-md">
            <p className="text-lg font-medium">No tasks found</p>
            <p className="text-sm mt-1">Start by adding a new task above.</p>
          </div>
        ) : (
          sortedTodos
            .filter((v) => !v.isDone)
            .map((v) => (
              <div
                key={v.id}
                className="flex items-center justify-between bg-white shadow-md p-3 mb-3 rounded-md"
                draggable
                onDragStart={() => {
                  // console.log("Dragging", v.id);
                  setDraggingId(v.id);
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  // console.log("E", e);
                  // console.log("Moving Todo", draggingId);
                  // console.log("Moving TO: ", v);
                  const newTasks = [...todo];
                  const draggingIndex = newTasks.findIndex(
                    (task) => task.id === draggingId
                  );
                  const movingToIndex = newTasks.findIndex(
                    (task) => task.id === v.id
                  );

                  const draggingTask = newTasks[draggingIndex];
                  const movingToTask = newTasks[movingToIndex];
                  // console.log("Dragging ", draggingTask);
                  // console.log("Moving", movingToTask);

                  newTasks[draggingIndex] = movingToTask;
                  newTasks[movingToIndex] = draggingTask;

                  saveTodo(newTasks);
                }}
              >
                <div className="flex gap-4">
                  <CustomCheckbox2
                    checked={v.isDone}
                    onChange={() => {
                      const updatedTodos = todo.map((item) =>
                        item.id === v.id
                          ? { ...item, isDone: !item.isDone }
                          : item
                      );
                      saveTodo(updatedTodos);
                    }}
                  />
                  <div className=" relative group">
                    <p
                      className={` ${
                        v.isDone ? "line-through text-gray-500" : ""
                      }`}
                    >
                      {v.title}
                    </p>
                    {v.isDone && (
                      <div className="absolute left-0 bottom-full mb-2 w-max bg-gray-800 text-white text-sm px-3 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-10">
                        This task is completed
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-5">
                  {!v.isDone && <CustomEdit onClick={() => handleEdit(v.id)} />}
                  <DeleteButton onClick={() => handleDelete(v.id)} />
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default App;
