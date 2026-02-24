import API_BASE from "./api"
import { fetchAuth } from "./authService"

export async function getContests() {
  const response = await fetch(`${API_BASE}/api/contests`)

  if (!response.ok) {
    throw new Error("Erro ao buscar contests")
  }

  return response.json()
}

export async function createContest(contestData) {
  const response = await fetchAuth(`${API_BASE}/api/contests`, {
    method: "POST",
    body: JSON.stringify(contestData)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao criar contest: ${text}`);
  }

  return await response.json();
}

export async function updateContest(id, contestData) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${id}`, {
    method: "PUT",
    body: JSON.stringify(contestData)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao atualizar contest: ${text}`);
  }

  return await response.json();
}

export async function getContestById(id) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${id}`);

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao buscar contest: ${text}`);
  }

  return await response.json();
}

export async function getContestTeams(contestId) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${contestId}/teams`);

  if (!response.ok) {
    throw new Error("Erro ao buscar times do contest");
  }

  return await response.json();
}

export async function createContestTeam(contestId, teamData) {
  const response = await fetchAuth(
    `${API_BASE}/api/contests/${contestId}/teams`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(teamData)
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao cadastrar time");
  }

  return await response.json();
}

export async function deleteContest(id) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao deletar contest");
  }

  return await response.json();
}