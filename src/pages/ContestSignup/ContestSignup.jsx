import React, { useState } from "react";
import "./ContestSignup.css";

const ContestSignup = () => {
  const [form, setForm] = useState({
    teamName: "",
    coachName: "",
    institution: "",
    competitor1: "",
    competitor2: "",
    competitor3: "",
    reserve: "",
    cafeComLeite: false,
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.teamName || !form.competitor1) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    console.log("Dados enviados:", form);
    alert("Time inscrito com sucesso!");
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="login-content team-form">
          <h1>Inscrição de Time</h1>

          <div className="form-section">
            <p>Dados do Time</p>

            <input
              name="teamName"
              placeholder="Nome do time *"
              value={form.teamName}
              onChange={handleChange}
            />

            <input
              name="coachName"
              placeholder="Nome do coach"
              value={form.coachName}
              onChange={handleChange}
            />

            <input
              name="institution"
              placeholder="Instituição"
              value={form.institution}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <p>Competidores</p>

            <input
              name="competitor1"
              placeholder="Competidor 1 *"
              value={form.competitor1}
              onChange={handleChange}
            />

            <input
              name="competitor2"
              placeholder="Competidor 2"
              value={form.competitor2}
              onChange={handleChange}
            />

            <input
              name="competitor3"
              placeholder="Competidor 3"
              value={form.competitor3}
              onChange={handleChange}
            />

            <input
              name="reserve"
              placeholder="Reserva"
              value={form.reserve}
              onChange={handleChange}
            />
          </div>

          <label className="checkbox-row">
            <input
              type="checkbox"
              name="cafeComLeite"
              checked={form.cafeComLeite}
              onChange={handleChange}
            />
            Café com leite
          </label>

          <button type="submit">Inscrever Time</button>
        </div>
      </form>
    </div>
  );
};

export default ContestSignup;