import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { getWeatherInfo, setData } from "../store/actions/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Search() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [city, setCity] = useState('');

  const onEnterCity = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      dispatch(getWeatherInfo(city));
    }
  };

  const onChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = () => {
    dispatch(getWeatherInfo(city));
  };

  useEffect(() => {
    if (state.todayWeatherData != null) {
      const country = state.todayWeatherData.sys.country;
      const tempMax = Math.floor(state.todayWeatherData.main.temp_max);
      const tempMin = Math.floor(state.todayWeatherData.main.temp_min);
      const icon = state.todayWeatherData.weather[0].icon;

      let days = state.forecastData || {};
      let forecastFilter = [];

      if (!!days.length) {
        const tomorrow = days[0];
        const tomorrowDate = new Date(tomorrow.dt * 1000);
        forecastFilter = days.filter(
          (day) => new Date(day.dt * 1000).getHours() === tomorrowDate.getHours()
        );
      }
      forecastFilter.shift();

      dispatch(setData(city, country, tempMax, tempMin, icon, forecastFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.todayWeatherData]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        alignItems: "stretch",
      }}
    >
      <TextField
        label="Search for a city"
        variant="outlined"
        color="primary"
        required
        value={city}
        onChange={onChangeCity}
        onKeyDown={onEnterCity}
        sx={{ flex: "0 1 40%" }}
      />
      <Button
        type="button"
        variant="outlined"
        size="large"
        onClick={handleSubmit}
      >
        Search
      </Button>
    </Box>
  );
}
