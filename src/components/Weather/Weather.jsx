import React from "react";
import "./Weather.css";

import FormattedDate from "../FormattedDate/FormattedDate.jsx";
import Temperature from "../Temperature/Temperature.jsx";
import { useUnit } from "../../context/UnitContext";
import { useTheme } from "../../context/ThemeContext";

export default function Weather(props) {
    const { unit } = useUnit();
    const { darkMode } = useTheme();

    return (
        <div className="mt-5">
            <h2>
                {props.data.city} <small className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>({props.data.country})</small>
            </h2>
            
            <div className="row align-items-center">
                <div className="col-auto">
                    <FormattedDate city={props.data.city} date={props.data.date} timezone={props.data.timezone} />
                    <span className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>{props.data.description}</span>
                </div>

                <div className="col text-nowrap text-end">
                    <img src={props.data.iconUrl} alt={props.data.description} className="weather-icon" />

                    <Temperature data={props.data.temperature} />
                </div>

                <div className="col-4">
                    <ul className="list-unstyled text-end mb-0">
                        <li className="small">
                            <span className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>Feels like:</span> <span className="weather-feelslike">{unit === "metric" ? props.data.feelsLike : Math.round(props.data.feelsLike*9/5 + 32)}°{unit === "metric" ? "C" : "F"}</span>
                        </li>
                        <li className="small"><span className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>Precipitation:</span> {props.data.precipitation}%</li>
                        <li className="small"><span className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>Humidity:</span> {props.data.humidity}%</li>
                        <li className="small"><span className={`${darkMode ? 'text-white-50' : 'text-secondary'}`}>Wind:</span> {props.data.wind} km/h</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}