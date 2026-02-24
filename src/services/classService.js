import API_BASE from "./api"
import { fetchAuth } from "./authService"


export async function getRegistrations() { 
const response = await fetchAuth(`${API_BASE}/api/registrations`);

  if (!response.ok) { 
    throw new Error("Erro ao buscar contests") 
  } 
  
  return await response.json(); 
}

export async function createRegistration(registrationData) {
  const response = await fetch(`${API_BASE}/api/registrations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(registrationData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao criar inscrição");
  }

  return response.json();
}