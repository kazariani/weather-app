import React, { useState, useEffect } from "react";
import Weather from "../Weather/Weather.jsx";
import Forecast from "../Forecast/Forecast.jsx";
import axios from "axios";
import "./Form.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { useTheme } from "../../context/ThemeContext";

library.add(fas, far)

export default function Form(props) {
    const [weatherData, setWeatherData] = useState({ ready: false });
    const [city, setCity] = useState("");
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const apiKey = "efb47f8f59024381bff113346262109";
    const iconLocation = <FontAwesomeIcon icon="fa-solid fa-location-crosshairs" />;
    const iconSearch = <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />;
    const iconHeart = <FontAwesomeIcon icon="fa-regular fa-heart" />;
    const iconHeartFilled = <FontAwesomeIcon icon="fa-solid fa-heart" />;
    const iconRemove = <FontAwesomeIcon icon="fa-solid fa-xmark" />;
    const iconDropdown = <FontAwesomeIcon icon="fa-solid fa-angle-down" />;
    const iconCloudShowersHeavy = <FontAwesomeIcon icon="fa-solid fa-cloud-showers-heavy" style={{color: "rgb(116, 192, 252)",}} />;
    const iconCloudSun = <FontAwesomeIcon icon="fa-solid fa-cloud-sun" style={{color: "rgb(255, 212, 59)",}} />;
    const iconUmbrella = <FontAwesomeIcon icon="fa-solid fa-umbrella" style={{color: "rgb(99, 230, 190)",}} />;
    const [savedCities, setSavedCities] = useState(() => {
        const saved = localStorage.getItem("savedCities");

        return saved ? JSON.parse(saved) : [];
    });
    const { darkMode } = useTheme();

    useEffect(() => {
        search(city);
    }, [city]);

    useEffect(() => {
        if (savedCities.length > 0 && !city) {
            const defaultCity = savedCities[0];

            setCity(defaultCity);
            search(defaultCity);
        }
    }, []);

    const addFavorite = () => {
        if (!city) {
            return;
        }

        if (savedCities.includes(city)) {
            return;
        }

        setSavedCities((currentCities) => [
            ...currentCities,
            city,
        ]);

        localStorage.setItem("savedCities", JSON.stringify([...savedCities, city]));
    };

    const handleRemoveCity = (cityToRemove) => {
        setSavedCities((currentCities) =>
            currentCities.filter(
                (city) => city !== cityToRemove
            )
        );
        localStorage.setItem("savedCities", JSON.stringify(savedCities.filter(
            (city) => city !== cityToRemove
        )));
    };

    const onCitySelect = (city) => {
        setCity(city);
        search(city);
    };

    const handleResponse = async (response) => {
        setWeatherData({
            city: response.data.location.name,
            country: response.data.location.country,
            timezone: response.data.location.tz_id,
            date: response.data.location.localtime_epoch,
            description: response.data.current.condition.text,
            feelsLike: Math.round(response.data.current.feelslike_c),
            temperature: Math.round(response.data.current.temp_c),
            iconUrl: response.data.current.condition.icon,
            precipitation: response.data.current.cloud,
            humidity: response.data.current.humidity,
            wind: Math.round(response.data.current.wind_kph),
            coordinates: response.data.location,
            forecast: response.data.forecast.forecastday,
            ready: true
        });
        setError("");
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        search(searchText);
        setCity(searchText);
        setSearchText("");
    }

    const handleResponseLocation = (response) => {
        const cityName = response.data.location.name;

        setCity(cityName);
        search(cityName);
    }

    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser.");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                let lat = parseFloat(position.coords.latitude).toFixed(4);
                let lon = parseFloat(position.coords.longitude).toFixed(4);
                let apiUrlLocation = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;

                try {
                    const response = await axios.get(apiUrlLocation);

                    handleResponseLocation(response);
                } catch (err) {
                    setError("Unable to fetch weather data.");
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            },

            (error) => {
                setLoading(false);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError("Please allow location access.");
                        break;

                    case error.POSITION_UNAVAILABLE:
                        setError("Your location could not be determined.");
                        break;

                    case error.TIMEOUT:
                        setError("Location request timed out.");
                        break;

                    default:
                        setError("Something went wrong.");
                }
            },

            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    }

    const search = (cityToSearch) => {
        if (!cityToSearch?.trim()) {
            return;
        }

        setLoading(true);
        setError("");

        let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityToSearch}&days=7&aqi=no&alerts=no`;
        axios.get(apiUrl).then(handleResponse).catch((error) => {
            setError("Could not fetch weather data.");
        }).finally(() => {
            setLoading(false);
        });
    }

    return (
        <div>
            <div className="row align-items-center mb-5">
                {weatherData.ready ? (
                    <div className="col-auto">
                        {savedCities.includes(city) ?
                        <div className="fav-add" onClick={() => handleRemoveCity(city)}>{iconHeartFilled}</div> :
                        <div className="fav-add" onClick={addFavorite}>{iconHeart}</div>
                    }
                    </div>
                ) : (
                    <div></div>
                )}
                

                <div className="col text-end">
                    <div className="dropdown fav-cities">
                        <button className={`btn dropdown-toggle ${darkMode ? 'btn-dark' : 'btn-light'}`} type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                            Saved cities {iconDropdown}
                        </button>
                        <ul className={`dropdown-menu ${darkMode ? 'dropdown-menu-dark' : ''}`}>
                            <li><h6 className="dropdown-header">{savedCities.length > 0 ? "Your Saved Cities" : "No Saved Cities"}</h6></li>
                            {savedCities.map(function (item, index) {
                                return (
                                    <li key={index} className="dropdown-item">
                                        <small className="fav-city" onClick={() => onCitySelect(item)}>{item}</small> <small onClick={() => handleRemoveCity(item)} className="fav-remove">{iconRemove}</small>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>

            <span className="error">{error && <p>{error}</p>}</span>

            <form onSubmit={handleSubmit} className="row align-items-stretch">
                <div className="col pe-1">
                    <input onChange={(event) => setSearchText(event.target.value)} type="search" className={`form-control ${darkMode ? 'text-light bg-dark border-secondary' : ''}`} value={searchText} placeholder="Please enter a city..." />
                </div>

                <div className="col-auto ps-0">
                    <button type="submit" className="btn btn-primary">
                        {iconSearch} Search
                    </button>
                </div>

                <div className="col-auto">
                    <button onClick={getCurrentLocation} disabled={loading} type="button" className="btn btn-primary">
                        {iconLocation} Current Location
                    </button>
                </div>
            </form>
            {weatherData.ready ? (
                <div>
                    <Weather data={weatherData} />
                    <Forecast data={weatherData.forecast} />
                </div>
            ) : (
                <div className="welcome mt-5">
                    <h2>Welcome to the Weather App!</h2>
                    <div className="d-flex justify-content-evenly w-100">{iconCloudShowersHeavy} {iconCloudSun} {iconUmbrella}</div>
                    <h3>Please search for a city to get started</h3>
                </div>
            )}
        </div>
    )
}