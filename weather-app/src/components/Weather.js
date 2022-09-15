import { CardContent, Box, Typography, Card, CardHeader, CardActions} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherInfo } from '../store/actions/weatherActions';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

export default function Weather() {
  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { weather, loading, error } = state;
  const [country, setCountry] = useState("");

  useEffect(() => {
    setValue(state.data)
    console.log("weather component", state.data)
    console.log(value)
  }, [state]);

  console.log("weather component", state.data);

  return (
    <Box>
      <Card>
        {state.data.length > 0 && <CardHeader
              title={state.data[0].name}
              //subheader={state.data.sys.country}
          />}
          {state.data.length > 0 && <CardMedia
              component="img"
              height="194"
              image={`https://openweathermap.org/img/wn/${state.data[0].weather[0].icon}@2x.png`}
              alt="Snow"
          />}
          {state.data.length > 0 && <CardContent>
              <Typography variant="body2" color="textSecondary">
                 Today: Max {`${Math.floor(state.data[0].main.temp_max)}°C`} Min {`${Math.floor(state.data[0].main.temp_min)}°C`}
              </Typography>
          </CardContent>}
      </Card>
    </Box>
  )
};
