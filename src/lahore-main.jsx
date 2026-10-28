import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LahoreApp from './LahoreApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LahoreApp />
  </StrictMode>,
)
