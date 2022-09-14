import { CardContent, Box, Typography, Card, CardHeader, CardActions} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWeatherInfo } from '../store/actions/weatherActions';
import Avatar from '@mui/material/Avatar';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SnowImage from '../images/snow.jpg'

export default function Weather() {
  const [value, setValue] = useState("");
  const [temp, settemp] = useState("");
  const [typecity, settypecity] = useState("");
  const [city, setcity] = useState("Delhi");
  const [img, setimg] = useState("");
  const [disc, setdisc] = useState("");
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const { weather, loading, error } = state;
 

  const citySelect = (e) => {
    e.preventDefault();
    setcity(typecity);
  };

  useEffect(() => {
    dispatch(getWeatherInfo(city));
    setValue(state.data)
    console.log(value.name)
  }, [city]);

  return (
     <Box>
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                avatar={
                <IconButton>
                    <AcUnitIcon />
                </IconButton>
                }
                action={
                <IconButton>
                    <DeleteOutlineIcon />
                </IconButton>
                }
                title="City Name"
                subheader="Temperature /n Max"
            />
            <CardMedia
                component="img"
                height="194"
                image={SnowImage}
                alt="Snow"
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary">
                    Weather description
                </Typography>
            </CardContent>
        </Card>
    </Box>
  )
};
