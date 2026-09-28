import React from "react";
import "./Footer.css"
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
    const { darkMode } = useTheme();

    return (
        <footer className={`d-flex justify-content-between align-items-center mt-2 ${darkMode ? 'text-white-50' : 'text-secondary'}`}>
            <small>Powered by <a href="https://www.weatherapi.com/" title="Free Weather API" target="_blank" rel="noreferrer">WeatherAPI.com</a></small>
            <small>Open source code by <a href="https://github.com/kazariani/weather-app" title="GitHub" target="_blank" rel="noreferrer">kazariani</a></small>
        </footer>
    )
}