import React, { useState } from "react";
import "./SchemaForm.scss";
import { FormInputText } from "../../form-components/FormInputText";
import { FormInputDropdown } from "../../form-components/FormInputDropdown";
import { useForm } from "react-hook-form";
import { CopyBlock, monokai } from "react-code-blocks";
import { SchemaTable } from "./SchemaTable";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import { tableFields, emptyTable } from "../../data_structures/schemaTable";
import {
  deepCopyArray,
  generateSQL,
  generateReferenceObject,
} from "../helpers/schemaFormHelpers";

export default function FieldForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm();

  const [tables, setTables] = useState([deepCopyArray(emptyTable)]);

  const handleAddTable = i => {
    const newTables = deepCopyArray(tables);
    const newTable = deepCopyArray(emptyTable);
    newTables.push(newTable);
    setTables(newTables);
  };

  const handleAddField = i => {
    const newTables = deepCopyArray(tables);
    const newFields = { ...tableFields };
    newTables[i].fields.push(newFields);
    setTables(newTables);
  };

  const _handleChange = (event, type, tableIndex, fieldIndex) => {
    if (type === "tableName") {
      const newTables = deepCopyArray(tables);
      newTables[tableIndex].table = event.target.value;
      return setTables(newTables);
    }

    const newFields = [...tables[tableIndex].fields];
    newFields[fieldIndex][type] = event.target.value;
    const newTables = deepCopyArray(tables);
    newTables[tableIndex] = {
      ...newTables[tableIndex],
      fields: [...newFields],
    };
    setTables(newTables);
  };

  const handleRemoveTable = i => {
    const newTables = deepCopyArray(tables);
    newTables.splice(i, 1);
    setTables(newTables);
  };

  const handleRemoveField = (tableIndex, fieldIndex) => {
    const fieldsToRemove = [...tables[tableIndex].fields];
    fieldsToRemove.splice(fieldIndex, 1);
    const newTables = deepCopyArray(tables);
    newTables[tableIndex] = {
      ...newTables[tableIndex],
      fields: [...fieldsToRemove],
    };
    setTables(newTables);
  };

  return (
    <Paper id="container">
      <form>
        {tables.map((table, tableIndex) => {
          return (
            <div className="table">
              <div key={`${table}-${tableIndex}`}>
                <FormInputText
                  _handleChange={e => _handleChange(e, "tableName", tableIndex)}
                  name={"Table Name"}
                  control={control}
                  label={"Table Name"}
                />
                {table.fields.map((field, fieldIndex) => {
                  return (
                    <div class="fieldClass">
                      <div
                        className="field-inputs"
                        key={`${field}-${fieldIndex}`}
                      >
                        <p>Field {fieldIndex}</p>
                        <FormInputText
                          _handleChange={e =>
                            _handleChange(
                              e,
                              "fieldName",
                              tableIndex,
                              fieldIndex
                            )
                          }
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
                            { label: "DATE", value: "DATE" },
                          ]}
                          _handleChange={e =>
                            _handleChange(e, "dataType", tableIndex, fieldIndex)
                          }
                        />
                        <FormInputDropdown
                          name={"mod1"}
                          control={control}
                          label={"MOD1"}
                          menuOptions={[
                            { label: "None", value: "" },
                            { label: "NOT NULL", value: "NOT NULL" },
                            { label: "UNIQUE", value: " UNIQUE" },
                            { label: "SERIAL", value: "SERIAL" },
                          ]}
                          _handleChange={e =>
                            _handleChange(e, "mod1", tableIndex, fieldIndex)
                          }
                        />
                        <FormInputDropdown
                          name={"mod2"}
                          control={control}
                          label={"MOD2"}
                          menuOptions={[
                            { label: "None", value: "" },
                            { label: "NOT NULL", value: "NOT NULL" },
                            { label: "UNIQUE", value: "UNIQUE" },
                            { label: "SERIAL", value: "SERIAL" },
                          ]}
                          _handleChange={e =>
                            _handleChange(e, "mod2", tableIndex, fieldIndex)
                          }
                        />
                        <FormInputDropdown
                          name={"Reference"}
                          control={control}
                          label={"Reference"}
                          menuOptions={generateReferenceObject(tables, table)}
                          _handleChange={e =>
                            _handleChange(
                              e,
                              "reference",
                              tableIndex,
                              fieldIndex
                            )
                          }
                        />
                        <FormInputText
                          _handleChange={e =>
                            _handleChange(e, "default", tableIndex, fieldIndex)
                          }
                          name={"default"}
                          control={control}
                          label={"default"}
                        />
                        <Button
                          onClick={() =>
                            handleRemoveField(tableIndex, fieldIndex)
                          }
                        >
                          X
                        </Button>
                      </div>
                    </div>
                  );
                })}

                <div class="addButton">
                  <Button primary onClick={() => handleAddField(tableIndex)}>
                    Add Field +
                  </Button>
                </div>

                <Divider />
              </div>
            </div>
          );
        })}
        <Button primary onClick={() => handleAddTable()}>
          Add Table
        </Button>
      </form>
      <div className="tables">
        {tables.map(table => {
          return <SchemaTable table={table.table} fields={table.fields} />;
        })}
      </div>
      <div className="demo">
        {generateSQL(tables).map((table, tableIndex) => {
          return (
            <CopyBlock
              language="sql"
              text={table}
              theme={monokai}
              wrapLines={true}
              codeBlock
            />
          );
        })}
      </div>
    </Paper>
  );
}
