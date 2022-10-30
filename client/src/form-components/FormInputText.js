import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

export const FormInputText = ({
  uniqueID,
  name,
  control,
  label,
  value,
  _handleChange,
}) => {
  return (
    <Controller
      defaultValue={value}
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          key={uniqueID}
          onChange={_handleChange}
          value={value}
          label={label}
          size="small"
        />
      )}
    />
  );
};
