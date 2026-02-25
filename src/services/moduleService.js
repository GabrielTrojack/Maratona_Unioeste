import API_BASE from "./api"
import { fetchAuth } from "./authService"


export async function getModules() {
  const response = await fetch(`${API_BASE}/api/modules`)

  if (!response.ok) {
    throw new Error("Erro ao buscar modulos")
  }

  return response.json()
}

export async function getModuleById(moduleId) {
  const response = await fetch(`${API_BASE}/api/modules/${moduleId}`)

  if (!response.ok) {
    throw new Error("Erro ao buscar modulo")
  }

  return response.json()
}

export async function getExercises(moduleId) {
  const response = await fetch(`${API_BASE}/api/modules/${moduleId}/exercises`)

  if (!response.ok) {
    throw new Error("Erro ao buscar exercicios")
  }

  return response.json()
}

export async function getExtras(moduleId) {
  const response = await fetch(`${API_BASE}/api/modules/${moduleId}/materials`)

  if (!response.ok) {
    throw new Error("Erro ao buscar materiais")
  }

  return response.json()
}

export async function getLessons(moduleId) {
  const response = await fetch(`${API_BASE}/api/modules/${moduleId}/lessons`)

  if (!response.ok) {
    throw new Error("Erro ao buscar video aulas")
  }

  return response.json()
}

export async function deleteModule(id) {
  const response = await fetchAuth(`${API_BASE}/api/modules/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao deletar módulo");
  }

  return await response.json();
}

export async function createFullModule(moduleData) {
  const response = await fetchAuth(`${API_BASE}/api/modules/full`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(moduleData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao criar módulo completo");
  }

  return await response.json();
}

export async function updateFullModule(id, moduleData) {
  const response = await fetchAuth(`${API_BASE}/api/modules/full/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(moduleData)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Erro ao atualizar módulo completo");
  }

  return await response.json();
}

export async function getFullModules() {
  const response = await fetch(`${API_BASE}/api/modules/full`)

  if (!response.ok) {
    throw new Error("Erro ao buscar modulo")
  }

  return response.json()
}