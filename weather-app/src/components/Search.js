import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { getWeatherInfo } from '../store/actions/weatherActions';
import { useDispatch, useSelector } from 'react-redux';

export default function Search() {
  const dispatch = useDispatch();
  const state = useSelector(state => state);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [temp_max, setTemp_Max] = useState('');
  const [temp_min, setTemp_min] = useState('');
  const [icon, setIcon] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getWeatherInfo(e.target[0].value));
    setCity(e.target[0].value)
  };

  useEffect(() => {
    if(Object.entries(state).length === 0) {
      setCountry(state.data.sys.country)
      setTemp_Max(Math.floor(state.data.main.temp_max))
      setTemp_min(Math.floor(state.data.main.temp_min))
      setIcon(state.data.weather[0].icon)

      fetch ('http://localhost:8000/citys', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({city, country, temp_max, temp_min, icon})
      })
    }
    
    console.log("search", state)
    
  }, [city]);

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Stack mb={4} spacing={2} direction="row">
            <TextField
                  label='Search for a city'
                  variant='outlined'
                  color='primary'
                  fullWidth
                  required
              />
              <Button
                  type='submit'
                  variant="outlined"
                  size="large"
            >Search</Button>
        </Stack>
      </form>
    </Box> 
  )
}
