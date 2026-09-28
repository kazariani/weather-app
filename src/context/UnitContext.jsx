// context/UnitContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const UnitContext = createContext(null);

export function UnitProvider({ children }) {
    const [unit, setUnit] = useState(() => {
        return localStorage.getItem("weather-unit") || "metric";
    });

    useEffect(() => {
        localStorage.setItem("weather-unit", unit);
    }, [unit]);

    const toggleUnit = () => {
        setUnit((current) =>
            current === "metric" ? "imperial" : "metric"
        );
    };

    const value = {
        unit,
        isMetric: unit === "metric",
        isImperial: unit === "imperial",
        toggleUnit
    };

    return (
        <UnitContext.Provider value={value}>
            {children}
        </UnitContext.Provider>
    );
}

export function useUnit() {
    const context = useContext(UnitContext);

    if (!context) {
        throw new Error("useUnit must be used inside UnitProvider");
    }

    return context;
}
