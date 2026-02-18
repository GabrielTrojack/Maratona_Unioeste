import React from "react";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./ClassRegistration.css";

import writenlogo from "../../assets/writenlogo.svg";

const ClassRegister = () => {
  
  const cadastros = [
    {
      id: 1,
      nome: "Gabriel",
      email: "gabriel@email.com",
      whatsapp: "(45) 99999-9999",
      instituicao: "UNIOESTE"
    },
    {
      id: 2,
      nome: "Maria",
      email: "maria@email.com",
      whatsapp: "(11) 98888-7777",
      instituicao: "UFPR"
    }
  ];

  return (
    <div className="lista-page">
      <div className="lista-card">
        <h1>Cadastros</h1>

        <div className="lista">
          {cadastros.map(cadastro => (
            <div key={cadastro.id} className="cadastro-item">
              <h3>{cadastro.nome}</h3>
              <p><strong>Email:</strong> {cadastro.email}</p>
              <p><strong>WhatsApp:</strong> {cadastro.whatsapp}</p>
              <p><strong>Instituição:</strong> {cadastro.instituicao}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ClassRegister;
