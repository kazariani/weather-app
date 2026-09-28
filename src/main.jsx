import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css'
import App from './App.jsx'
import { UnitProvider } from "./context/UnitContext";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<UnitProvider>
			<ThemeProvider>
        <App />
      </ThemeProvider>
    </UnitProvider>
  </StrictMode>,
)
