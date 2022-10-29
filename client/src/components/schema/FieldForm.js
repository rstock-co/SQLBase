import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const FieldForm = (props) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  const [ column, setColumn ] = useState("");
  const [ dataType, setDataType ] = useState("");
  const [ mod1, setMod1] = useState("");
  const [ mod2, setMod2] = useState("");
  const [ reference, setReference] = useState("");
  
  return (
    <fieldset name={props.field} key={props.field}>
            <label>
              Field {props.index}:
              <input {...register("fieldname", {
               required: true,
               value: column,
               onChange: (e) => props.setColumn(e.target.value),
               })} 
               type="text"
               placeholder="First name" />
            </label>
            <label>
              DataType
              <select {...register("Data_type")}
              onChange={(e) => props.setDataType(e.target.value)}
              defaultValue={dataType}
              >
                <option value="Text">Text</option> 
                <option value="Integer">Integer</option>
                <option value="Date">Date</option>
                <option value="Boolean">Boolean</option>
              </select>
            </label>
            <label>
            <select {...register("MOD1")}
              onChange={(e) => props.setMod1(e.target.value)}
              defaultValue={mod1}
            >
              <option value="">NO MOD</option> 
              <option value="NOT_NULL">NOT NULL</option>
              <option value="NOT_NULL">UNIQUE</option>
            </select>
            </label>

            <label>
              Default
              <input {...register("default", {
               required: true,
               value: mod2,
               onChange: (e) => props.setMod2(`DEFAULT ${e.target.value}`),
              })} 
               type="text"
               placeholder="Default..." />
            </label>
              <label>
                References
                <select {...register("REFERENCES")}
                  onChange={(e) => props.setReference(e.target.value)}
                  defaultValue={reference}
                >
                  <option value="user_id INTEGER REFERENCES users(id) ON DELETE CASCADE">users</option>
                </select>
              </label>


            <button type="button" onClick={() => props.removeField(props.index)}>
            Remove
          </button>
          </fieldset>
  )
}

export default FieldForm;