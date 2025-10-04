import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

// Load styles immediately to prevent FOUC
const loadStyles = () => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = '/src/styles/global.css'
  link.media = 'all'
  document.head.appendChild(link)
  
  // Add loaded class to body when styles are loaded
  link.onload = () => {
    document.body.classList.add('loaded')
  }
}

// Load styles immediately, not deferred
loadStyles()

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
