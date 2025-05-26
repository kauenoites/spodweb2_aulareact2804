import React, { useState } from "react";

function AuthForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";

    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok && isLogin) {
      onLogin(data.token);
    } else if (!res.ok) {
      alert(data.error);
    } else {
      alert("Usuário registrado com sucesso. Agora faça login.");
      setIsLogin(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Cadastro"}</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">{isLogin ? "Entrar" : "Cadastrar"}</button>
      <p onClick={() => setIsLogin(!isLogin)} style={{ cursor: "pointer" }}>
        {isLogin ? "Criar conta" : "Já tenho conta"}
      </p>
    </form>
  );
}

export default AuthForm;