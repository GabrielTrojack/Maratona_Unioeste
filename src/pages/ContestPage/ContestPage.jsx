import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import "./ContestsPage.css";

import { useAuth } from "../../context/AuthContext";

const ContestsPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [currentContests, setCurrentContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);

  useEffect(() => {
    setCurrentContests([
      {
        id: 1,
        name: "Codeforces Round #900",
        date: "10/04/2026",
        duration: "02:00",
        type: "Team",
        mirror: null,
      },
    ]);

    setPastContests([
      {
        id: 3,
        name: "Codeforces Round #899",
        date: "01/03/2026",
        duration: "02:00",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 3,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 4,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 5,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 6,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 7,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      }, {
        id: 8,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },
    ]);
  }, []);

  function handleEnter(contest) {
    console.log("Entrar no contest:", contest.id);
  }

  function handleRegister(contest) {
    console.log("Inscrever no contest:", contest.id);
  }

  function handleRanking(contest) {
    console.log("Ver ranking:", contest.id);
  }

  return (
    <div className="contests-page">
      <div className="contests-content">
        <div className="contests-header">
          <h1>Contests Ativos</h1>

          {isAuthenticated && (
            <button onClick={() => navigate("/lessons/new")}>
              + Criar aula
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
              </tr>
            </thead>

            <tbody>
              {currentContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.name}</td>
                  <td>{contest.date}</td>
                  <td>{contest.duration}</td>
                  <td>{contest.type}</td>
                  {/* <td>
                  <span className={`status ${contest.status}`}>
                    {contest.status === "running" ? "Em andamento" : "Em breve"}
                  </span>
                </td> */}
                  <td className="action-buttons">
                    {contest.status === "running" ? (
                      ""
                    ) : (
                      <button onClick={() => handleRegister(contest)}>
                        Registrar time
                      </button>
                    )}
                    {isAuthenticated && (
                      <>
                        <button className="btn-icon edit" title="Editar" >
                          <Pencil size={18} />
                        </button>

                        <button className="btn-icon delete" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </>
                    )}

                  </td>
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
              {pastContests.map((contest) => (
                <tr key={contest.id}>
                  <td>{contest.name}</td>
                  <td>{contest.date}</td>
                  <td>{contest.duration}</td>
                  <td>{contest.type}</td>
                  <td>
                    <a href={contest.type}>Link do contest</a>
                  </td>
                  {isAuthenticated && (
                    <td className="action-buttons">
                      <button className="btn-icon edit" title="Editar" >
                        <Pencil size={18} />
                      </button>

                      <button className="btn-icon delete" title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};

export default ContestsPage;
