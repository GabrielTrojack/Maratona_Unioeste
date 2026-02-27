import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import toast from "react-hot-toast";

import "./ContestRegister.css";

import { getContestTeams } from "../../services/contestService";

import FullScreenLoader from "../../components/FullScreenLoader/FullScreenLoader";

const ContestRegister = () => {
  const { id } = useParams();
  const location = useLocation();
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const isTeamBased = location.state?.isTeamBased;


  async function loadTeams() {
    try {
      const data = await getContestTeams(id);
      setTeams(data);
    } catch (err) {
      console.error(err);

      if (err.status === 401) {
        toast.error("Sessão expirada.");
      } else if (err.status === 403) {
        toast.error("Você não tem permissão para visualizar os times.");
      } else if (err.status === 404) {
        toast.error("Contest não encontrado.");
      } else {
        toast.error("Erro ao carregar times.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTeams();
  }, [id]);

  if (loading) return <FullScreenLoader />;

  return (
    <div className="teams-page">
      <div className="teams-content">

        <h1>{isTeamBased ? "Times" : "Participantes"} Inscritos: {teams.length} </h1>
        {!teams.length && (
          <p>
          Nenhum {isTeamBased ? "time" : "participante"} inscrito neste contest.
        </p>  
        )}
        

        {teams.map((team) => {

          if (!isTeamBased) {
            return (
              <div key={team.id} className="team-card">

                <h2 className="team-title">
                  {team.competitor1Name}
                </h2>

                <div className="team-info-grid">
                  <div>
                    <span className="label">Instituição: </span>
                    <span>{team.institution || "-"}</span>
                  </div>
                </div>

              </div>
            );
          }

          const competitors = [
            team.competitor1Name,
            team.competitor2Name,
            team.competitor3Name
          ].filter(Boolean);

          return (
            <div key={team.id} className="team-card">
              <div className="teamName">
                <h2 className="team-title">
                  {team.teamName}
                </h2>
                <span className={`badge ${team.cafeComLeite ? "badge-warning" : "badge-normal"}`}>
                  {team.cafeComLeite ? "☕ Café com leite" : "Competitivo"}
                </span>
              </div>
              <div className="team-info-grid">
                <div>
                  <span className="label">Coach: </span>
                  <span>{team.coachName || "-"}</span>
                </div>

                <div>
                  <span className="label">Instituição: </span>
                  <span>{team.institution || "-"}</span>
                </div>

                <div>
                  <span className="label">Reserva: </span>
                  <span>{team.reserveName || "-"}</span>
                </div>
              </div>

              <div className="team-members">
                <span className="label">Competidores: </span>
                <ul>
                  {competitors.map((name, i) => (
                    <li key={i}>{name}</li>
                  ))}
                </ul>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default ContestRegister;