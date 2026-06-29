export const tickets = [
  { id: 't1', ticketCode: 'TKT-2025-0001', user: { fullName: 'Ana Martínez', whatsappNumber: '3001234567' }, category: { name: 'Hardware' }, problemDescription: 'El computador no enciende después de una caída.', status: 'in_progress', createdAt: '2025-05-28T08:30:00', resolvedAt: null, technician: 'Carlos Ruiz', technician_id: 'tc1' },
  { id: 't2', ticketCode: 'TKT-2025-0002', user: { fullName: 'Juan Pérez', whatsappNumber: '3109876543' }, category: { name: 'Software' }, problemDescription: 'Excel no abre archivos .xlsx.', status: 'revised', createdAt: '2025-05-27T14:20:00', resolvedAt: null, technician: 'Laura Torres', technician_id: 'tc2' },
  { id: 't3', ticketCode: 'TKT-2025-0003', user: { fullName: 'María Gómez', whatsappNumber: '3155551234' }, category: { name: 'Accesibilidad' }, problemDescription: 'El lector de pantalla NVDA dejó de funcionar.', status: 'solved', createdAt: '2025-05-26T10:00:00', resolvedAt: '2025-05-26T15:30:00', technician: 'Diego Mora', technician_id: 'tc3' },
  { id: 't4', ticketCode: 'TKT-2025-0004', user: { fullName: 'Luis Castro', whatsappNumber: '3207778899' }, category: { name: 'Red' }, problemDescription: 'Sin acceso a internet en el bloque B.', status: 'in_progress', createdAt: '2025-05-28T07:00:00', resolvedAt: null, technician: 'Carlos Ruiz', technician_id: 'tc1' },
  { id: 't5', ticketCode: 'TKT-2025-0005', user: { fullName: 'Sofia Herrera', whatsappNumber: '3001112233' }, category: { name: 'Hardware' }, problemDescription: 'Mouse y teclado no responden.', status: 'closed', createdAt: '2025-05-25T11:00:00', resolvedAt: '2025-05-25T16:00:00', technician: 'Laura Torres', technician_id: 'tc2' },
  { id: 't6', ticketCode: 'TKT-2025-0006', user: { fullName: 'Pedro Ramírez', whatsappNumber: '3114445566' }, category: { name: 'Software' }, problemDescription: 'El antivirus bloquea el sistema de matrícula.', status: 'revised', createdAt: '2025-05-28T09:15:00', resolvedAt: null, technician: 'Diego Mora', technician_id: 'tc3' },
]

export const technicians = [
  { id: 'tc1', fullName: 'Carlos Ruiz', email: 'c.ruiz@soporte.edu.co', specialty: 'hardware', subRole: 'technician', available: true },
  { id: 'tc2', fullName: 'Laura Torres', email: 'l.torres@soporte.edu.co', specialty: 'software', subRole: 'technician', available: true },
  { id: 'tc3', fullName: 'Diego Mora', email: 'd.mora@soporte.edu.co', specialty: 'accessibility', subRole: 'auxiliar', available: false },
  { id: 'tc4', fullName: 'Sandra López', email: 's.lopez@soporte.edu.co', specialty: 'other', subRole: 'assistant', available: true },
]

export const techMap = {
  tc1: 'Carlos Ruiz', tc2: 'Laura Torres', tc3: 'Diego Mora', tc4: 'Sandra López',
}

export const history = {
  t1: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-28T08:30:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }],
  t2: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-27T14:20:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }, { new_state: 'revised', previous_state: 'in_progress', changed_at: '2025-05-27T16:00:00', comments: 'Equipo enviado a mantenimiento', technician_id: 'tc2' }],
  t3: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-26T10:00:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }, { new_state: 'solved', previous_state: 'in_progress', changed_at: '2025-05-26T15:30:00', comments: 'Driver actualizado', technician_id: 'tc3' }],
  t4: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-28T07:00:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }],
  t5: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-25T11:00:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }, { new_state: 'solved', previous_state: 'in_progress', changed_at: '2025-05-25T14:00:00', comments: 'Puertos USB reemplazados', technician_id: 'tc2' }, { new_state: 'closed', previous_state: 'solved', changed_at: '2025-05-25T16:00:00', comments: 'Usuario confirmó solución', technician_id: 'tc2' }],
  t6: [{ new_state: 'in_progress', previous_state: null, changed_at: '2025-05-28T09:15:00', comments: 'Ticket creado vía WhatsApp', technician_id: null }, { new_state: 'revised', previous_state: 'in_progress', changed_at: '2025-05-28T10:00:00', comments: 'Configurando exclusión en antivirus', technician_id: 'tc3' }],
}

export const evidences = {
  t1: [{ technician: 'Carlos Ruiz', type: 'comment', content: 'Se revisó fuente de poder. Requiere reemplazo.', registered_at: '2025-05-28T10:30:00' }],
  t2: [{ technician: 'Laura Torres', type: 'comment', content: 'Falla confirmada. Actualizando Office 365.', registered_at: '2025-05-27T15:00:00' }],
  t3: [{ technician: 'Diego Mora', type: 'comment', content: 'Driver de NVDA actualizado.', registered_at: '2025-05-26T15:00:00' }],
}