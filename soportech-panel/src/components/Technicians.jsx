import { useState, useEffect } from 'react'
import { getTechnicians, createTechnician, toggleTechnicianAvailable } from '../api/technicians'


const SPECIALTY_LABELS = {
  hardware: 'Hardware',
  software: 'Software',
  accessibility: 'Accesibilidad',
  other: 'Otro',
}

function getInitials(name) {
  return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}

function Technicians({  token }) {
  const [list, setList] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    fullName: '', email: '', specialty: 'hardware', subRole: 'technician', password: ''
  })

  useEffect(() => {
    async function load() {
      try {
        const data = await getTechnicians(token)
        setList(data)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [token])

  function handleFormChange(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleCreate() {
    if (!form.fullName || !form.email) return
    try {
      const newTech = await createTechnician(token, form)
      setList(prev => [...prev, newTech])
      setForm({ full_name: '', email: '', specialty: 'hardware', subRole: 'technician' })
      setShowForm(false)
    } catch (err) {
      console.error(err)
    }
  }

  async function handleToggleAvailable(id, currentAvailable) {
    const updated = await toggleTechnicianAvailable(token, id, !currentAvailable)
    setList(prev => prev.map(tc => tc.id === id ? updated : tc))
  }


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <i className="ti ti-plus" aria-hidden="true"></i>
          Nuevo técnico
        </button>
      </div>

      {showForm && (
        <div className="detail-card" style={{ marginBottom: '16px' }}>
          <h4>Nuevo técnico</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label htmlFor="tc-name">Nombre completo</label>
              <input
                type="text"
                id="tc-name"
                value={form.full_name}
                onChange={e => handleFormChange('fullName', e.target.value)}
                placeholder="Nombre Apellido"
                autoComplete="name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tc-email">Correo</label>
              <input
                type="email"
                id="tc-email"
                value={form.email}
                onChange={e => handleFormChange('email', e.target.value)}
                placeholder="correo@institución.edu.co"
                autoComplete="email"
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tc-specialty">Especialidad</label>
              <select
                id="tc-specialty"
                value={form.specialty}
                onChange={e => handleFormChange('specialty', e.target.value)}
              >
                <option value="hardware">Hardware</option>
                <option value="software">Software</option>
                <option value="accessibility">Accesibilidad</option>
                <option value="other">Otro</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tc-role">Rol</label>
              <select
                id="tc-role"
                value={form.subRole}
                onChange={e => handleFormChange('subRole', e.target.value)}
              >
                <option value="technician">Técnico</option>
                <option value="auxiliar">Auxiliar</option>
                <option value="assistant">Asistente</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tc-password">Contraseña</label>
              <input
                type="password"
                id="tc-password"
                value={form.password}
                onChange={e => handleFormChange('password', e.target.value)}
                placeholder="••••••••"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <button className="btn btn-primary btn-sm" onClick={handleCreate}>Crear técnico</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowForm(false)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Especialidad</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {list.map(tc => (
                <tr key={tc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="avatar" style={{ width: '30px', height: '30px', fontSize: '11px' }}>
                        {tc.full_name ? getInitials(tc.full_name) : '?'}
                      </div>
                      {tc.full_name}
                    </div>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{tc.email}</td>
                  <td>{SPECIALTY_LABELS[tc.specialty]}</td>
                  <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{tc.sub_role}</td>
                  <td>
                    <span className={`badge ${tc.available ? 'badge-solved' : 'badge-closed'}`}>
                      <span className="badge-dot"></span>
                      {tc.available ? 'Disponible' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-ghost btn-sm"
                      onClick={() => handleToggleAvailable(tc.id, tc.available)}
                    >
                      {tc.available ? 'Desactivar' : 'Activar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Technicians