
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react"; // ✅ add here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />

    {/* Toast */}
    <ToastContainer position="top-right" autoClose={3000} />

    {/* ✅ Analytics add here */}
    <Analytics />

  </StrictMode>,
)