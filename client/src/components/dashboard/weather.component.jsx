import React from "react";
import "./weather.style.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Weather = props => {
  return (
    <div className="container text-light" style={{ backgroundColor: "#00ff9b" , alignContent: "center" }}>
      <div className="Card">
        <h1 className="text-black py-3" style={{ textAlign: "center" }}>{props.cityname}</h1>
        <h5 className="py-4" style={{ textAlign: "center" }}>
          <i className={`wi ${props.weatherIcon} display-1`}  />
        </h5>

        {/* Get Celsius */}
        {props.temp_celsius ? (
          <h1 className="py-2" style={{ textAlign:"center" }}>{props.temp_celsius}&deg;</h1>
        ) : null}

        {/* show max and min temp */}
        {maxminTemp(props.temp_min, props.temp_max)}

        {/* Weather description */}
        <h4 className="py-3" style={{ textAlign: "center" }}>
          {props.description.charAt(0).toUpperCase() +
            props.description.slice(1)}
        </h4>
      </div>
    </div>
  );
};

export default Weather;

function maxminTemp(min, max) {
  if (max && min) {
    return (
      <h3 style={{ textAlign: "center" }}>
        <span className="px-4">{min}&deg;</span>
        <span className="px-4">{max}&deg;</span>
      </h3>
    );
  }
}
