import {
  CardContent,
  Box,
  Typography,
  Card,
  CardHeader,
  IconButton,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CardMedia from '@mui/material/CardMedia';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteData, getData } from '../store/actions/actions';
import LinearProgress from '@mui/material/LinearProgress';

export default function Weather() {
  const [cities, setCities] = useState();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Thursday',
    'Wednesday',
    'Friday',
    'Saturday',
  ];

  useEffect(() => {
    dispatch(getData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.isUpdated) {
      dispatch(getData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isUpdated]);

  useEffect(() => {
    if (state.data) {
      setCities(state.data);
    }
  }, [state.data]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          p: 0.1,
        }}
      >
        {state.isLoading && <LinearProgress data-testid='loadingBar' color='inherit' sx={{ width: '69%', margin: '20px' }} />}
      </Box>
      <Box
        data-testid='weatherCardBox'
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'center',
          p: 2,
        }}
      >
        {cities &&
          cities.map((city, index) => (
            <Card
              key={city.id}
              sx={{ backgroundColor: 'transparent', m: 2, order: index * -1 }}         
            >
              <CardHeader
                title={city.city}
                subheader={city.country}
                action={
                  <IconButton
                    onClick={() => dispatch(deleteData(city.id))}
                    aria-label='settings'
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              />
              <CardMedia
                component='img'
                height='214'
                image={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                alt='Snow'
              />
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ width: '30px', height: '30px' }}></Box>
                  <Typography
                    variant='body2'
                    color='textSecondary'
                    sx={{ justifyContent: 'flex-start' }}
                  >
                    Today: Max {city.tempMax}°C` Min {city.tempMin}°C`
                  </Typography>
                </Box>
                {city.forecast &&
                  city.forecast.map((day, idx) => (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      key={idx}
                    >
                      <img
                        src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                        style={{ width: '30px', height: '30px' }}
                        alt='weather icon'
                      />
                      <Typography
                        variant='body2'
                        style={{ textAlign: 'left' }}
                        color='textSecondary'
                      >
                        {weekday[new Date(day.dt_txt).getDay()]}: Max{' '}
                        {`${Math.floor(day.main.temp_max)}°C`} Min{' '}
                        {`${Math.floor(day.main.temp_min)}°C`}
                      </Typography>
                    </Box>
                  ))}
              </CardContent>
            </Card>
          ))}
      </Box>
    </>
  );
}
