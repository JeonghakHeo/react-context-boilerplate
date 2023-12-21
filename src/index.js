
import { createRoot } from 'react-dom/client'
import App from './App'
import { UsersContextProvider } from './context/UsersContext'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <UsersContextProvider>
    <App />
  </UsersContextProvider>
)