const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function getTechnicians(token) {
  const response = await fetch(`${BASE_URL}/api/Technicians`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al cargar técnicos')
  return response.json()
}

export async function createTechnician(token, data) {
  const response = await fetch(`${BASE_URL}/api/Technicians`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fullName: data.fullName,
      email: data.email,
      specialty: data.specialty,
      sub_role: data.subRole,
      password: data.password,
    }),
  })
  if (!response.ok) throw new Error('Error al crear técnico')
  return response.json()
}

export async function toggleTechnicianAvailable(token, id, available) {
  const response = await fetch(`${BASE_URL}/api/Technicians/${id}/available?available=${available}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al cambiar disponibilidad')
  return response.json()
}