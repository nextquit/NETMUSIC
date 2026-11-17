import { useState } from 'react'

const FEATURES = [
  { title: 'Ad-Free Music', desc: 'Enjoy unlimited songs without a single interruption. Pure music, zero ads.', icon: '🎵' },
  { title: 'Listen Offline', desc: 'Download your favourite tracks and playlists. Play without internet.', icon: '📥' },
  { title: 'Hi-Fi Audio Quality', desc: 'Experience studio-grade sound with lossless & high-bitrate streaming.', icon: '🎧' },
  { title: 'Cross-Device Sync', desc: 'Seamlessly switch between phone, tablet, laptop and smart speakers.', icon: '📱' },
]

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const EyeOff = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0112 20C6 20 2 12 2 12a18.8 18.8 0 015.06-6.06M9.9 4.24A10.94 10.94 0 0112 4c6 0 10 8 10 8a18.8 18.8 0 01-2.49 3.65M6.53 6.53L17.47 17.47" />
  </svg>
)

export default function Landing({ onCreateAccount, onSignIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const handleSignIn = () => {
    setError('')
    if (!email.trim()) { setError('Please enter your email.'); return }
    if (!password) { setError('Please enter your password.'); return }
    const accounts = JSON.parse(localStorage.getItem('nm_accounts') || '[]')
    const user = accounts.find(
      a => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password
    )
    if (!user) { setError('Incorrect email or password. Please try again.'); return }
    localStorage.setItem('nm_current_user', JSON.stringify({ name: user.name, email: user.email }))
    onSignIn(user.name)
  }

  return (
    <div className="landing-root">
      <nav className="landing-nav">
        <div className="landing-logo">
          <span className="brand-logo">NETMUSIC</span>
        </div>
        <div className="landing-nav-right">
          <button className="account-request-btn">GET PREMIUM</button>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero-content">
          <h1 className="hero-title">Unlimited music,<br />podcasts, and more</h1>
          <p className="hero-sub">Listen anywhere, anytime.</p>
          <p className="hero-cta-text">Ready to listen? Sign in or create a free account.</p>

          <div className="hero-input-group">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
            </span>
            <input
              type="email"
              placeholder="Email address"
              className="hero-icon-input"
              aria-label="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="hero-input-group">
            <span className="input-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
                <circle cx="12" cy="16" r="1.2" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="hero-icon-input"
              aria-label="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="input-eye-btn"
              onClick={() => setShowPassword(v => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff /> : <EyeOpen />}
            </button>
          </div>

          <button className="hero-get-started-btn hero-signin-btn" onClick={handleSignIn}>
            Sign In &nbsp;›
          </button>

          {error && <p className="signin-error">{error}</p>}

          <div className="social-divider">
            <span className="social-divider-line" />
            <span className="social-divider-text">or</span>
            <span className="social-divider-line" />
          </div>

          <button className="social-signin-btn google-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button className="social-signin-btn github-btn">
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            Continue with GitHub
          </button>

          <p className="hero-create-link">
            New here?{' '}
            <button className="create-account-link" onClick={onCreateAccount}>
              Create a free account
            </button>
          </p>
        </section>

        <section className="reasons-section" aria-label="Why NETMUSIC">
          <h2 className="section-heading">More reasons to join</h2>
          <div className="reasons-grid">
            {FEATURES.map((f, i) => (
              <div className="reason-card" key={i}>
                <div className="reason-card-top">
                  <p className="reason-title">{f.title}</p>
                  <p className="reason-desc">{f.desc}</p>
                </div>
                <div className="reason-icon-wrap">
                  <span className="feat-icon" aria-hidden="true" style={{ fontSize: 42, lineHeight: 1 }}>{f.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-left">
            <h3 className="footer-heading">Let's connect</h3>
            <ul className="footer-links-primary">
              <li><a href="#">About NETMUSIC</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>



          <div className="footer-social">
            <span className="footer-follow">Follow us</span>
            <div className="footer-social-icons">
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.751 3h3.067l-6.7 7.625L22 21h-6.172l-4.833-6.293L5.464 21H2.395l7.167-8.155L2 3h6.328l4.37 5.752zm-1.076 16.172h1.7L7.404 4.732H5.58z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2zm2-6a2 2 0 110 4 2 2 0 010-4z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" aria-label="YouTube" className="footer-social-btn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NETMUSIC. All rights reserved.</span>
        </div>
      </footer>
    </div>
  )
}
