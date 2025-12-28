import axios from "axios";
import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR, CLEAR_WEATHER } from "./types";

// Get Weather by City Name
export const getWeather = (city) => dispatch => {
  dispatch(setWeatherLoading());

  axios
    .get(`/api/weather?city=${city}`)
    .then(res =>
      dispatch({
        type: GET_WEATHER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: WEATHER_ERROR,
        payload: err.response && err.response.data ? err.response.data : { message: "Something went wrong" }
      })
    );
};

// Set loading state
export const setWeatherLoading = () => {
  return {
    type: WEATHER_LOADING
  };
};

// Clear weather state
export const clearWeather = () => {
    return {
        type: CLEAR_WEATHER
    }
}
