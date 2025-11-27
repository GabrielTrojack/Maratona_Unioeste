import React from "react";
import "./LandingPage.css";
import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
  return (
    <div className="landing-page">
      <Navbar />
      <div className="landing-content">
        <h1>Bem-vindo à Maratona Unioeste</h1>
        <p>
          Um espaço para conectar equipes, compartilhar conhecimento e celebrar a programação!
        </p>
        <button>Saiba mais</button>
      </div>
    </div>
  );
};

export default Landing;
