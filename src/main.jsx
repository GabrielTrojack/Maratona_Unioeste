import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NavBar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBar />
    <App />
    <Footer />
  </StrictMode>,
)
