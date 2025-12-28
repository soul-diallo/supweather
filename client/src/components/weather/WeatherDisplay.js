import React from "react";
import PropTypes from "prop-types";
import "./WeatherDisplay.css";

// Helper for icons
const getWeatherIcon = (code, isDay) => {
    if (code === 0) return isDay ? "wi-day-sunny" : "wi-night-clear";
    if ([1, 2, 3].includes(code)) return isDay ? "wi-day-cloudy" : "wi-night-alt-cloudy";
    if ([45, 48].includes(code)) return "wi-fog";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "wi-rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "wi-snow";
    if ([95, 96, 99].includes(code)) return "wi-thunderstorm";
    return "wi-cloud";
};

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) return null;

  const { location, current, daily, units } = weatherData;
  const maxTemp = Math.round(daily.temperature_2m_max[0]);
  const minTemp = Math.round(daily.temperature_2m_min[0]);
  const currentTemp = Math.round(current.temperature_2m);

  return (
    <div className="weather-wrapper">
      <div className="weather-card glass-panel">
        <div className="weather-main">
            <div className="location-badge">
                <i className="wi wi-map-marker"></i> {location.city}, {location.country}
            </div>
            
            <div className="main-icon-container">
                <i className={`wi ${getWeatherIcon(current.weather_code, current.is_day)}`}></i>
            </div>
            
            <div className="temperature-container">
                <h1 className="temp-value">{currentTemp}°</h1>
                <span className="weather-desc">
                    {/* Simplified description mapping could go here if needed */}
                    {maxTemp}° / {minTemp}°
                </span>
            </div>
        </div>

        <div className="weather-details glass-panel-dark">
            <div className="detail-item">
                <i className="wi wi-humidity"></i>
                <span className="value">{current.relative_humidity_2m}%</span>
                <span className="label">Humidity</span>
            </div>
            <div className="detail-item">
                <i className="wi wi-strong-wind"></i>
                <span className="value">{current.wind_speed_10m} <small>{units.wind_speed_10m}</small></span>
                <span className="label">Wind</span>
            </div>
            <div className="detail-item">
                <i className="wi wi-barometer"></i>
                <span className="value">{current.apparent_temperature}°</span>
                <span className="label">Feels Like</span>
            </div>
        </div>
      </div>
    </div>
  );
};

WeatherDisplay.propTypes = {
  weatherData: PropTypes.object.isRequired
};

export default WeatherDisplay;
