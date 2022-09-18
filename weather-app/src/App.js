import React from 'react';
import WeatherCard from './components/WeatherCard';
import { Container } from '@mui/system';
import { Box, Typography } from '@material-ui/core';
import Search from './components/Search';
import Toast from './components/Toast';

function App() {
  return (
    <Container>
      <Toast />
      <Box>
        <Typography
          variant='h2'
          color='textPrimary'
          align='center'
          gutterBottom
          data-testid='header'
          sx={{fontFamily: 'Lavender' }}
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
