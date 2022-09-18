import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

export default function CustomizedSnackbars() {
  const [open, setOpen] = React.useState(false);
  const state = useSelector((state) => state);

  useEffect(() => {
    if (state.isUpdated || state.error) {
      setOpen(true);
    }
  }, [state.isUpdated, state.error]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack data-testid='toast' spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={state.error ? 'error' : 'success'}
          sx={{ width: '100%' }}
        >
          {state.error
            ? 'The following error occured: ' + state.error.message
            : 'Forecast updated'}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
