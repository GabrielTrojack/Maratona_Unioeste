import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Eye } from "lucide-react";
import "./ContestPage.css";

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

import { getContests, deleteContest } from "../../services/contestService";
import { useAuth } from "../../context/AuthContext";

const ContestsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contestToDelete, setContestToDelete] = useState(null);

  async function handleDelete(id) {
  try {
    const result = await deleteContest(id);
    alert(result.message);

    setContests(prev => prev.filter(contest => contest.id !== id));

  } catch (error) {
    console.error(error);
    alert("Erro ao deletar contest");
  }
}

async function confirmDelete() {
  try {
    await deleteContest(contestToDelete.id);

    setContests(prev =>
      prev.filter(c => c.id !== contestToDelete.id)
    );

    setContestToDelete(null);
  } catch (error) {
    alert("Erro ao deletar contest");
  }
}

  function formatDateTime(value) {
    if (!value) return "";

    const date = new Date(value);

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  async function loadContests() {
    try {
      const data = await getContests();
      setContests(data.content);
      console.log();

    } catch (error) {
      console.error("Erro ao carregar os contests:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContests();
  }, []);

  if (loading) return <FullScreenLoader />;

  const now = new Date();

  const isFinishedOrMirrored = (c) => {
    const start = new Date(c.startDateTime);

    const oneDayBefore = new Date(start);
    oneDayBefore.setDate(oneDayBefore.getDate() - 1);

    return now >= oneDayBefore || !!c.codeforcesMirrorUrl?.trim();
  };

  const finishedOrMirrored = contests
    .filter(isFinishedOrMirrored)
    .sort((a, b) => new Date(b.startDateTime) - new Date(a.startDateTime));

  const upcoming = contests
    .filter((c) => !isFinishedOrMirrored(c))
    .sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime));

  return (
    <div className="contests-page">
      <div className="contests-content">
        <div className="contests-header">
          <h1>Contests Ativos</h1>

          {isAuthenticated && (
            <button onClick={() => navigate("/contests/new")}>
              + Criar contest
            </button>
          )}
        </div>
        <div className="table-wrapper">
          <table className="contest-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Duração</th>
                <th>Tipo</th>
                <th></th>
                {isAuthenticated && (<th></th>)}
              </tr>
            </thead>

            <tbody>
              {upcoming.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.name}</td>
                  <td>{formatDateTime(contest.startDateTime)}</td>
                  <td>
                    {String(Math.floor(contest.durationMinutes / 60)).padStart(2, "0")}:
                    {String(contest.durationMinutes % 60).padStart(2, "0")}
                  </td>
                  <td>{contest.teamBased ? "Time" : "Individual"}</td>
                  <td>
                    <button
                      onClick={() => navigate(`/contests/form/${contest.id}`, {
                        state: { isTeamBased: contest.teamBased }
                      })}
                    >
                      Registrar {contest.teamBased ? "time" : "participante"}
                    </button>
                  </td>
                  {isAuthenticated && (
                    <td className="action-buttons">
                      <>
                        <button
                          className="btn-icon edit"
                          title="Editar"
                          onClick={() => navigate(`/contests/edit/${contest.id}`)}
                        >
                          <Pencil size={18} />
                        </button>

                        <button className="btn-icon delete" 
                          onClick={() => setContestToDelete(contest)} 
                          title="Excluir">
                          <Trash2 size={18} />
                        </button>
                        <button
                          className="btn-icon times"
                          title="Ver times cadastrados"
                          onClick={() => navigate(`/contests/teams/${contest.id}`, {
                            state: { isTeamBased: contest.teamBased }
                          })}
                        >
                          <Eye size={18} />
                        </button>
                      </>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h1 className="past-title">Contests Passados</h1>

        <div className="table-wrapper">
          <table className="contest-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Data</th>
                <th>Duração</th>
                <th>Tipo</th>
                <th>Mirror</th>
                {isAuthenticated && (<th></th>)}
              </tr>
            </thead>

            <tbody>
              {finishedOrMirrored.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.name}</td>
                  <td>{formatDateTime(contest.startDateTime)}</td>
                  <td>
                    {String(Math.floor(contest.durationMinutes / 60)).padStart(2, "0")}:
                    {String(contest.durationMinutes % 60).padStart(2, "0")}
                  </td>
                  <td>{contest.teamBased ? "Time" : "Individual"}</td>
                  <td>
                    {contest.codeforcesMirrorUrl ?
                      <a href={contest.codeforcesMirrorUrl}>
                        Link do contest</a> : <p style={{ color: "#888" }}>Em breve...</p>
                    }

                  </td>
                  {isAuthenticated && (
                    <td className="action-buttons">
                      <button
                        className="btn-icon edit"
                        title="Editar"
                        onClick={() => navigate(`/contests/edit/${contest.id}`)}
                      >
                        <Pencil size={18} />
                      </button>

                      <button className="btn-icon delete" 
                        onClick={() => setContestToDelete(contest)} 
                        title="Excluir">
                        <Trash2 size={18} />
                      </button>

                      <button
                        className="btn-icon times"
                        title="Ver times cadastrados"
                        onClick={() => navigate(`/contests/teams/${contest.id}`, {
                          state: { isTeamBased: contest.teamBased }
                        })}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
      {contestToDelete && (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Confirmar exclusão</h3>
        <p>
          Você tem certeza que deseja deletar{" "}
          <strong>{contestToDelete.name}</strong>?
        </p>
  
        <div className="modal-actions">
          <button
            className="btn-cancel"
            onClick={() => setContestToDelete(null)}
          >
            Cancelar
          </button>
  
          <button
            className="btn-delete"
            onClick={confirmDelete}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )}
    </div>
  );
};

export default ContestsPage;
