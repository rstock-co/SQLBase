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
}) => {
  return (
    <Controller
      defaultValue={value}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          key={uniqueID}
          onChange={handleChange}
          value={value}
          label={label}
          size="small"
          margin="dense"
        />
      )}
    />
  );
};
