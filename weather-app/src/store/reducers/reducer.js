import {
  GET_WEATHER_INFO,
  SET_ERROR,
  SET_DATA,
  DELETE_DATA,
  GET_DATA,
  SET_LOADING,
  GET_CURRENT_LOCATION
} from '../type';

const initialState = {
  forecastData: null,
  todayWeatherData: null,
  error: null,
  isUpdated: false,
  data: null,
  isLoading: false,
  currentCity: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_WEATHER_INFO:
      return {
        ...state,
        forecastData: action.forecast,
        todayWeatherData: action.todayWeather,
        isUpdated: false,
        isLoading: false,
        currentCity: null,
        error: null,
      };
    case SET_DATA:
      return {
        ...state,
        isUpdated: action.payload,
        isLoading: false,
        error: null,
      };
    case DELETE_DATA:
      return {
        ...state,
        isUpdated: action.payload,
        isLoading: false,
        error: null,
      };
    case GET_DATA:
      return {
        ...state,
        data: action.payload,
        isUpdated: false,
        isLoading: false,
        error: null,
      };
    case SET_LOADING:
      return {
        ...state,
        isUpdated: false,
        isLoading: action.payload
      }
    case GET_CURRENT_LOCATION:
      return {
        ...state,
        currentCity: action.payload,
        isUpdated: false,
        isLoading: false,
      }
    case SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
