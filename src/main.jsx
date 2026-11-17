import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Disable Ctrl+scroll zoom and Ctrl +/-/0 zoom
document.addEventListener('wheel', (e) => {
  if (e.ctrlKey) e.preventDefault()
}, { passive: false })

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && ['+', '-', '=', '_', '0'].includes(e.key)) e.preventDefault()
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
