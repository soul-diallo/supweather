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

  // Keyboard event handler for interactive elements
  const handleKeyPress = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (action) action();
    }
  };

  return (
    <div className="weather-wrapper">
      <div 
        className="weather-card glass-panel"
        role="region"
        aria-label={`Weather information for ${location.city}, ${location.country}`}
        tabIndex="0"
      >
        <div className="weather-main">
            <div className="location-badge">
                <i className="wi wi-map-marker" aria-hidden="true"></i> 
                <span>{location.city}, {location.country}</span>
            </div>
            
            <div className="main-icon-container" role="img" aria-label={`Weather icon showing current conditions`}>
                <i className={`wi ${getWeatherIcon(current.weather_code, current.is_day)}`} aria-hidden="true"></i>
            </div>
            
            <div className="temperature-container">
                <h1 className="temp-value" aria-label={`Current temperature ${currentTemp} degrees`}>
                    {currentTemp}°
                </h1>
                <span className="weather-desc" aria-label={`High ${maxTemp} degrees, low ${minTemp} degrees`}>
                    {/* Simplified description mapping could go here if needed */}
                    {maxTemp}° / {minTemp}°
                </span>
            </div>
        </div>

        <div 
            className="weather-details glass-panel-dark"
            role="group"
            aria-label="Current weather conditions"
        >
            <div 
                className="detail-item"
                tabIndex="0"
                role="button"
                aria-label={`Humidity ${current.relative_humidity_2m} percent`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-humidity" aria-hidden="true"></i>
                <div className="content">
                    <span className="value">{current.relative_humidity_2m}%</span>
                    <span className="label">Humidity</span>
                </div>
            </div>
            <div 
                className="detail-item"
                tabIndex="0"
                role="button"
                aria-label={`Wind speed ${current.wind_speed_10m} ${units.wind_speed_10m}`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-strong-wind" aria-hidden="true"></i>
                <div className="content">
                    <span className="value">{current.wind_speed_10m} <small>{units.wind_speed_10m}</small></span>
                    <span className="label">Wind</span>
                </div>
            </div>
            <div 
                className="detail-item"
                tabIndex="0"
                role="button"
                aria-label={`Feels like temperature ${current.apparent_temperature} degrees`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-barometer" aria-hidden="true"></i>
                <div className="content">
                    <span className="value">{current.apparent_temperature}°</span>
                    <span className="label">Feels Like</span>
                </div>
            </div>
        </div>

        <div 
            className="additional-metrics glass-panel-dark"
            role="group"
            aria-label="Additional weather metrics"
        >
            <div 
                className="metric-item"
                tabIndex="0"
                role="button"
                aria-label={`Precipitation ${current.precipitation || 0} millimeters`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-raindrop" aria-hidden="true"></i>
                <div className="content">
                    <span className="metric-value">{current.precipitation || 0} <small>mm</small></span>
                    <span className="metric-label">Precipitation</span>
                </div>
            </div>
            <div 
                className="metric-item"
                tabIndex="0"
                role="button"
                aria-label={`Daily temperature range ${maxTemp - minTemp} degrees`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-thermometer" aria-hidden="true"></i>
                <div className="content">
                    <span className="metric-value">{maxTemp - minTemp}°</span>
                    <span className="metric-label">Daily Range</span>
                </div>
            </div>
            <div 
                className="metric-item"
                tabIndex="0"
                role="button"
                aria-label={`Time period ${current.is_day ? 'Day' : 'Night'}`}
                onKeyDown={(e) => handleKeyPress(e)}
            >
                <i className="wi wi-time-4" aria-hidden="true"></i>
                <div className="content">
                    <span className="metric-value">{current.is_day ? 'Day' : 'Night'}</span>
                    <span className="metric-label">Time Period</span>
                </div>
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
