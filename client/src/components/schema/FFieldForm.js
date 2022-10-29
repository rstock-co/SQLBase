import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormInputDropdown } from '../../form-components/FormInputDropdown';
import { FormInputText } from '../../form-components/FormInputText';


const FFieldForm = (props) => {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
  const onSubmit = data => console.log(data);
  console.log(errors);

  const [column, setColumn] = useState("");
  const [dataType, setDataType] = useState("");
  const [mod1, setMod1] = useState("");
  const [mod2, setMod2] = useState("");
  const [reference, setReference] = useState("");
  // console.log("watching Field", watch("Field"))

  return (
    <div></div>
    // <fieldset name={props.field} key={props.field}>
    //   <FormInputText
    //     name={"Field"}
    //     control={control}
    //     label={"Field"} />
    //   <FormInputDropdown
    //     name={"DataType"}
    //     control={control}
    //     label={"DataType"}
    //     menuOptions={[{ label: "int", value: "int" }]}
    //   />
    //   <FormInputDropdown
    //     name={"MOD"}
    //     control={control}
    //     label={"MOD"}
    //     menuOptions={[{ label: "None", value: "" }, { label: "NOT NULL", value: "not null" }]} />

    //   <label>
    //     Default
    //     <input {...register("default", {
    //       required: true,
    //       value: mod2,
    //       onChange: (e) => props.setMod2(`DEFAULT ${e.target.value}`),
    //     })}
    //       type="text"
    //       placeholder="Default..." />
    //   </label>
    //   <label>
    //     References
    //     <select {...register("REFERENCES")}
    //       onChange={(e) => props.setReference(e.target.value)}
    //       defaultValue={reference}
    //     >
    //       <option value="user_id INTEGER REFERENCES users(id) ON DELETE CASCADE">users</option>
    //     </select>
    //   </label>


    //   <button type="button" onClick={() => props.removeField(props.index)}>
    //     Remove
    //   </button>
    // </fieldset>
  )
}

export default FFieldForm;