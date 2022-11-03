import { React, useState } from 'react';
import { Typography, TextField } from '@mui/material'
import { FormInputText } from './FormInputText';

const EditableField = (props) => {
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const handleEditableField = (focused) => setIsNamedFocused(focused);
  console.log(props.state)
  const databaseName = props.state.databaseName


  // const style = {
  //   fontSize: "50px",
  //   margin: 14
  // }
  return (
    <div className="App">
      {!isNameFocused ? (
        <Typography
          sx={{
            // style
          }}
          // className={classes.name}
          onClick={() => {
            handleEditableField(true);
          }}
        >
          {databaseName}
        </Typography>
      ) : (
        <TextField
          autoFocus
          value={databaseName}
          onChange={e => props.handleChange(e, "databaseName", props.state)}
          onBlur={e => handleEditableField(false)} />
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
