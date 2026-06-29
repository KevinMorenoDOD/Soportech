function Layout({ user, currentView, onNavigate, onLogout, children }) {
  const isAdmin = user.role === 'admin'

  function getInitials(name) {
    return name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
  }

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <h1>SoporteTech</h1>
          <span>Panel IT</span>
        </div>

        <div className="nav">
          <div className="nav-section">Principal</div>

          <button
            className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`}
            onClick={() => onNavigate('dashboard')}
          >
            <i className="ti ti-layout-dashboard" aria-hidden="true"></i>
            Dashboard
          </button>

          <button
            className={`nav-item ${currentView === 'tickets' ? 'active' : ''}`}
            onClick={() => onNavigate('tickets')}
          >
            <i className="ti ti-ticket" aria-hidden="true"></i>
            Tickets
          </button>

          {isAdmin && (
            <button
              className={`nav-item ${currentView === 'technicians' ? 'active' : ''}`}
              onClick={() => onNavigate('technicians')}
            >
              <i className="ti ti-users" aria-hidden="true"></i>
              Técnicos
            </button>
          )}
        </div>

        <div className="sidebar-footer">
          <div className="user-pill">
            <div className="avatar">{getInitials(user.fullName)}</div>
            <div className="user-info">
              <p>{user.fullName}</p>
              <span>{user.role === 'admin' ? 'Administrador' : 'Técnico'}</span>
            </div>
          </div>
          <button className="nav-item" onClick={onLogout}>
            <i className="ti ti-logout" aria-hidden="true"></i>
            Cerrar sesión
          </button>
        </div>
      </nav>

      <main className="main">
        <div className="topbar">
          <h2>{{ dashboard: 'Dashboard', tickets: 'Tickets', technicians: 'Gestión de técnicos' }[currentView]}</h2>
        </div>
        <div className="content">
          {children}
        </div>
      </main>
    </div>
  )
}

export default Layout