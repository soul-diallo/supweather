import { GET_WEATHER, WEATHER_LOADING, WEATHER_ERROR, CLEAR_WEATHER } from "../actions/types";

const initialState = {
  data: null,
  loading: false,
  error: null
};

export default function weatherReducer(state = initialState, action) {
  switch (action.type) {
    case WEATHER_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_WEATHER:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };
    case WEATHER_ERROR:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload
      };
    case CLEAR_WEATHER:
        return initialState;
    default:
      return state;
  }
}
