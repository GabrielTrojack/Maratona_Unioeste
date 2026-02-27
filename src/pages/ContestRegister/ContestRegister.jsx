import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FileDown  } from "lucide-react";

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

  function generateBocaFile() {
  if (!teams.length) {
    toast.error("Nenhum time para exportar.");
    return;
  }

  let content = "[user]\n\n";

  teams.forEach((team, index) => {
    const userNumber = index + 1;
    const username = team.teamName
      ? team.teamName.toLowerCase().replace(/\s+/g, "")
      : `team${userNumber}`;

    const password = Math.random().toString(36).slice(-8);

    const competitors = [
      team.competitor1Name,
      team.competitor2Name,
      team.competitor3Name
    ].filter(Boolean).join(", ");

    content += `usernumber=${userNumber}\n`;
    content += `usersitenumber=1\n`;
    content += `username=${username}\n`;
    content += `userpassword=${password}\n`;
    content += `userfullname=[${team.institution || "INST"}] ${team.teamName || team.competitor1Name}\n`;
    content += `userdesc=[${team.institution || "INST"}] ${competitors}\n\n`;
  });

  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "boca_users.txt");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  toast.success("Arquivo gerado com sucesso!");
}



  if (loading) return <FullScreenLoader />;

  return (
    <div className="teams-page">
      <div className="teams-content">

        <div className="header">
          <h1>{isTeamBased ? "Times" : "Participantes"} Inscritos: {teams.length} </h1>

          <button 
            className="export-button" 
            onClick={generateBocaFile}
            title="Gerar arquivo BOCA"  
          >
            <FileDown size={18} />
          </button>
        </div>

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