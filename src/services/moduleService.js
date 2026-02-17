import API_BASE from "./api"

export async function getModules() {
  const response = await fetch(`${API_BASE}/api/modules`)

  if (!response.ok) {
    throw new Error("Erro ao buscar modulos")
  }

  return response.json()
}