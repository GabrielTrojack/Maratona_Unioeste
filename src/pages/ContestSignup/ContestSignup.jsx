import React, { useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import "./ContestSignup.css";

import check from "../../assets/Check.svg";

import { createContestTeam } from "../../services/contestService";

const ContestSignup = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const teamBased = location.state?.isTeamBased;
  const [success, setSuccess] = useState(false);
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

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      let payload;
      if (teamBased) {
        if (!form.teamName || !form.competitor1) {
          alert("Preencha os campos obrigatórios");
          return;
        }

        payload = {
          teamName: form.teamName,
          coachName: form.coachName || null,
          institution: form.institution || null,
          competitor1Name: form.competitor1,
          competitor2Name: form.competitor2 || null,
          competitor3Name: form.competitor3 || null,
          reserveName: form.reserve || null,
          cafeComLeite: form.cafeComLeite,
        };

      }
      else {
        if (!form.competitor1 || !form.institution) {
          alert("Preencha os campos obrigatórios");
          return;
        }

        payload = {
          teamName: "a",
          institution: form.institution,
          competitor1Name: form.competitor1,
          cafeComLeite: form.cafeComLeite,
        };
      }

      await createContestTeam(id, payload);

      setSuccess(true);

      setForm({
        teamName: "",
        coachName: "",
        institution: "",
        competitor1: "",
        competitor2: "",
        competitor3: "",
        reserve: "",
        cafeComLeite: false,
      });
      const timer = setTimeout(() => {
        navigate("/contests");
      }, 500);

    } catch (err) {
      console.error(err);
      alert(err.message || "Erro ao cadastrar inscrição");
    }
  }

  if (success) {
    return (
      <div className="login-page">
        <div className="success">
          <div>
            <img src={check} alt="" />
            <h1>{teamBased?"Time":"Participante"} registrado com sucesso</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <div className="login-content team-form">
          <h1>{teamBased ? "Inscrição de Time" : "Inscrição Individual"}</h1>

          {teamBased && (
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
            </div>
          )}

          <div className="form-section">
            {!teamBased && <p>Dados do Competidor</p>}
            {teamBased && <p>Instituição</p>}

            <input
              name="institution"
              placeholder="Instituição"
              value={form.institution}
              onChange={handleChange}
            />
          </div>

          <div className="form-section">
            <p>{teamBased ? "Competidores" : "Competidor"}</p>

            <input
              name="competitor1"
              placeholder="Competidor 1 *"
              value={form.competitor1}
              onChange={handleChange}
            />

            {teamBased && (
              <>
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
              </>
            )}
          </div>

          {teamBased && (
            <label className="checkbox-row">
              <input
                type="checkbox"
                name="cafeComLeite"
                checked={form.cafeComLeite}
                onChange={handleChange}
              />
              Café com leite
            </label>
          )}

          <button type="submit">
            {teamBased ? "Inscrever Time" : "Inscrever Competidor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContestSignup;