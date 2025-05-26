import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import AuthForm from "./AuthForm";
import "./App.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      {!token ? (
        <AuthForm onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout}>Sair</button>
          <TodoList token={token} />
        </>
      )}
    </div>
  );
}
export default App;