import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { forwardRef } from 'react';

const Alert = forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function GetSnackBar(props) {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    props.handleClose(false);
  };
// props.severity == 'success', 'error', 'info', 'warning'
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={props.open} autoHideDuration={2500} onClose={() => props.handleClose()}>
        <Alert onClose={handleClose} severity={props.severity} sx={{ width: '100%' }}>
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
