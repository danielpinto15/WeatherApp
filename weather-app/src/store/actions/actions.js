import {
  GET_WEATHER_INFO,
  SET_ERROR,
  SET_DATA,
  DELETE_DATA,
  GET_DATA,
  SET_LOADING,
  GET_CURRENT_LOCATION,
} from '../type';

const setLoading = (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
};

export const getWeatherInfo = (city) => {
  return async (dispatch) => {
    setLoading(dispatch);

    await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
    )
      .then(async (res) => {
        const forecastResJson = await res.json();
        if (res.ok) {
          return forecastResJson;
        }

        throw new Error(forecastResJson.message);
      })
      .then(async (forecastResJson) => {
        await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0f542b1bf770a3513721fe5f2a26b22e`
        )
          .then(async (res) => {
            const todayWeatherResJson = await res.json();
            if (res.ok) {
              return todayWeatherResJson;
            }
            throw new Error(todayWeatherResJson.message);
          })
          .then((todayWeatherResJson) => {
            dispatch({
              type: GET_WEATHER_INFO,
              forecast: forecastResJson.list,
              todayWeather: todayWeatherResJson,
            });
          })
          .catch((err) => {
            dispatch({
              type: SET_ERROR,
              payload: err,
            });
          });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      });
  };
};

export const setData = (city, country, tempMax, tempMin, icon, forecast) => {
  return async (dispatch) => {
    setLoading(dispatch);

    await fetch('http://localhost:8000/cities', {
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
    })
      .then(async (res) => {
        const resJson = await res.json();
        if (res.ok) {
          return resJson;
        }
        throw new Error(resJson.message);
      })
      .then(() => {
        dispatch({
          type: SET_DATA,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      });
  };
};

export const deleteData = (id) => {
  return async (dispatch) => {
    setLoading(dispatch);

    await fetch('http://localhost:8000/cities/' + id, {
      method: 'DELETE',
    })
      .then(async(res) => {
        const resJson = await res.json();
        if (res.ok) {
          return resJson;
        }
        throw new Error(resJson.message);
      })
      .then(() => {
        dispatch({
          type: DELETE_DATA,
          payload: true,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      });
  };
};

export const getData = () => {
  return async (dispatch) => {
    setLoading(dispatch);

    await fetch('http://localhost:8000/cities')
      .then(async(res) => {
        const resJson = await res.json();
        if (res.ok) {
          return resJson;
        }
        throw new Error(resJson.message);
      })
      .then((resJson) => {
        dispatch({
          type: GET_DATA,
          payload: resJson,
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_ERROR,
          payload: err,
        });
      });
  };
};

export const getCurrentLocation = () => {
  return async (dispatch) => {
    setLoading(dispatch);

    const success = async (data) => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=0f542b1bf770a3513721fe5f2a26b22e`
      )
        .then(async(res) => {
          const resJson = await res.json();
          if (res.ok) {
            return resJson;
          }
          throw new Error(resJson.message);
        })
        .then((resJson) => {
          dispatch({
            type: GET_CURRENT_LOCATION,
            payload: resJson.name,
          });
        })
        .catch((err) => {
          dispatch({
            type: SET_ERROR,
            payload: err,
          });
        });
    };

    const error = (data) => {
      throw new Error(data);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
};
