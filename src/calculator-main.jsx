import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CalculatorApp from './CalculatorApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CalculatorApp />
  </StrictMode>,
)
