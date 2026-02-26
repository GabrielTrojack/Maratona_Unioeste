import API_BASE from "./api"
import { fetchAuth } from "./authService"

export async function getContests() {
  const response = await fetch(`${API_BASE}/api/contests`);

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(errorData.message || "Erro ao buscar contests");

    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
  }

  return response.json();
}

export async function createContest(contestData) {
  const response = await fetchAuth(`${API_BASE}/api/contests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contestData)
  });

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(errorData.message || "Erro ao criar contest");

    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
  }

  return await response.json();
}

export async function updateContest(id, contestData) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contestData)
  });

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(errorData.message || "Erro ao atualizar contest");

    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
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
  const response = await fetchAuth(
    `${API_BASE}/api/contests/${contestId}/teams`
  );

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(
      errorData.message || "Erro ao buscar times do contest"
    );

    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
  }

  return response.json();
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
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(
      errorData.message || "Erro ao cadastrar time"
    );

    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
  }

  return response.json();
}

export async function deleteContest(id) {
  const response = await fetchAuth(`${API_BASE}/api/contests/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    let errorData;

    try {
      errorData = await response.json();
    } catch {
      errorData = { message: await response.text() };
    }

    const error = new Error(errorData.message || "Erro ao deletar contest");
    error.status = response.status;
    error.code = errorData.code;
    error.details = errorData.details;

    throw error;
  }

  if (response.status === 204) return;

  return response.json();
}