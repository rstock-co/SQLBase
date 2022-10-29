import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormContext, Controller } from "react-hook-form";




export const FormInputDropdown = ({ name, control, label, menuOptions }) => {
  const options = menuOptions
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return <Controller
    defaultValue=""
    control={control}
    name={name}
    render={({ field: { onChange, value } }) => (
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select onChange={onChange} value={value} label={label}>
          {generateSelectOptions()}
        </Select>
      </FormControl>
    )}
  />
};