import React from "react";
import "./LandingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import logo from "../../assets/logo.svg"; 


const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">

        <div className="hero">
          <div className="join">
            <h1>Maratona<br/>UNIOESTE</h1>
            <p>Rumo ao topo da programação!</p>
            <button>Participe</button>
          </div>

          <img src={logo} alt="Logo MU" className="logo-img" />
        </div>

          <div className="about">
            <img src={logo} alt="Logo MU" className="logo-img" />
            <div className="we">
            <p>Quem somos?</p>
            <p>
              A Maratona UNIOESTE é um projeto de extensão da Universidade Estadual do Oeste do 
              Paraná focado na preparação de estudantes para a Maratona SBC de Programação (ICPC). 
              Estudamos algoritmos, estruturas de dados e resolvemos problemas em equipe, desenvolvendo 
              raciocínio lógico, pensamento computacional e espírito colaborativo.
            </p>
            <p>
              🚀 Quer aprender mais e competir com os melhores? Junte-se a nós e comece sua jornada na programação competitiva
            </p>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Landing;
