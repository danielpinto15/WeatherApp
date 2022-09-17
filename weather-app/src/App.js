import React, { useEffect } from "react";
import Weather from "./components/Weather";
import { Container } from "@mui/system";
import { Box, Button, Typography, Grid } from "@material-ui/core";
import Search from "./components/Search";
import Warning from "./components/Warning";
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from "react-redux";

function App() {
  const state = useSelector((state) => state);


  return (
    <Container>
      <Warning />
      <Box>
        <Typography
          variant="h2"
          component="h2"
          color="textPrimary"
          align="center"
          gutterBottom
        >
          Weather app
        </Typography>
        <Search />
        {state.isLoading && <LinearProgress sx={{}}/>}
        <Weather />
      </Box>
    </Container>
  );
}

export default App;
