import React from "react";
import { CardContent, Typography, Card, Box, CardHeader } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import { useSelector } from "react-redux";

export default function Forecast() {
  const state = useSelector((state) => state);

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Thursday",
    "Wednesday",
    "Friday",
    "Saturday",
  ];

  let days = state.forecastData ? state.forecastData : {};
  let dayFilter = [];
  if (!!days.length) {
    const tomorow = days[0];
    const tomorowDate = new Date(tomorow.dt * 1000);
    dayFilter = days.filter(
      (day) => new Date(day.dt * 1000).getHours() === tomorowDate.getHours()
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
        alignItems: "stretch",
      }}
    >
      {Object.entries(dayFilter).length > 0 &&
        dayFilter.map((day) => (
          <Card
            key={day.dt}
            sx={{
              backgroundColor: "transparent",
              margin: "2 0",
              flex: "0 0 195px",
            }}
          >
            <CardHeader
              style={{ textAlign: "center" }}
              title={weekday[new Date(day.dt_txt).getDay()]}
            />
            <CardMedia
              component="img"
              height="194"
              image={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt="Snow"
            />
            <CardContent>
              <Typography
                variant="body2"
                style={{ textAlign: "center" }}
                color="textSecondary"
              >
                Max {`${Math.floor(day.main.temp_max)}°C`} Min{" "}
                {`${Math.floor(day.main.temp_min)}°C`}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
}
