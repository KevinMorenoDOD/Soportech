import { changeTicketStatus } from '../api/tickets'
import { useState, useEffect } from 'react'
import { history, evidences, techMap } from '../data/mockData'
import { getTicketHistory, getEvidences, addEvidence } from '../api/tickets'
import { getTechnicians } from '../api/technicians'

const STATUS_LABELS = {
  in_progress: 'En progreso',
  revised: 'Revisado',
  solved: 'Resuelto',
  closed: 'Cerrado',
}

const ACCENT_COLORS = {
  in_progress: 'var(--blue)',
  revised: 'var(--amber)',
  solved: 'var(--green)',
  closed: 'var(--muted)',
}

const NEXT_STATUSES = {
  in_progress: ['revised', 'solved'],
  revised: ['solved'],
  solved: ['closed'],
  closed: [],
}

function StatusBadge({ status }) {
  return (
    <span className={`badge badge-${status.replace('_', '')}`}>
      <span className="badge-dot"></span>
      {STATUS_LABELS[status]}
    </span>
  )
}

function TicketDetail({ ticket, user, token, onBack, onStatusChange }) {
  const [ticketHistory, setTicketHistory] = useState([])
  const [ticketEvidences, setTicketEvidences] = useState([])
  const [showEvidenceForm, setShowEvidenceForm] = useState(false)
  const [technicianMap, setTechnicianMap] = useState({})
  const [evidenceText, setEvidenceText] = useState('')

  const nextStatuses = NEXT_STATUSES[ticket.status] || []

  useEffect(() => {
    async function load() {
      try {
        const [hist, evs, techs] = await Promise.all([
          getTicketHistory(token, ticket.id),
          getEvidences(token, ticket.id),
          getTechnicians(token),
        ])
        setTicketHistory(hist)
        setTicketEvidences(evs)
        const map = {}
        techs.forEach(t => { map[t.id] = t.full_name })
        setTechnicianMap(map)
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [ticket.id])


  function fmt(dt) {
    if (!dt) return '—'
    return new Date(dt).toLocaleString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

    async function handleStatusChange(newStatus) {
        try {
        const updated = await changeTicketStatus(token, ticket.id, newStatus, ticket.user.whatsappNumber)
        onStatusChange(updated)
        } catch (err) {
        console.error(err)
        }
    }

    async function handleSaveEvidence() {
      if (!evidenceText.trim()) return
      try {
        await addEvidence(token, ticket.id, user.id, evidenceText)
        const evs = await getEvidences(token, ticket.id)
        setTicketEvidences(evs)
        setEvidenceText('')
        setShowEvidenceForm(false)
      } catch (err) {
        console.error(err)
      }
    }

  return (
    <div>
      <div className="detail-topbar">
        <button className="btn btn-ghost btn-sm" onClick={onBack}>
          <i className="ti ti-arrow-left" aria-hidden="true"></i>
          Volver
        </button>
        <span className="ticket-code" style={{ fontSize: '13px' }}>{ticket.ticketCode}</span>
        <StatusBadge status={ticket.status} />
      </div>

      <div className="detail-grid">
        <div>
          <div className="detail-card">
            <h4>Información del ticket</h4>
            <div className="detail-row">
              <span className="key">Usuario</span>
              <span className="val">{ticket.user.fullName}</span>
            </div>
            <div className="detail-row">
              <span className="key">WhatsApp</span>
              <span className="val muted">{ticket.user.whatsappNumber}</span>
            </div>
            <div className="detail-row">
              <span className="key">Categoría</span>
              <span className="val">{ticket.category.name}</span>
            </div>
            <div className="detail-row">
              <span className="key">Técnico asignado</span>
              <span className="val">{ticket.technician}</span>
            </div>
            <div className="detail-row">
              <span className="key">Creado</span>
              <span className="val muted">{fmt(ticket.createdAt)}</span>
            </div>
            <div className="detail-row">
              <span className="key">Resuelto</span>
              <span className="val muted">{fmt(ticket.resolvedAt)}</span>
            </div>
          </div>

          <div className="detail-card">
            <h4>Descripción del problema</h4>
            <p style={{ fontSize: '13px', lineHeight: 1.6 }}>{ticket.problemDescription}</p>
          </div>

          <div className="detail-card">
            <h4>Evidencias ({ticketEvidences.length})</h4>
            {ticketEvidences.length === 0 && !showEvidenceForm && (
              <div className="empty" style={{ padding: '20px 0' }}>
                <i className="ti ti-notes" aria-hidden="true"></i>
                <p>Sin evidencias aún</p>
              </div>
            )}
            {ticketEvidences.map((e, i) => (
              <div key={i} className="evidence-item">
                <p>{e.content}</p>
                <span>{e.technician.fullName} · {fmt(e.registeredAt)}</span>
              </div>
            ))}
            {ticket.status !== 'closed' && (
              showEvidenceForm ? (
                <div style={{ marginTop: '12px' }}>
                  <div className="form-group">
                    
                    <label htmlFor="evidence-text">Comentario</label>
                    <textarea
                      id="evidence-text"
                      value={evidenceText}
                      onChange={e => setEvidenceText(e.target.value)}
                      placeholder="Describe lo que encontraste o hiciste…"
                    />
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button className="btn btn-primary btn-sm" onClick={handleSaveEvidence}>Guardar</button>
                    <button className="btn btn-ghost btn-sm" onClick={() => setShowEvidenceForm(false)}>Cancelar</button>
                  </div>
                </div>
              ) : (
                <button className="btn btn-ghost btn-sm" style={{ marginTop: '8px' }} onClick={() => setShowEvidenceForm(true)}>
                  <i className="ti ti-plus" aria-hidden="true"></i>
                  Agregar evidencia
                </button>
              )
            )}
          </div>
        </div>

        <div>
          <div className="detail-card">
            {nextStatuses.length > 0 ? (
              <>
                <h4>Cambiar estado</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {nextStatuses.map(ns => (
                    <button key={ns} className="btn btn-ghost" onClick={() => handleStatusChange(ns)}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ACCENT_COLORS[ns], flexShrink: 0 }}></div>
                      Marcar como {STATUS_LABELS[ns]}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Ticket cerrado — sin acciones disponibles</p>
            )}
          </div>

          <div className="detail-card">
            <h4>Historial de estados</h4>
            {ticketHistory.map((h, i) => (
              <div key={i} className="history-item">
                <div className="history-dot" style={{ background: ACCENT_COLORS[h.newState] }}></div>
                <div className="history-content">
                  <p>{STATUS_LABELS[h.newState]}</p>
                  {h.technicianId
                    ? <p className="h-tech">
                        <i className="ti ti-user" style={{ fontSize: '11px' }} aria-hidden="true"></i>
                        {technicianMap[h.technicianId] || h.technicianId}
                      </p>
                    : <p className="h-system">Sistema</p>
                  }
                  {h.comments && <p className="h-comment">{h.comments}</p>}
                  <p className="h-date">{fmt(h.changedAt)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail