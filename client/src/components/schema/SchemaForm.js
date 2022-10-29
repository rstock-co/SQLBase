import React, { useState } from "react";

import { FormInputText } from "../../form-components/FormInputText";
import { FormInputDropdown } from "../../form-components/FormInputDropdown";
import { useForm } from 'react-hook-form';
import { CopyBlock, monokai } from "react-code-blocks";
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
export default function FieldForm() {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
  const [table, setTables] = useState([
    {
      id: null,
      table: "",
      items: [
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
    } else {
      const newFieldItems = [...table[tableNameIndex].items];
      newFieldItems[fieldItemIndex].value = event.target.value;
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

  return (
    <form>
      {table.map((i, tableNameIndex) => {
        return (
          <div>
            <div key={`${i}-${tableNameIndex}`}>

              <FormInputText
                _handleChange={e => _handleChange(e, "tableName", tableNameIndex)}
                name={"Table Name"}
                control={control}
                label={"Table Name"} />
              <div class="addButton" >
                <Button primary onClick={() => handleAddField(tableNameIndex)}>
                  Add Field +
                </Button>
              </div>
              {i.items.map((field, fieldItemIndex) => {
                return (
                  <div class="fieldClass">
                    <div key={`${field}-${fieldItemIndex}`}>
                      Field {fieldItemIndex}
                      <FormInputText
                        _handleChange={e =>
                          _handleChange(
                            e,
                            "fieldItem",
                            tableNameIndex,
                            fieldItemIndex
                          )}
                        name={"field"}
                        control={control}
                        label={"field"}
                      />
                      <FormInputDropdown
                        name={"dataty[e"}
                        control={control}
                        label={"datatype"}
                        menuOptions={[{ label: "int", value: "int" }]}
                      />
                      <FormInputDropdown
                        name={"mod"}
                        control={control}
                        label={"MOD"}
                        menuOptions={[{ label: "None", value: "" }, { label: "NOT NULL", value: "not null" }]} />
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


              <Divider />
              <Button primary onClick={() => handleAddTable()}>
                Add Table
              </Button>
            </div>
          </div>
        )

      })}

      <div className="demo">
        {console.log(table)}
        {table.map((i, tableNameIndex) => {
          return i.items.map((field, fieldItemsIndex) => {

            return (
              <CopyBlock
                language="sql"
                text={`CREATE TABLE ${i.table} (id SERIAL PRIMARY KEY NOT NULL,	${field.value})`}
                theme={monokai}
                wrapLines={true}
                codeBlock
              />
            )
          })
        })
        }
      </div>
    </form >
  );


}