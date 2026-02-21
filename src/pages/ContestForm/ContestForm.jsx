import React, { useEffect, useState } from "react";
import "./ContestForm.css";
import { createContest, updateContest, getContestById } from "../../services/contestService";
import { useParams, useNavigate } from "react-router-dom";

const ContestForm = () => {
  const { id } = useParams(); // se existir → edição
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    name: "",
    durationHours: "",
    startDateTime: "",
    teamBased: true,
    codeforcesMirrorUrl: ""
  });

  const [loading, setLoading] = useState(false);

  function handleChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    if (!isEditMode) return;

    async function loadContest() {
      try {
        const data = await getContestById(id);

        setForm({
          name: data.name,
          durationHours: data.durationMinutes / 60,
          startDateTime: data.startDateTime.slice(0, 16), // formato datetime-local
          teamBased: data.teamBased,
          codeforcesMirrorUrl: data.codeforcesMirrorUrl || ""
        });

      } catch (err) {
        alert("Erro ao carregar contest");
        navigate("/contests");
      }
    }

    loadContest();
  }, [id, isEditMode, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        name: form.name,
        durationMinutes: Number(form.durationHours) * 60,
        startDateTime: new Date(form.startDateTime).toISOString(),
        teamBased: form.teamBased,
        codeforcesMirrorUrl: form.codeforcesMirrorUrl || ""
      };

      if (isEditMode) {
        await updateContest(id, payload);
        alert("Contest atualizado!");
      } else {
        await createContest(payload);
        alert("Contest criado!");
      }

      navigate("/contests");

    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="contest-container">
      <form className="contest-card" onSubmit={handleSubmit}>

        <header>
          <h1>{isEditMode ? "Editar Contest" : "Criar Contest"}</h1>
        </header>

        <section>
          <h2>Informações gerais</h2>

          <div className="grid">
            <div className="field">
              <label>Nome do contest</label>
              <input
                type="text"
                placeholder="Ex: Maratona Unioeste"
                value={form.name}
                onChange={e => handleChange("name", e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Duração</label>
              <div className="input-with-unit">
                <input
                  type="number"
                  min="1"
                  value={form.durationHours}
                  onChange={e => handleChange("durationHours", e.target.value)}
                  required
                />
                <span>h</span>
              </div>
            </div>

            <div className="field full">
              <label>Data e hora de início</label>
              <input
                type="datetime-local"
                value={form.startDateTime}
                onChange={e => handleChange("startDateTime", e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        <section>
          <h2>Se o contest ainda for ocorrer, o campo abaixo pode ser deixado em branco.</h2>

          <div className="field">
            <label>Link do mirror</label>
            <input
              type="text"
              placeholder="https://..."
              value={form.codeforcesMirrorUrl}
              onChange={e => handleChange("codeforcesMirrorUrl", e.target.value)}
            />
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={form.teamBased}
              onChange={e => handleChange("teamBased", e.target.checked)}
            />
            Contest em time
          </label>
        </section>

        <div className="actions">
          <button type="button" className="secondary" onClick={() => navigate("/contests")}>
            Cancelar
          </button>

          <button type="submit" className="primary" disabled={loading}>
            {loading
              ? isEditMode ? "Salvando..." : "Criando..."
              : isEditMode ? "Salvar alterações" : "Criar contest"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default ContestForm;