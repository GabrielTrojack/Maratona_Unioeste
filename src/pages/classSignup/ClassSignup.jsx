import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./ClassSignup.css";

import writenlogo from "../../assets/writenlogo.svg";

const Class = () => {
  return (
    <div className="cadastro-page">
      <div className="cadastro-card">
        <div className="cadastro-info">
        <img src={writenlogo} alt="" />
          <img src="" alt="" />
          <h2>Cadastre-se</h2>
          <p>
            Participe da Maratona UNIOESTE, aqui, você se prepara
            para enfrentar as maiores competições de programação
            do país, como a OBI e a Maratona SBC (ICPC).
          </p>
        </div>

        <form className="cadastro-form">
          <input type="text" placeholder="Nome" />
          <input type="email" placeholder="E-mail" />
          <input type="text" placeholder="WhatsApp" />
          <input type="text" placeholder="Sua instituição" />
          <button type="submit">Cadastrar</button>
        </form>

      </div>
    </div>
  );
};

export default Class;
