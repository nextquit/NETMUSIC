import { useState } from 'react'

function getFirstName(name = '') {
  return name.trim().split(' ')[0] || 'Friend'
}

function getTimeOfDay() {
  const h = new Date().getHours()
  if (h >= 5 && h < 12) return 'morning'
  if (h >= 12 && h < 17) return 'afternoon'
  if (h >= 17 && h < 21) return 'evening'
  return 'night'
}

const TIME_CONFIG = {
  morning:   { label: 'Good Morning', emoji: '☀️' },
  afternoon: { label: 'Good Afternoon', emoji: '🎵' },
  evening:   { label: 'Good Evening', emoji: '🌅' },
  night:     { label: 'Good Night', emoji: '🌙' },
}

const SIDEBAR_ITEMS = [
  { icon: '🏠', label: 'Home' },
  { icon: '📚', label: 'Your Library' },
  { icon: '❤️', label: 'Liked Songs' },
  { icon: '🕐', label: 'Recent' },
]

export default function Home({ name, onLogout }) {
  const firstName = getFirstName(name)
  const [menuOpen, setMenuOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <div className={`hp-root${dark ? ' hp-dark' : ' hp-light'}`} onClick={() => setMenuOpen(false)}>
      {/* Nav */}
      <nav className="hp-nav">
        <div className="hp-nav-left">
          <button
            className={`hp-hamburger${sidebarOpen ? ' hp-hamburger-open' : ''}`}
            aria-label="Toggle sidebar"
            onClick={e => { e.stopPropagation(); setSidebarOpen(v => !v) }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <path d="M9 3v18" />
              <path d="M15 10l-3 3 3 3" />
            </svg>
          </button>
          <span className="hp-brand">NETMUSIC</span>
        </div>

        <div className="hp-nav-center">
          <div className="hp-searchbar">
            <svg className="hp-searchbar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input className="hp-searchbar-input" type="text" placeholder="What do you want to play?" aria-label="Search" />
          </div>
        </div>

        <div className="hp-nav-right">
          <button className="hp-create-btn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Create
          </button>

          <button className="hp-bell-btn" aria-label="Notifications">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 01-3.46 0" />
            </svg>
          </button>

          <div className="hp-avatar-wrap" onClick={e => { e.stopPropagation(); setMenuOpen(v => !v) }}>
            <button className={`hp-nav-avatar${menuOpen ? ' hp-avatar-active' : ''}`} title={firstName}>
              {firstName[0].toUpperCase()}
            </button>
            {menuOpen && (
              <div className="hp-avatar-menu">
                <button className="hp-avatar-menu-item" onClick={e => { e.stopPropagation(); setDark(v => !v) }}>
                  {dark ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                    </svg>
                  )}
                  {dark ? 'Light Mode' : 'Dark Mode'}
                </button>
                <div className="hp-avatar-menu-divider" />
                <button className="hp-avatar-menu-item hp-menu-logout" onClick={onLogout}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Body */}
      <div className="hp-body">
        {/* Sidebar */}
        <aside className={`hp-sidebar${sidebarOpen ? ' hp-sidebar-open' : ''}`}>
          <div className="hp-sidebar-user">
            <div className="hp-sidebar-avatar">{firstName[0].toUpperCase()}</div>
            <div className="hp-sidebar-user-info">
              <span className="hp-sidebar-name">{name}</span>
              <span className="hp-sidebar-plan">Free Account</span>
            </div>
          </div>
          <div style={{ background: 'var(--nav-border)', height: 1, margin: '4px 0' }} />
          <nav style={{ flex: 1, padding: '8px 10px', overflowY: 'auto' }}>
            {SIDEBAR_ITEMS.map(item => (
              <button
                key={item.label}
                className={`hp-sidebar-item${activeNav === item.label ? ' hp-sidebar-item-active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <span className="hp-sidebar-item-icon">{item.icon}</span>
                <span className="hp-sidebar-item-label">{item.label}</span>
              </button>
            ))}
          </nav>

        </aside>

        {/* Main content */}
        <main className="hp-main">
        </main>
      </div>
    </div>
  )
}
