import React from "react";
import "./ThemeSwitcher.css";
import { useTheme } from "../../context/ThemeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

const ThemeSwitcher = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <div className="theme-switcher">
            <button
                type="button"
                className="btn btn-outline-secondary theme-toggle"
                onClick={toggleTheme}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>
        </div>
    );
};

export default ThemeSwitcher;