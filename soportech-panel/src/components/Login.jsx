import { useState } from 'react'
import { loginRequest } from '../api/auth'

function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      setError('Completa todos los campos.')
      return
    }

    setError('')
    setLoading(true)

    try {
      const data = await loginRequest(email, password)
      onLogin(data)
    } catch (error){
      setError('Coreo o contraseña incorrectos.')
      setLoading(false)
    }
  }

  return (
    <div className="login-outer">
      <div className="login-left">
        <div className="login-left-bg"></div>
        <div className="login-left-glow"></div>
        <div className="login-left-content">
          <div className="login-brand">
            <div className="login-brand-icon">
              <i className="ti ti-ticket" aria-hidden="true"></i>
            </div>
            <div>
              <h1>SoporteTech</h1>
              <span>Sistema de gestión IT</span>
            </div>
          </div>
          <div className="login-headline">
            <h2>
              Soporte técnico<br />
              desde WhatsApp<br />
              <span>hasta resolución</span>
            </h2>
            <p>Gestiona tickets, técnicos y el historial completo de cada incidente desde un solo panel.</p>
          </div>
          <div className="login-stats">
            <div className="login-stat">
              <div className="num">6</div>
              <div className="lbl">tickets activos</div>
            </div>
            <div className="stat-divider"></div>
            <div className="login-stat">
              <div className="num">4</div>
              <div className="lbl">técnicos</div>
            </div>
            <div className="stat-divider"></div>
            <div className="login-stat">
              <div className="num">2</div>
              <div className="lbl">resueltos hoy</div>
            </div>
          </div>
        </div>
        <div className="login-deco">
          <div className="login-deco-bar" style={{ background: 'var(--blue)', opacity: 0.6 }}></div>
          <div className="login-deco-bar" style={{ background: 'var(--amber)', opacity: 0.4, flex: 0.3 }}></div>
          <div className="login-deco-bar" style={{ background: 'var(--green)', opacity: 0.4, flex: 0.2 }}></div>
          <div className="login-deco-bar" style={{ background: 'var(--border)', flex: 2 }}></div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-form-wrap">
          <h3>Iniciar sesión</h3>
          <p>Accede con tu correo institucional</p>

          <div className="form-group">
            <label htmlFor="login-email">Correo institucional</label>
            <input
              type="email"
              id="login-email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && document.getElementById('login-pwd').focus()}
              placeholder="usuario@institución.edu.co"
              autoComplete="email"
              spellCheck="false"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="login-pwd">Contraseña</label>
            <input
              type="password"
              id="login-pwd"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>

          {error && (
            <p className="login-error">
              <i className="ti ti-alert-circle" aria-hidden="true"></i>
              {error}
            </p>
          )}

          <button
            className="btn btn-primary login-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Verificando…
              </>
            ) : (
              <>
                <i className="ti ti-login" aria-hidden="true"></i>
                Iniciar sesión
              </>
            )}
          </button>

          {import.meta.env.VITE_SHOW_DEMO_CREDENTIALS === 'true' && (
            <div className="login-demo">
              <p><strong>Admin:</strong> admin@soporte.edu.co / admin123</p>
              <p><strong>Técnico:</strong> c.ruiz@soporte.edu.co / tech123</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login