import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.svg"; 

const Navbar = () => {
  const navigate = useNavigate();

    function landingNavigate() {
    navigate("/");
  }

  return (  
    <nav className="navbar">
        <div className="navbar-container">
            <ul className="nav-links">
                <NavLink to="/" end>Início</NavLink>
                <NavLink to="/materials">Materiais</NavLink>
                <NavLink to="/">Participe</NavLink>
                <NavLink to="/mural">Mural</NavLink>
              <img src={logo} alt="Logo MU" onClick={()=>landingNavigate()} className="logo-img" />
            </ul>
        </div>
    </nav>
  );
};

export default Navbar;
