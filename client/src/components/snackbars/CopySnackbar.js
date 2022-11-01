import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert, Typography } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

export default function CopySnackbar(props) {

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={props.open}
      autoHideDuration={5000}
      onClose={props.handleClose}
    // action={action}
    >
      <Alert onClose={props.handleClose} severity="success" sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }} >
        <Typography>{props.message}</Typography>
      </Alert>

    </Snackbar>

  );
}