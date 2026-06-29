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

function Dashboard({ token, onNavigate }) {
    const [tickets, setTickets] = useState([])

    useEffect(() => {
        async function load() {
        try {
            const data = await getTickets(token)
            setTickets(data)
        } catch (err) {
            console.error(err)
        }
        }
        load()
    }, [token])

        const counts = tickets.reduce((acc, t) => {
        acc[t.status] = (acc[t.status] || 0) + 1
        return acc
        }, {})

    const cats = tickets.reduce((acc, t) => {
        acc[t.category.name] = (acc[t.category.name] || 0) + 1
        return acc
    }, {})

    const recent = tickets.slice(0, 4)

    return (
        <div>
        <div className="metrics-grid">
            <div className="metric-card blue">
            <div className="metric-label">En progreso</div>
            <div className="metric-value">{counts.in_progress || 0}</div>
            <div className="metric-sub">tickets activos</div>
            </div>
            <div className="metric-card amber">
            <div className="metric-label">Revisados</div>
            <div className="metric-value">{counts.revised || 0}</div>
            <div className="metric-sub">en mantenimiento</div>
            </div>
            <div className="metric-card green">
            <div className="metric-label">Resueltos</div>
            <div className="metric-value">{counts.solved || 0}</div>
            <div className="metric-sub">esta semana</div>
            </div>
            <div className="metric-card muted">
            <div className="metric-label">Cerrados</div>
            <div className="metric-value">{counts.closed || 0}</div>
            <div className="metric-sub">totales</div>
            </div>
        </div>

        <div className="two-col-grid">
            <div className="table-card">
            <div className="table-card-header">
                <h3>Tickets recientes</h3>
                <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('tickets')}>
                Ver todos
                </button>
            </div>
            <div className="table-wrap">
                <table>
                <thead>
                    <tr>
                    <th>Código</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {recent.map(t => (
                    <tr key={t.id}>
                        <td><span className="ticket-code">{t.ticketCode}</span></td>
                        <td className="td-truncate">{t.problemDescription}</td>
                        <td><StatusBadge status={t.status} /></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>

            <div className="table-card">
            <div className="table-card-header"><h3>Por categoría</h3></div>
            <div style={{ padding: '16px' }}>
                {Object.entries(cats).map(([cat, n]) => (
                <div key={cat} style={{ marginBottom: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>{cat}</span>
                    <span style={{ fontSize: '12px', fontWeight: 500 }}>{n}</span>
                    </div>
                    <div className="bar-track">
                    <div className="bar-fill" style={{ width: `${Math.round(n / tickets.length * 100)}%` }}></div>
                    </div>
                </div>
                ))}
            </div>
            </div>
        </div>
        </div>
    )
}

export default Dashboard