import React from "react";
import "./LandingPage.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import trofeu from "../../assets/trofeu.svg";
import carlos from "../../assets/SuperCarlos.svg";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">

        <div className="hero">
          <div className="join">
            <h1>Maratona<br />UNIOESTE</h1>
            <p>Rumo ao topo da programação!</p>
            <button>Participe</button>
          </div>

          {/* <img src={trofeu} alt="Logo MU" className="trofeu-img" /> */}
        </div>
        {/* <img src={carlos} alt="ESSE É O CARLOS" className="carlos-img" /> */}
        <div className="about">
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
          <div className="diag"></div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
