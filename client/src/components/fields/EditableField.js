import { React, useState } from "react";
import { Typography, TextField, Box } from "@mui/material";
import { FormInputText } from "./FormInputText";

const EditableField = props => {
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const handleEditableField = focused => setIsNamedFocused(focused);
  const databaseName = props.state.databaseName;

  const style = {
    fontSize: "24px",
    margin: 0,
    position: "absolute",
    left: 38,
    p: 0,
  };
  return (
    <Box>
      {!isNameFocused ? (
        <Typography
          sx={style}
          // className={classes.name}
          onClick={() => {
            handleEditableField(true);
          }}
        >
          {databaseName}
        </Typography>
      ) : (
        <TextField
          sx={style}
          autoFocus
          value={databaseName}
          onChange={e => props.handleChange(e, "databaseName")}
          onBlur={e => handleEditableField(false)}
        />
      )}
    </Box>
  );
};

export default EditableField;
