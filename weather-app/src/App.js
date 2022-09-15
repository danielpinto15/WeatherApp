import React, { useEffect } from 'react';
import Weather from './components/Weather';
import { Container } from '@mui/system';
import { Box, Button, Typography, Grid } from "@material-ui/core";
import Search from './components/Search';
import Forecast from './components/Forecast';

function App() {
  return (
    <Container maxWidth='lg'>
      <Box sx={{ bgcolor: '#cfe8fc', height: '100vh'  }}>
        <Typography 
          variant='h2'
          component='h2'
          color='textPrimary'
          align='center'
          gutterBottom
        >
          Weather app
        </Typography>
        <Box>
          <Search />
        </Box>
        <Grid container justifyContent="center" mt={2} mb={2}>
            <Weather />
        </Grid>
        <Box sx={{ m: 2 }}>
          <Forecast />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
