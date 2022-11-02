import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { Slide } from '@mui/material';

export default function SuccessSnackbar(props) {
  function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
  }

  const handleClose = (event, reason) => {
    if (reason === 'timeout') {
      return props.handleClose()
    }
  };
  const AlertType = (isError) => {
    console.log(isError)
    if (isError) return "error"
    return "success"
  }
  return (props.message &&
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={props.open}
      autoHideDuration={3000}
      onClose={handleClose}
      TransitionComponent={TransitionUp}
    >
      <Alert severity={AlertType(props.isError)} sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }} >
        <Typography>{props.message}</Typography>
      </Alert>

    </Snackbar>
  );

}