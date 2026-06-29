const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

export async function loginRequest(email, password) {
  const response = await fetch(`${BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) throw new Error('Credenciales incorrectas')

  return response.json()
}