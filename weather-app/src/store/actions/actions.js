import {
  GET_WEATHER_INFO,
  SET_ERROR,
  SET_DATA,
  DELETE_DATA,
  GET_DATA,
  SET_LOADING,
} from "../type";

export const getWeatherInfo = (city) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
      );
      const forecastResData = await forecastRes.json();

      if (!forecastRes.ok) {
        throw new Error(forecastResData.message);
      }

      const todayWeatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
      );
      const todayWeatherResData = await todayWeatherRes.json();

      if (!todayWeatherRes.ok) {
        throw new Error(todayWeatherResData.message);
      }

      dispatch({
        type: GET_WEATHER_INFO,
        forecast: forecastResData.list,
        todayWeather: todayWeatherResData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};

export const setData = (city, country, tempMax, tempMin, icon, forecast) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      await fetch("http://localhost:8000/citys", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          city,
          country,
          tempMax,
          tempMin,
          icon,
          forecast,
        }),
      });

      dispatch({
        type: SET_DATA,
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};

export const deleteData = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      await fetch("http://localhost:8000/citys/" + id, {
        method: "DELETE",
      });

      dispatch({
        type: DELETE_DATA,
        payload: true,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};

export const getData = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const citiesData = await fetch("http://localhost:8000/citys");
      const cities = await citiesData.json();

      if (!citiesData.ok) {
        throw new Error(cities.message);
      }

      dispatch({
        type: GET_DATA,
        payload: cities,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};
