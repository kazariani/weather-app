import React from "react";
import "./Temperature.css";
import { useUnit } from "../../context/UnitContext";

export default function Temperature(props) {
    const { unit, toggleUnit } = useUnit();

    return (
        <span className="temperature-today">
            <span className="temperature-value">{unit === "metric" ? props.data : Math.round(props.data*9/5 + 32)}</span>
            <span className="temperature-unit">
                <span className="temperature-unit_current">
                    °{unit === "metric" ? "C" : "F"}
                </span> | <span className="temperature-unit_toggle" onClick={toggleUnit}>°{unit === "metric" ? "F" : "C"}</span>
            </span>
        </span>
    )
}