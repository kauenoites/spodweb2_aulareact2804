import React, { useState, useEffect } from "react";

function TodoList({ token }) {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [filter, setFilter] = useState("all"); 

  const fetchTodos = async () => {
    const res = await fetch("http://localhost:3000/todos", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    const res = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });

    if (res.ok) {
      fetchTodos();
      setText("");
    }
  };

  const toggleTodo = async (id, done) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ done: !done }),
    });
    fetchTodos();
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "done") return todo.done;
    if (filter === "pending") return !todo.done;
    return true;
  });

  return (
    <div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nova tarefa"
      />
      <button onClick={addTodo}>Adicionar</button>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => setFilter("all")}>Todos</button>
        <button onClick={() => setFilter("pending")}>Pendentes</button>
        <button onClick={() => setFilter("done")}>Concluídos</button>
      </div>

      <ul>
        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id, todo.done)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
