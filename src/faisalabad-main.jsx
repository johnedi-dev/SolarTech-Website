import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import FaisalabadApp from './FaisalabadApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FaisalabadApp />
  </StrictMode>,
)
