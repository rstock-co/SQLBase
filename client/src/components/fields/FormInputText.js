import React from "react";
import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({
  uniqueID,
  name,
  control,
  label,
  value,
  handleChange,
  disabled
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, } }) => (
        <TextField
          key={uniqueID}
          onChange={handleChange}
          value={value}
          label={label}
          size="small"
          margin="dense"
          disabled={disabled}
          sx={{ minWidth: 50, marginLeft: '0.5%' }}
        />
      )}
    />
  );
};
