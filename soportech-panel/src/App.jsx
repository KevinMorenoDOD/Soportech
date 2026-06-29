import { useState } from 'react'
import { tickets, history, techMap } from './data/mockData'
import Login from './components/Login'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import TicketList from './components/TicketList'
import TicketDetail from './components/TicketDetail'
import Technicians from './components/Technicians'

function App() {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [currentView, setCurrentView] = useState('dashboard')
    const [selectedTicket, setSelectedTicket] = useState(null)

    function handleLogin(data) {
        setToken(data.token)
        setUser({ fullName: data.fullName, role: data.role, id: data.id, specialty: data.specialty })
    }
        
    function handleSelectTicket(ticket) {
        setSelectedTicket(ticket)
        setCurrentView('ticket-detail')
    }

    function handleNavigate(view) {
        setCurrentView(view)
        setSelectedTicket(null)
    }

    function handleStatusChange(updatedTicket) {
        setSelectedTicket(updatedTicket)
    }

    if (!user) return <Login onLogin={handleLogin} />

    return (
        <Layout user={user} currentView={currentView} onNavigate={handleNavigate} onLogout={() => setUser(null)}>
        {currentView === 'dashboard' && <Dashboard token={token} onNavigate={handleNavigate} />}
        {currentView === 'tickets' && <TicketList user={user} token={token} onSelectTicket={handleSelectTicket} />}
        {currentView === 'ticket-detail' && (
            <TicketDetail
                ticket={selectedTicket}
                user={user}
                token={token}
                onBack={() => handleNavigate('tickets')}
                onStatusChange={handleStatusChange}
            />
        )}
        {currentView === 'technicians' && <Technicians token={token} />}
        </Layout>
    )
}

export default App