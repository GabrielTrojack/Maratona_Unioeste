import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg"; 

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <ul className="nav-links">
                <li>Início</li>
                <li>Materiais</li>
                <li>Participe</li>
                <li>Mural</li>
                <li>Fazer post</li>
                <li>Criar aula</li>
            </ul>
            <img src={logo} alt="Logo MU" className="logo-img" />
        </div>
    </nav>
  );
};

export default Navbar;
