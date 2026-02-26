import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ClassSignup.css";
import writenlogo from "../../assets/writenlogo.svg";

import toast from "react-hot-toast";

import { createRegistration } from "../../services/classService";
import { useAuth } from "../../context/AuthContext";


const Class = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
  setError(null);

  if (!formData.name || !formData.email || !formData.whatsapp) {
    toast.error("Preencha os campos obrigatórios.");
    return;
  }

  setLoading(true);

  try {
    await createRegistration(formData);

    toast.success("Cadastro realizado com sucesso!");

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

  } catch (err) {
    if (err.status === 409) {
      toast.error("Este e-mail já está cadastrado.");
    } else if (err.status === 400) {
      toast.error("Dados inválidos.");
    } else if (err.status === 500) {
      toast.error("Erro interno do servidor.");
    } else {
      toast.error(err.message || "Erro ao cadastrar.");
    }
  } finally {
    setLoading(false);
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
            placeholder="* Nome"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="* E-mail"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="whatsapp"
            placeholder="* WhatsApp"
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

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Cadastrar"}
          </button>
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