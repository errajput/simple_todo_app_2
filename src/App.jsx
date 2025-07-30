import { useEffect, useState } from "react";

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
    <>
      <h1>Todo App</h1>

      <input
        type="text"
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
        onClick={() => {
          addTodo();
        }}
      >
        Add
      </button>

      {todo.map((v) => {
        return (
          <div key={v.id} className="todo-list">
            <input
              type="checkbox"
              checked={v.isDone}
              onChange={() => {
                const newTodo = todo.map((v2) => {
                  if (v.id === v2.id) {
                    v.isDone = !v2.isDone;
                  }
                  return v2;
                });

                setTodo(newTodo);
                localStorage.setItem("todo", JSON.stringify([...newTodo]));
              }}
            />
            <p>{v.title}</p>

            <button
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
        );
      })}
    </>
  );
}
export default App;
