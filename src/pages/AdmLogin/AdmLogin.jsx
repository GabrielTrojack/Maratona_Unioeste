import React from "react";
import "./AdmLogin.css";
import Navbar from "../../components/Navbar/Navbar";

const Login = () => {
  return (
    <div className="login-page">
      <Navbar />
      <div className="login-content">
        <p>Login</p>
        <input type="text" />
        <input type="text" />
        <button>Entrar</button>
      </div>
    </div>
  );
};

export default Login;
