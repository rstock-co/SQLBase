import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Controller } from "react-hook-form";

export const FormInputDropdown = ({
  uniqueID,
  name,
  control,
  label,
  menuOptions,
  handleChange,
  value
}) => {
  const options = menuOptions;
  const generateSelectOptions = () => {
    return options.map(option => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, } }) => (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            key={uniqueID}
            onChange={handleChange}
            value={value}
            label={label}
            defaultValue=""
          >
            {generateSelectOptions()}
          </Select>
        </FormControl>
      )}
    />
  );
};
