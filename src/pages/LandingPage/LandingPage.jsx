import React from "react";
import { useNavigate } from "react-router-dom"
import "./LandingPage.css";
import  img  from ".././../assets/fotos.jpeg";

const Landing = () => {
  const navigate = useNavigate(); 
  return (
    <div className="landing-page">
      <div className="landing-content">

        <div className="hero">
          <div className="join">
            <h1>Maratona<br />UNIOESTE</h1>
            <p>Rumo ao topo da programação!</p>
            <button onClick={() => navigate(`/class`)}>Participe</button>
          </div>

        </div>

        <div className="about">

          <div className="image-wrapper">
            <img src={img} alt="Maratona" className="all" />
          </div>
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
