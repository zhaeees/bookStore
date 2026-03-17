import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router/index'
import './styles/variables.css'
import './styles/reset.css'
import './styles/global.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)
