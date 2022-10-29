import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FFieldForm from './FFieldForm'
import { CopyBlock, monokai } from "react-code-blocks";
import Box from '@mui/material/Box';
import { FormInputText } from '../../form-components/FormInputText';
import { FormInputDropdown } from '../../form-components/FormInputDropdown';

const SSchemaForms = () => {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);
  console.log("watching Field", watch("title"))

  // const [ tableString, setTableString ] = useState("");
  // const [ fieldForm, setFieldForm ] = useState([]);

  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [title, setTitle] = useState("");
  const [column, setColumn] = useState("");
  const [dataType, setDataType] = useState("");
  const [mod1, setMod1] = useState("");
  const [mod2, setMod2] = useState("");
  const [reference, setReference] = useState("");

  const [state, setState] = useState({
    firstName: "",
    lastName: ""
  })
  console.log(state)

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.firstName]: value
    });
  }

  console.log("watching Field", watch(`field[${indexes}]`))

  let count = 0;
  const addField = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
    count += 1;
  }
  console.log(indexes)

  const removeField = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  }

  const clearFields = () => {
    setIndexes([]);
  }

  const fieldString = () => {
    let schemaString = `CREATE TABLE ${watch("title")} (id SERIAL PRIMARY KEY NOT NULL, `
    indexes.map(() => {
      console.log(`field[${indexes}]`)
      schemaString += `${watch(`field[${indexes}]`)} ${watch(`datatype[${indexes}]`)} ${watch(`mod[${indexes}]`)},`
    })
    console.log(schemaString)
    return schemaString
  }

  // console.log("watch variable datatype", watch("DataType"))


  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInputText
          name={"title"}
          control={control}
          label={"title"} />

        {indexes.map(index => {
          const field = `field[${index}]`;
          const datatype = `datatype[${index}]`
          const mod = `mod[${index}]`

          return (
            <fieldset name={field} key={field}>
              <FormInputText
                name={"firstName"}
                value={state.firstName}
                control={control}
                label={"Field"}
                onChange={handleChange} />
              <FormInputDropdown
                name={datatype}
                control={control}
                label={"DataType"}
                menuOptions={[{ label: "int", value: "int" }]}
              />
              <FormInputDropdown
                name={mod}
                control={control}
                label={"MOD"}
                menuOptions={[{ label: "None", value: "" }, { label: "NOT NULL", value: "not null" }]} />
            </fieldset>


            // <FFieldForm
            //   field={field}
            //   index={index}
            //   removeField={removeField}
            //   setColumn={setColumn}
            //   setDataType={setDataType}
            //   setMod1={setMod1}
            //   setMod2={setMod2}
            //   setReference={setReference}
            // />

          )
        })}

        <button type="button" onClick={addField}>
          Add Field
        </button>
        <button type="button" onClick={clearFields}>
          Clear Field
        </button>

        <input type="submit" />

        <div className="demo">
          <CopyBlock
            language="sql"
            text={`CREATE TABLE ${title} (id SERIAL PRIMARY KEY NOT NULL, ${column} ${dataType} ${mod1} ${mod2}	)`}
            theme={monokai}
            wrapLines={true}
            codeBlock
          />
        </div>
        <div className="demo">
          <CopyBlock
            language="sql"
            text={`${state.firstName})`}
            theme={monokai}
            wrapLines={true}
            codeBlock
          />
        </div>

        <code>CREATE TABLE {state.firstName} 	&#40; id SERIAL PRIUMARY KEY NOT NULL, {column} {dataType} {mod1} {mod2} {reference}	&#41;</code>
      </form>
    </Box>

  )
}

export default SSchemaForms;