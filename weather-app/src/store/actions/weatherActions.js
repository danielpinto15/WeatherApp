import { GET_WEATHER_INFO, SET_ERROR } from "../type";

export const getWeatherInfo = (city, onSuccess = () => {}, onError = () => {}) => {
    return async dispatch => {
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=0f542b1bf770a3513721fe5f2a26b22e`);
            let resData;
            
            if (!res.ok) {
                resData =  await res.json();
                throw new Error(resData.message);
            }

            resData = await res.json();
            console.log(resData)
            dispatch({
                type: GET_WEATHER_INFO,
                payload: resData,
            });

            onSuccess();

        } catch (err) {
            dispatch({
                type: SET_ERROR,
                payload: err,
            });
            onError();
        }
    }
}

