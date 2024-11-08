import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import { Game } from '../components/game'
// import { Game } from '../components/test'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Game/>
  </StrictMode>,
)