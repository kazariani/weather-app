import React from "react";
import "./Forecast.css";
import ForecastDay from "./ForecastDay.jsx";

export default function Forecast(props) {
    return (
        <div className="row weather-next mt-5">
            {props.data.map(function (forecastDay, index) {
                if (index < 7) {
                    return (
                        <div className="col" key={index}>
                            <ForecastDay data={forecastDay} />
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    )
}