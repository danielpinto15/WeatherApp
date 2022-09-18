import reducer from '../reducers/reducer';
import {
  GET_WEATHER_INFO,
  SET_DATA,
  DELETE_DATA,
  GET_DATA,
  SET_LOADING,
  GET_CURRENT_LOCATION,
  SET_ERROR,
} from '../type';

describe('Initial State', () => {
  test('is correct', () => {
    const action = { type: 'dummy_action' };
    const initialState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: false,
      data: null,
      isLoading: false,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(initialState);
  });
});

describe('SET_DATA', () => {
  test('returns the correct state', () => {
    const action = { type: SET_DATA, payload: true };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: true,
      data: null,
      isLoading: false,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('DELETE_DATA', () => {
  test('returns the correct state', () => {
    const action = { type: DELETE_DATA, payload: true };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: true,
      data: null,
      isLoading: false,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('GET_DATA', () => {
  test('returns the correct state', () => {
    const action = { type: GET_DATA, payload: 'Weather Data' };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: false,
      data: 'Weather Data',
      isLoading: false,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('SET_LOADING', () => {
  test('returns the correct state', () => {
    const action = { type: SET_LOADING, payload: true };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: false,
      data: null,
      isLoading: true,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('GET_CURRENT_LOCATION', () => {
  test('returns the correct state', () => {
    const action = { type: GET_CURRENT_LOCATION, payload: 'Leiria' };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: null,
      isUpdated: false,
      data: null,
      isLoading: false,
      currentCity: 'Leiria',
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('SET_ERROR', () => {
  test('returns the correct state', () => {
    const action = { type: SET_ERROR, payload: 'This is an error' };
    const expectedState = {
      forecastData: null,
      todayWeatherData: null,
      error: 'This is an error',
      isUpdated: false,
      data: null,
      isLoading: false,
      currentCity: null,
    };

    expect(reducer(undefined, action)).toEqual(expectedState);
  });
});

describe('GET_WEATHER_INFO', () => {
    test('returns the correct state', () => {
      const action = { type: GET_WEATHER_INFO, forecast: 'Sun', todayWeather: 'More Sun'};
      const expectedState = {
        forecastData: 'Sun',
        todayWeatherData: 'More Sun',
        error: null,
        isUpdated: false,
        data: null,
        isLoading: false,
        currentCity: null,
      };
  
      expect(reducer(undefined, action)).toEqual(expectedState);
    });
  });
