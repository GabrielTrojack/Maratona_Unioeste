import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.svg";


const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.add("nav-ready");
  }, []);

  function landingNavigate() {
    navigate("/");
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">



        <div className="hamburger" onClick={toggleMenu}>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
          <span className={menuOpen ? "bar open" : "bar"}></span>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li><NavLink to="/" end onClick={closeMenu}>Início</NavLink></li>
          <li><NavLink to="/materials" onClick={closeMenu}>Materiais</NavLink></li>
          <li><NavLink to="/class" onClick={closeMenu}>Participe</NavLink></li>
          <li><NavLink to="/contests" onClick={closeMenu}>Contests</NavLink></li>
          {/* <li><NavLink to="/mural" onClick={closeMenu}>Mural</NavLink></li> */}
        </ul>

        <img
          src={logo}
          alt="Logo MU"
          onClick={landingNavigate}
          className="logo-img"
        />

      </div>
    </nav>
  );
};

export default Navbar;
