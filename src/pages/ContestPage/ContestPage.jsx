import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ContestsPage.css";

const ContestsPage = () => {
  const navigate = useNavigate();
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
      },      {
        id: 3,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },      {
        id: 4,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },      {
        id: 5,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },      {
        id: 6,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },      {
        id: 7,
        name: "Codeforces Round #901",
        date: "20/04/2026",
        duration: "02:30",
        type: "Individual",
        mirror: "https://codeforces.com",
      },      {
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

        <h1>Contests Ativos</h1>

      <div className="table-wrapper">
        <table className="contest-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Duração</th>
              <th>Tipo</th>
              <th></th>
              {/* <th>Ação</th> */}
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
                <td>
                  {contest.status === "running" ? (
                    ""
                  ) : (
                    <button onClick={() => handleRegister(contest)}>
                      Participar
                    </button>
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
              <th>Ranking</th>
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
                  <a href={contest.type}>Codeforces Mirror</a>
                </td>
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
