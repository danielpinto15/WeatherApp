import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  getWeatherInfo,
  setData,
  getCurrentLocation,
} from '../store/actions/actions';

export default function Search() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [city, setCity] = useState('');

  const onEnterCity = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch(getWeatherInfo(city));
    };
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  useEffect(() => {
    if (state.currentCity) {
      dispatch(getWeatherInfo(state.currentCity));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.currentCity]);

  useEffect(() => {
    if (state.todayWeatherData) {
      const country = state.todayWeatherData.sys.country;
      const tempMax = Math.floor(state.todayWeatherData.main.temp_max);
      const tempMin = Math.floor(state.todayWeatherData.main.temp_min);
      const icon = state.todayWeatherData.weather[0].icon;
      const city = state.todayWeatherData.name;
      let days = state.forecastData || {};
      let forecastFilter = [];

      if (!!days.length) {
        const tomorrow = days[0];
        const tomorrowDate = new Date(tomorrow.dt * 1000);
        forecastFilter = days.filter(
          (day) =>
            new Date(day.dt * 1000).getHours() === tomorrowDate.getHours()
        );
      }
      forecastFilter.shift();

      dispatch(setData(city, country, tempMax, tempMin, icon, forecastFilter));
    }

    setCity('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.todayWeatherData]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        alignItems: 'stretch',
      }}
    >
      <TextField
        label='Search for a city'
        variant='outlined'
        color='primary'
        required
        value={city}
        onChange={onChangeCity}
        onKeyDown={onEnterCity}
        sx={{ flex: '0 1 40%' }}
        data-testid='searchBox'
      />
      <Button
        type='button'
        variant='outlined'
        size='large'
        onClick={() => dispatch(getWeatherInfo(city))}
        color='inherit'
        data-testid='searchButton'
        name='searchButton'
      >
        Search
      </Button>
      <Button
        type='button'
        variant='outlined'
        size='large'
        onClick={() => dispatch(getCurrentLocation())}
        color='inherit'
        data-testid='currentLocationButton'
      >
        Current Location
      </Button>
    </Box>
  );
}
