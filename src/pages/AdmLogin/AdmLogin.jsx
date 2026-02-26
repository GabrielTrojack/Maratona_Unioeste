import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./AdmLogin.css";

import toast from "react-hot-toast";
import check from "../../assets/Check.svg";

import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login: saveToken, isAuthenticated } = useAuth();

  async function handleLogin(e) {
  e.preventDefault();

  if (!username || !password) {
    toast.error("Preencha todos os campos");
    return;
  }

  setLoading(true);

  try {
    const data = await login(username, password);

    saveToken(data.token);

    toast.success("Login realizado com sucesso!");

    navigate("/");

  } catch (err) {
    if (err.status === 401) {
      toast.error("Usuário ou senha inválidos.");
    } else if (err.status === 500) {
      toast.error("Erro interno do servidor.");
    } else if (err.status) {
      toast.error(err.message || "Erro inesperado.");
    } else {
      toast.error("Erro de conexão com o servidor.");
    }
  } finally {
    setLoading(false);
  }
}

  if (isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-content">
          <div>
            <img src={check} alt="" />
            <h1>Administrador logado</h1>
            <h1>Você já possui acesso ao sistema.</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <form onSubmit={handleLogin}>
        <div className="login-content">
          <h1>Login</h1>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            type="text"
          />
          <input
            placeholder="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
