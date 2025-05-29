import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from 'src/App'
import { BrowserRouter } from 'react-router-dom'
import './i18n/index'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
