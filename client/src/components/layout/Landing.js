import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getWeather } from "../../actions/weatherActions";
import WeatherDisplay from "../weather/WeatherDisplay";
import "./Landing.css";

// Helper to get weather theme
const getWeatherTheme = (data) => {
    if (!data) return "theme-default";
    const code = data.current.weather_code;
    const isDay = data.current.is_day;

    if (code === 0) return isDay ? "theme-sunny" : "theme-night-clear";
    if ([1, 2, 3].includes(code)) return isDay ? "theme-cloudy" : "theme-night-cloudy";
    if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return "theme-rain";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "theme-snow";
    if ([95, 96, 99].includes(code)) return "theme-thunder";
    if ([45, 48].includes(code)) return "theme-fog";
    return "theme-default";
};

class Landing extends Component {
  constructor() {
    super();
    this.state = {
      city: "",
      errors: {}
    };
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.city.trim() !== "") {
        this.props.getWeather(this.state.city);
    }
  };

  render() {
    const { data, loading, error } = this.props.weather;
    const themeClass = getWeatherTheme(data);

    return (
      <div className={`landing-container ${themeClass}`}>
        <div className="content-wrapper">
            <div className={`search-box ${data ? 'compact glass-mode' : ''}`}>
                <h1 style={{ display: data ? 'none' : 'block' }}>SupWeather</h1>
                <p style={{ display: data ? 'none' : 'block' }}>Forecasts, simplified.</p>
                
                <form onSubmit={this.onSubmit} className="search-form">
                    <input
                        onChange={this.onChange}
                        value={this.state.city}
                        id="city"
                        type="text"
                        placeholder="Enter a city (e.g. Paris, Tokyo)"
                        className="search-input"
                        aria-label="Enter city name for weather forecast"
                        aria-describedby={error ? "search-error" : undefined}
                        autoComplete="off"
                    />
                    <button 
                        type="submit" 
                        className="search-button"
                        aria-label={loading ? "Loading weather data" : "Get weather forecast"}
                        disabled={loading}
                    >
                        {loading ? <div className="spinner-small"></div> : <i className="wi wi-search"></i>}
                    </button>
                </form>
                {error && (
                    <div 
                        className="error-message" 
                        id="search-error"
                        role="alert"
                        aria-live="polite"
                    >
                        {error.message || "City not found"}
                    </div>
                )}
            </div>

            {/* Loading Overlay or Spinner could go here */}
            
            {data && !loading && (
                <WeatherDisplay weatherData={data} />
            )}
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  getWeather: PropTypes.func.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { getWeather }
)(Landing);
