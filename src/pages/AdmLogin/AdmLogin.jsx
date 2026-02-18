import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./AdmLogin.css";

import check from "../../assets/Check.svg";

import { login } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";


const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: saveToken, isAuthenticated } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = await login(username, password);

      saveToken(data.token);
      navigate("/");

    } catch (err) {
      alert("Login inválido");
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
          <p>Login</p>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Usuário"
            type="text"
          />
          <input
            placeholder="Senha"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
