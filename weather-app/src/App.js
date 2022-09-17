import React from 'react';
import WeatherCard from './components/WeatherCard';
import { Container } from '@mui/system';
import { Box, Typography } from '@material-ui/core';
import Search from './components/Search';
import Toast from './components/Toast';
import { useSelector } from 'react-redux';

function App() {
  const state = useSelector((state) => state);

  return (
    <Container>
      <Toast />
      <Box>
        <Typography
          variant='h2'
          component='h2'
          color='textPrimary'
          align='center'
          gutterBottom
        >
          Weather app
        </Typography>
        <Search />
        <WeatherCard />
      </Box>
    </Container>
  );
}

export default App;
