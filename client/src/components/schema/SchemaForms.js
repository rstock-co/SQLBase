import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import FieldForm from './FieldForm'
import { CopyBlock, monokai } from "react-code-blocks";


const SchemaForms = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  // console.log(errors);

  // const [ tableString, setTableString ] = useState("");
  // const [ fieldForm, setFieldForm ] = useState([]);

  const [indexes, setIndexes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [ title, setTitle ] = useState("");
  const [ column, setColumn ] = useState("");
  const [ dataType, setDataType ] = useState("");
  const [ mod1, setMod1] = useState("");
  const [ mod2, setMod2] = useState("");
  const [ reference, setReference] = useState("");



  const addField = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter]);
    setCounter(prevCounter => prevCounter + 1);
  }

  const removeField = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)]);
    setCounter(prevCounter => prevCounter - 1);
  }

  const clearFields = () => {
    setIndexes([]);
  }


  return (

    <form onSubmit={handleSubmit(onSubmit)}>
      <input 
      id="outlined-required"
      type="text" 
      placeholder="Title" 
      {...register("Title", {required: true, maxLength: 80})} 
      value={title}
      onChange={e => setTitle(e.target.value)}
      />

      {indexes.map(index => {
        const field = `field[${index}]`;
        
        return (

          <FieldForm 
          field={field} 
          index={index} 
          removeField={removeField} 
          setColumn={setColumn}
          setDataType={setDataType}
          setMod1={setMod1}
          setMod2={setMod2}
          setReference={setReference}
          />
          // <fieldset name={field} key={field}>
          //   <label>
          //     Field {index}:
          //     <input {...register("fieldname", {
          //      required: true,
          //      value: column,
          //      onChange: (e) => setColumn(e.target.value),
          //      })} 
          //      type="text"
          //      placeholder="First name" />
          //   </label>
          //   <label>
          //     DataType
          //     <select {...register("Data_type")}
          //     onChange={(e) => setDataType(e.target.value)}
          //     defaultValue={dataType}
          //     >
          //       <option value="Text">Text</option> 
          //       <option value="Integer">Integer</option>
          //       <option value="Date">Date</option>
          //       <option value="Boolean">Boolean</option>
          //     </select>
          //   </label>
          //   <label>
          //   <select {...register("MOD1")}
          //     onChange={(e) => setMod1(e.target.value)}
          //     defaultValue={mod1}
          //   >
          //     <option value="">NO MOD</option> 
          //     <option value="NOT_NULL">NOT NULL</option>
          //     <option value="NOT_NULL">UNIQUE</option>
          //   </select>
          //   </label>

          //   <label>
          //     Default
          //     <input {...register("default", {
          //      required: true,
          //      value: mod2,
          //      onChange: (e) => setMod2(`DEFAULT ${e.target.value}`),
          //     })} 
          //      type="text"
          //      placeholder="Default..." />
          //   </label>
          //     <label>
          //       References
          //       <select {...register("REFERENCES")}
          //         onChange={(e) => setReference(e.target.value)}
          //         defaultValue={reference}
          //       >
          //         <option value="user_id INTEGER REFERENCES users(id) ON DELETE CASCADE">users</option>
          //       </select>
          //     </label>


          //   <button type="button" onClick={removeField(index)}>
          //   Remove
          // </button>
          // </fieldset>
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
          text={`CREATE TABLE ${title} 	( id SERIAL PRIMARY KEY NOT NULL, ${column} ${dataType} ${mod1} ${mod2}	)`}
          theme={monokai}
          wrapLines={true}
          codeBlock
        />
      </div>
      <code>CREATE TABLE {title} 	&#40; id SERIAL PRIUMARY KEY NOT NULL, {column} {dataType} {mod1} {mod2} {reference}	&#41;</code>
    </form>

  )
}

export default SchemaForms;