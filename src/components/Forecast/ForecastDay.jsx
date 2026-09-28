import React from "react";
import { useUnit } from "../../context/UnitContext";

export default function ForecastDay(props) {
    const { unit } = useUnit();
    
    return (
        <div className="text-center">
            <div>{new Date(props.data.date).toLocaleDateString("en-US", { weekday: "short" })}</div>
            <small className="text-secondary">{new Date(props.data.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small><br />
            <img alt={props.data.day.condition.text} src={props.data.day.condition.icon}></img>

            <div className="d-flex justify-content-evenly">
                <span className="temperature-max">
                    {unit === "metric" ? Math.round(props.data.day.maxtemp_c) : Math.round(props.data.day.maxtemp_c*9/5 + 32)}°
                </span>
                <span className="text-secondary">
                    {unit === "metric" ? Math.round(props.data.day.mintemp_c) : Math.round(props.data.day.mintemp_c*9/5 + 32)}°
                </span>
            </div>
        </div>
    );
}