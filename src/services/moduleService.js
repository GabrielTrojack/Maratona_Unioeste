import API_BASE from "./api"

export async function getModules() {
  const response = await fetch(`${API_BASE}/api/modules`)

  if (!response.ok) {
    throw new Error("Erro ao buscar modulos")
  }

  return response.json()
}

export async function getExtras(moduleId) {
  const response = await fetch(`${API_BASE}/api/lessons/${moduleId}/materials`)

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


