import React, { useEffect } from 'react';
import Weather from './components/Weather';
import { Container } from '@mui/system';
import Masonry from '@mui/lab/Masonry';
import { Box, Button, Typography } from "@material-ui/core";
import Search from './components/Search';

function App() {
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1
  }
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
        <Masonry
          breakpointcols={breakpoints}
          className='my-masonry-grid'
          columnclassname='my-masonry-grid_column'
        >
          <Box mt={2}>
            <Weather />
          </Box>
        </Masonry>
      </Box>
    </Container>
  );
}

export default App;
