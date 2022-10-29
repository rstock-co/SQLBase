import React, { useState } from "react";
import "./SchemaForm.scss";
import { FormInputText } from "../../form-components/FormInputText";
import { FormInputDropdown } from "../../form-components/FormInputDropdown";
import { useForm } from 'react-hook-form';
import { CopyBlock, monokai } from "react-code-blocks";
import { SchemaTables } from "./SchemaTables";
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper'


export default function FieldForm() {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
  const [table, setTables] = useState([
    {
      id: null,
      table: "",
      items: [
        {
          name: "",
          value: ""
        }
      ]
    }
  ]);

  const handleAddTable = i => {
    const newTable = [...table];
    newTable.push({
      id: null,
      table: "",
      items: [
        {
          name: "",
          value: ""
        }
      ]
    });
    setTables(newTable);
  };

  const handleAddField = i => {

    setTables(state => {
      const stateCopy = JSON.parse(JSON.stringify(state));
      stateCopy[i].items.push({
        name: "",
        values: ""
      })

      return stateCopy

    })
  }

  const _handleChange = (event, type, tableNameIndex, fieldItemIndex) => {
    if (type === "tableName") {
      const newTable = [...table];
      newTable[tableNameIndex].table = event.target.value;
      setTables(newTable);
    }
    if (type === "dataType") {
      const newFieldItems = [...table[tableNameIndex].items];
      newFieldItems[fieldItemIndex].dataType = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };
        return stateCopy;
      })
    }
    if (type === "mod1") {
      const newFieldItems = [...table[tableNameIndex].items];
      newFieldItems[fieldItemIndex].mod1 = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };
        return stateCopy;
      })
    }
    if (type === "mod2") {
      const newFieldItems = [...table[tableNameIndex].items];
      newFieldItems[fieldItemIndex].mod2 = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };
        return stateCopy;
      })
    }
    if (type === "fieldName") {
      const newFieldItems = [...table[tableNameIndex].items];
      console.log('60', newFieldItems)
      newFieldItems[fieldItemIndex].fieldName = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };

        return stateCopy;
      });
    }
    if (type === "default") {
      const newFieldItems = [...table[tableNameIndex].items];
      console.log('60', newFieldItems)
      newFieldItems[fieldItemIndex].default = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };

        return stateCopy;
      });
    }
    if (type === "reference") {
      const newFieldItems = [...table[tableNameIndex].items];
      console.log('70', newFieldItems)
      console.log('71', event.target)
      newFieldItems[fieldItemIndex].reference = event.target.value;
      setTables(state => {
        const stateCopy = [...state];
        stateCopy[tableNameIndex] = {
          ...stateCopy[tableNameIndex],
          items: [...newFieldItems]
        };

        return stateCopy;
      });
    }
  };


  const handleRemoveTable = i => {
    const values = [...table];
    values.splice(i, 1);
    setTables(values);
  };

  const handleRemoveField = (tableIndex, fieldItemIndex) => {
    const specificFieldItems = [...table[tableIndex].items];
    specificFieldItems.splice(fieldItemIndex, 1);
    setTables(state => {
      const stateCopy = [...state];
      stateCopy[tableIndex] = {
        ...stateCopy[tableIndex],
        items: [...specificFieldItems]
      };
      return stateCopy;
    })
  }

  const generateSQL = () => {
    let result = [];
    table.map((table, tableNameIndex) => {
      let output = `CREATE TABLE ${table.table} (
        id SERIAL PRIMARY KEY NOT NULL,
        `
      table.items.map((field, index) => {
        output += `${field.fieldName || ""} ${field.dataType || ""} ${generateReference(field.reference) || ""} ${field.mod1 || ""} ${field.mod2 || ""} ${field.default ? "DEFAULT '" + field.default + "'" : ""},\n        `
      })
      result.push(output.replace(/,\n {6} *$/, '\n);'))
    })
    return result;
  }

  const generateReference = (reference) => {
    // let output = ''
    // if (table.table[table.table.length - 1] === 's') {
    //   output += `${table.table.replace(/s*$/, '_id')}` 
    // } else {
    //   output += `${table.table}_id`
    // }
    console.log('reference', reference)
    if (!reference) return null
    return `INTEGER REFERENCES ${reference}(id) ON DELETE CASCADE`;
  }

  const referenceObject = (i) => {
    let output = [];
    table.map((table) => {
      console.log('table 191', table)
      if (i !== table) {
        let obj = { label: table.table, value: table.table }
        output.push(obj)
      }
    })
    return output;
  }

  return (
    <Paper id="container">
    <form>
      {table.map((i, tableNameIndex) => {
        return (
          <div className="table">
            <div key={`${i}-${tableNameIndex}`}>
              <FormInputText
                _handleChange={e => _handleChange(e, "tableName", tableNameIndex)}
                name={"Table Name"}
                control={control}
                label={"Table Name"} />
              {i.items.map((field, fieldItemIndex) => {
                return (
                  <div class="fieldClass">
                    <div className="field-inputs" key={`${field}-${fieldItemIndex}`}>
                      <p>Field {fieldItemIndex}</p>
                      <FormInputText
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "fieldName",
                            tableNameIndex,
                            fieldItemIndex
                          )}
                        name={"field"}
                        control={control}
                        label={"field"}
                      />
                      <FormInputDropdown
                        name={"datatype"}
                        control={control}
                        label={"datatype"}
                        menuOptions={[
                          { label: "None", value: "" },
                          { label: "INT", value: "INT" },
                          { label: "TEXT", value: "TEXT" },
                          { label: "BOOLEAN", value: "BOOLEAN" },
                          { label: "DATE", value: "DATE" }
                        ]}
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "dataType",
                            tableNameIndex,
                            fieldItemIndex
                          )}
                      />
                      <FormInputDropdown
                        name={"mod1"}
                        control={control}
                        label={"MOD1"}
                        menuOptions={[
                          { label: "None", value: "" },
                          { label: "NOT NULL", value: "NOT NULL" },
                          { label: "UNIQUE", value: " UNIQUE" },
                          { label: "SERIAL", value: "SERIAL" }
                        ]}
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "mod1",
                            tableNameIndex,
                            fieldItemIndex
                          )} />
                      <FormInputDropdown
                        name={"mod2"}
                        control={control}
                        label={"MOD2"}
                        menuOptions={[
                          { label: "None", value: "" },
                          { label: "NOT NULL", value: "NOT NULL" },
                          { label: "UNIQUE", value: "UNIQUE" },
                          { label: "SERIAL", value: "SERIAL" }
                        ]}
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "mod2",
                            tableNameIndex,
                            fieldItemIndex
                          )} />
                      <FormInputDropdown
                        name={"Reference"}
                        control={control}
                        label={"Reference"}
                        menuOptions={referenceObject(i)}
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "reference",
                            tableNameIndex,
                            fieldItemIndex
                          )} />
                      <FormInputText
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "default",
                            tableNameIndex,
                            fieldItemIndex
                          )}
                        name={"default"}
                        control={control}
                        label={"default"}
                      />
                      <Button
                        onClick={() =>
                          handleRemoveField(tableNameIndex, fieldItemIndex)
                        }
                      >
                        X
                      </Button>
                    </div>
                  </div>
                );
              })}

                      <div class="addButton" >
                        <Button primary onClick={() => handleAddField(tableNameIndex)}>
                          Add Field +
                        </Button>
                      </div>

              <Divider />
            </div>
          </div>
        )

      })}
              <Button primary onClick={() => handleAddTable()}>
                Add Table
              </Button>

    </form >
    <div className="tables">
      {table.map((table) => {
        console.log('table items', table)
        return (
          <SchemaTables
            table={table.table}
            fields={table.items}
          />
        )
      })}
    </div>
    <div className="demo">
      {generateSQL().map((i, tableNameIndex) => {
        return (
          <CopyBlock
            language="sql"
            text={i}
            theme={monokai}
            wrapLines={true}
            codeBlock
          />
        )
      })}
    </div>
  </Paper>
  );


}