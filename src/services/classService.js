import API_BASE from "./api"
import { fetchAuth } from "./authService"


export async function getRegistrations() {
  const response = await fetchAuth(`${API_BASE}/api/registrations`);

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || "Erro ao buscar cadastros"
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export async function createRegistration(registrationData) {
  const response = await fetch(`${API_BASE}/api/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registrationData)
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(
      data?.message || "Erro ao criar inscrição"
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}