import {
  GET_WEATHER_INFO,
  SET_ERROR,
  SET_DATA,
  DELETE_DATA,
  GET_DATA,
  SET_LOADING,
  GET_CURRENT_LOCATION,
} from '../type';

export const getWeatherInfo = (city) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
      ).then((res) => res.json());

      if (forecastRes.message) {
        throw new Error(forecastRes.message);
      }

      const todayWeatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
      ).then((res) => res.json());

      if (todayWeatherRes.message) {
        throw new Error(todayWeatherRes.message);
      }

      dispatch({
        type: GET_WEATHER_INFO,
        forecast: forecastRes.list,
        todayWeather: todayWeatherRes,
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

      await fetch('http://localhost:8000/citys', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
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

      await fetch('http://localhost:8000/citys/' + id, {
        method: 'DELETE',
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

      const citiesData = await fetch('http://localhost:8000/citys').then(
        (res) => res.json()
      );

      if (citiesData.message) {
        throw new Error(citiesData.message);
      }

      dispatch({
        type: GET_DATA,
        payload: citiesData,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};

export const getCurrentLocation = () => {
  return async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING,
        payload: true,
      });

      let latitude, longitude;

      if (navigator.geolocation) {
        await fetch(
          navigator.geolocation.getCurrentPosition(
            success,
            error
          )
        );
      }

      function success(data) {
        latitude = data.coords.latitude;
        longitude = data.coords.longitude;
      }

      function error(data) {
        throw new Error(data);
      }

      const currentCityWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=0f542b1bf770a3513721fe5f2a26b22e`
      ).then((res) => res.json());

      if (currentCityWeather.message) {
        throw new Error(currentCityWeather.message);
      }

      dispatch({
        type: GET_CURRENT_LOCATION,
        payload: currentCityWeather.name,
      });
    } catch (err) {
      dispatch({
        type: SET_ERROR,
        payload: err,
      });
    }
  };
};
