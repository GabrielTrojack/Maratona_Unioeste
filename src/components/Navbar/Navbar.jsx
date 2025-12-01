import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg"; 

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="navbar-container">
            <ul className="nav-links">
                <p>Início</p>
                <p>Materiais</p>
                <p>Participe</p>
                <p>Mural</p>
                <p>Fazer post</p>
                <p>Criar aula</p>
              <img src={logo} alt="Logo MU" className="logo-img" />
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
