import { useState, useEffect } from 'react'
import { getTickets } from '../api/tickets'

const STATUS_LABELS = {
  in_progress: 'En progreso',
  revised: 'Revisado',
  solved: 'Resuelto',
  closed: 'Cerrado',
}

function StatusBadge({ status }) {
  return (
    <span className={`badge badge-${status.replace('_', '')}`}>
      <span className="badge-dot"></span>
      {STATUS_LABELS[status]}
    </span>
  )
}

const ACCENT_COLORS = {
  in_progress: 'var(--blue)',
  revised: 'var(--amber)',
  solved: 'var(--green)',
  closed: 'var(--muted)',
}

function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <i className="ti ti-arrows-sort sort-icon" aria-hidden="true"></i>
  return sortDir === 'asc'
    ? <i className="ti ti-sort-ascending sort-icon" aria-hidden="true"></i>
    : <i className="ti ti-sort-descending sort-icon" aria-hidden="true"></i>
}

function TicketList({ user, token, onSelectTicket }) {
    const isAdmin = user.role === 'admin'

    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('all')
    const [sortField, setSortField] = useState('createdAt')
    const [sortDir, setSortDir] = useState('desc')

    useEffect(() => {
        async function load() {
        try {
            const data = await getTickets(token)
            setTickets(data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
        }
        load()
    }, [token])

    if (loading) return <p style={{ color: 'var(--muted)', padding: '24px' }}>Cargando tickets…</p>


  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDir('desc')
    }
  }

  function fmtDate(dt) {
    return new Date(dt).toLocaleDateString('es-CO', {
      day: '2-digit', month: 'short', year: 'numeric'
    })
  }

  const visible = tickets
    .filter(t => {
      if (isAdmin) return true
      if (filter !== 'all' && t.status !== filter) return false
      return t.category.specialtyRequired === user.specialty
    })
    .sort((a, b) => {
      const va = sortField === 'createdAt' ? new Date(a[sortField]) : a[sortField]
      const vb = sortField === 'createdAt' ? new Date(b[sortField]) : b[sortField]
      if (va < vb) return sortDir === 'asc' ? -1 : 1
      if (va > vb) return sortDir === 'asc' ? 1 : -1
      return 0
    })

  return (
    <div>
      <div className="filter-bar">
        {['all', 'in_progress', 'revised', 'solved', 'closed'].map(f => (
          <button
            key={f}
            className={`chip ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {{ all: 'Todos', in_progress: 'En progreso', revised: 'Revisados', solved: 'Resueltos', closed: 'Cerrados' }[f]}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '12px', color: 'var(--muted)' }}>
          {visible.length} tickets
        </span>
      </div>

      <div className="table-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th
                  className={`sortable ${sortField === 'ticketCode' ? 'sorted' : ''}`}
                  onClick={() => handleSort('ticketCode')}
                >
                  Código <SortIcon field="ticketCode" sortField={sortField} sortDir={sortDir} />
                </th>
                <th>Usuario</th>
                <th>Categoría</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th
                  className={`sortable ${sortField === 'createdAt' ? 'sorted' : ''}`}
                  onClick={() => handleSort('createdAt')}
                >
                  Fecha <SortIcon field="createdAt" sortField={sortField} sortDir={sortDir} />
                </th>
                {isAdmin && <th>Técnico</th>}
              </tr>
            </thead>
            <tbody>
              {visible.length === 0 ? (
                <tr>
                  <td colSpan="7">
                    <div className="empty">
                      <i className="ti ti-inbox" aria-hidden="true"></i>
                      <p>No hay tickets con este filtro</p>
                    </div>
                  </td>
                </tr>
              ) : (
                visible.map(t => (
                  <tr key={t.id} onClick={() => onSelectTicket(t)} className="tr-clickable">
                    <td style={{ position: 'relative', paddingLeft: '21px' }}>
                      <div className="row-accent" style={{ background: ACCENT_COLORS[t.status] }}></div>
                      <span className="ticket-code">{t.ticketCode}</span>
                    </td>
                    <td>{t.user.fullName}</td>
                    <td>{t.category.name}</td>
                    <td className="td-truncate">{t.problemDescription}</td>
                    <td><StatusBadge status={t.status} /></td>
                    <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{fmtDate(t.createdAt)}</td>
                    {isAdmin && <td style={{ color: 'var(--muted)', fontSize: '12px' }}>{t.technician}</td>}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TicketList