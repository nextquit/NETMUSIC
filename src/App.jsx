import { useState } from 'react'
import Terms from './components/Terms.jsx'
import Landing from './components/Landing.jsx'
import CreateAccount from './components/CreateAccount.jsx'
import Home from './components/Home.jsx'

const NM_TERMS_KEY = 'nm_terms_accepted'

function getInitialState() {
  const saved = localStorage.getItem('nm_current_user')
  if (saved) {
    try {
      const user = JSON.parse(saved)
      if (user?.name) return { page: 'home', name: user.name }
    } catch {}
  }
  return {
    page: localStorage.getItem(NM_TERMS_KEY) === 'yes' ? 'landing' : 'terms',
    name: '',
  }
}

export default function App() {
  const init = getInitialState()
  const [page, setPage] = useState(init.page)
  const [name, setName] = useState(init.name)

  if (page === 'terms') {
    return (
      <Terms
        onAccept={() => {
          localStorage.setItem(NM_TERMS_KEY, 'yes')
          setPage('landing')
        }}
      />
    )
  }

  if (page === 'create') {
    return (
      <CreateAccount
        onBack={() => setPage('landing')}
        onCreated={() => {
          const saved = JSON.parse(localStorage.getItem('nm_current_user') || '{}')
          setName(saved.name || 'Friend')
          setPage('home')
        }}
      />
    )
  }

  if (page === 'home') {
    return (
      <Home
        name={name}
        onLogout={() => {
          localStorage.removeItem('nm_current_user')
          setName('')
          setPage('landing')
        }}
      />
    )
  }

  return (
    <Landing
      onCreateAccount={() => setPage('create')}
      onSignIn={userName => {
        setName(userName)
        setPage('home')
      }}
    />
  )
}
