import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const FieldForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);
  
  return (
    <div>
      <input type="text" placeholder="Field Name" {...register} />
        <select {...register("Data Type")}>
          <option value="Text">Text</option> 
          <option value="Integer">Integer</option>
          <option value="Date">Date</option>
        </select>
      <input type="number" placeholder="Data type value" {...register} />
        <select {...register("MOD1")}>
          <option value="NOT_NULL">NOTNULL</option>
        </select>
        <select {...register("MOD2")}>
          <option value="PLACEHOLDER">Placeholder</option>
        </select>
        <select {...register("References")}>
          <option value="Table_1">Table 1</option>
        </select>
      <input type="undefined" placeholder="On Delete" {...register} />
      <input type="undefined" placeholder="Default" {...register} />
      <input type="undefined" placeholder="Default Value" {...register} />
    </div>
  )
}

export default FieldForm;