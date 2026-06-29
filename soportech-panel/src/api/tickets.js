const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function getTickets(token, status = null) {
  const url = status
    ? `${BASE_URL}/api/tickets?status=${status}`
    : `${BASE_URL}/api/tickets`

  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) throw new Error('Error al cargar tickets')
  return response.json()
}

export async function changeTicketStatus(token, ticketId, newStatus, whatsappNumber) {
  const response = await fetch(
    `${BASE_URL}/api/tickets/${ticketId}/status?newStatus=${newStatus}&whatsappNumber=${whatsappNumber}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  if (!response.ok) throw new Error('Error al cambiar estado')
  return response.json()
}

export async function getEvidences(token, ticketId) {
  const response = await fetch(`${BASE_URL}/api/evidences/ticket/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al cargar evidencias')
  return response.json()
}

export async function addEvidence(token, ticketId, technicianId, content) {
  const response = await fetch(`${BASE_URL}/api/evidences`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticketId, technicianId, type: 'comment', content }),
  })
  if (!response.ok) throw new Error('Error al guardar evidencia')
  return response.json()
}

export async function getTicketHistory(token, ticketId) {
  const response = await fetch(`${BASE_URL}/api/tickets/${ticketId}/history`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Error al cargar historial')
  return response.json()
}