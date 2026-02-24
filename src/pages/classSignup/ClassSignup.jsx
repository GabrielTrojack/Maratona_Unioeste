import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassSignup.css";
import writenlogo from "../../assets/writenlogo.svg";


import { createRegistration } from "../../services/classService";
import { useAuth } from "../../context/AuthContext";


const Class = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    institution: "",
    campus: "string",
    course: "string",
    semester: "string",
    howDidYouHear: "string",
    previousExperience: "string",
    message: "string"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createRegistration(formData);
      alert("Cadastro realizado com sucesso!");
      setFormData({
        name: "",
        email: "",
        whatsapp: "",
        institution: "",
        campus: "string",
        course: "string",
        semester: "string",
        howDidYouHear: "string",
        previousExperience: "string",
        message: "string"
      });
    } catch (error) {
      alert("Erro ao cadastrar: " + error.message);
    }
  };

  return (
    <div className="cadastro-page">
      <div className="cadastro-card">

        <div className="cadastro-info">
          <img
            src={writenlogo}
            alt="Logo"
            className="logo"
            width="300"
            height="120"
          />
          <h2>Cadastre-se</h2>
          <p>
            Cadastre-se e fique por dentro das próximas aulas da Maratona UNIOESTE na sua região.
          </p>
        </div>

        <form className="cadastro-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="WhatsApp"
            value={formData.whatsapp}
            onChange={handleChange}
          />

          <input
            type="text"
            name="institution"
            placeholder="Sua instituição"
            value={formData.institution}
            onChange={handleChange}
          />

          <button type="submit">Cadastrar</button>
        </form>

        
        {isAuthenticated && (
          <button className="view-button" onClick={() => navigate("/class/register")}>
            Ver cadastros
          </button>
        )}

      </div>
    </div>
  );
};

export default Class;