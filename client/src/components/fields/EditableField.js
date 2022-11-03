import React from 'react';
import { Typography, TextField } from '@mui/material'
import { FormInputText } from './FormInputText';

const EditableField = (props) => {
  console.log(props.state)

  // const style = {
  //   fontSize: "50px",
  //   margin: 14
  // }
  return (
    <div className="App">
      {!props.focused ? (
        <Typography
          sx={{
            // style
          }}
          // className={classes.name}
          onClick={() => {
            props.focus(true);
          }}
        >
          {props.state.databaseName}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={props.state.databaseName}
          onChange={e => props.handleChange(e, "databaseName")}
          onBlur={e => props.focus(false)} />
        // <FormInputText
        // // autoFocus
        // // // inputProps={{ className: classes.name }}
        // // value={props.state.databaseName}
        // // handleChange={e => props.handleChange(e, "databaseName")}
        // // onBlur={e => props.focus(false)}
        // />
      )}
    </div>
  );
}

export default EditableField;
