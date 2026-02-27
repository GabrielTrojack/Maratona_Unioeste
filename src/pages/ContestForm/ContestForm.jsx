import React, { useEffect, useState } from "react";
import "./ContestForm.css";
import {
  createContest,
  updateContest,
  getContestById
} from "../../services/contestService";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ContestForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [form, setForm] = useState({
    name: "",
    durationHours: "",
    durationMinutes: "",
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

        const totalMinutes = data.durationMinutes;

        setForm({
          name: data.name,
          durationHours: Math.floor(totalMinutes / 60),
          durationMinutes: totalMinutes % 60,
          startDateTime: data.startDateTime.slice(0, 16),
          teamBased: data.teamBased,
          codeforcesMirrorUrl: data.codeforcesMirrorUrl || ""
        });

      } catch (err) {
        toast.error("Erro ao carregar contest.");
        navigate("/contests");
      }
    }

    loadContest();
  }, [id, isEditMode, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const h = Number(form.durationHours) || 0;
      const m = Number(form.durationMinutes) || 0;

      if (h === 0 && m === 0) {
        toast.error("Informe uma duração maior que zero.");
        setLoading(false);
        return;
      }

      if (m >= 60) {
        toast.error("Minutos devem ser menores que 60.");
        setLoading(false);
        return;
      }

      if (!form.name) {
        toast.error("O contest deve ter um nome");
        setLoading(false);
        return;
      }
      const payload = {
        name: form.name,
        durationMinutes: h * 60 + m,
        startDateTime: new Date(form.startDateTime).toISOString(),
        teamBased: form.teamBased,
        codeforcesMirrorUrl: form.codeforcesMirrorUrl || ""
      };

      if (isEditMode) {
        await updateContest(id, payload);
        toast.success("Contest atualizado com sucesso!");
      } else {
        await createContest(payload);
        toast.success("Contest criado com sucesso!");
      }

      setTimeout(() => navigate("/contests"), 800);

    } catch (err) {
      console.log("Erro completo:", err);

      if (err.status === 400) {
        toast.error("Dados inválidos.");
      } else if (err.status === 409) {
        toast.error("Já existe um contest com esse nome.");
      } else if (err.status === 500) {
        toast.error("Erro interno do servidor.");
      } else {
        toast.error(err.message || "Erro ao salvar contest.");
      }

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
              />
            </div>

            <div className="field">
              <label>Duração</label>

              <div className="input-with-unit">
                <input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={form.durationHours}
                  onChange={e => handleChange("durationHours", e.target.value)}
                />
                <span>h</span>

                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="0"
                  value={form.durationMinutes}
                  onChange={e => handleChange("durationMinutes", e.target.value)}
                />
                <span>min</span>
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
          <h2>Se o contest ainda não ocorreu, deixe o campo abaixo em branco.</h2>

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
          <button
            type="button"
            className="secondary"
            onClick={() => navigate("/contests")}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="primary"
            disabled={loading}
          >
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