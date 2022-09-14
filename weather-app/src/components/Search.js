import React from 'react';
import { Box, Button, TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';

export default function Search() {
  return (
    <Box sx={{ with: 1/2 }}>
        <Stack mb={4} spacing={2} direction="row">
        <TextField
                onChange={(e) => console.log(e.target.value)}
                label='City'
                variant='outlined'
                color='primary'
                fullWidth
                required
            />
            <Button 
                variant="outlined"
                size="large"
            >Search</Button>
        </Stack>   
    </Box> 
  )
}
