import React from "react";
import "./SchemaForm.scss";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormInputText } from "../fields/FormInputText";
import { FormInputDropdown } from "../fields/FormInputDropdown";

const QueriesForm = ({
  table,
  tableIndex,
  handleChange,
  addField,
  removeField,
  tableNameList,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <div className="table">
      <FormInputDropdown
        uniqueID={`TableSelect-${tableIndex}`}
        name={"selectTable"}
        control={control}
        label={"selectTable"}
        menuOptions={tableNameList}
        handleChange={e => handleChange(e, "selectTable", tableIndex)}
      />
      {table.fields.map((field, fieldIndex) => {
        return (
          <div className="fieldClass">
            <div className="field-inputs">
              <p>Field {fieldIndex}</p>
              <FormInputText
                uniqueID={`Field-${fieldIndex}`}
                handleChange={e =>
                  handleChange(e, "fieldName", tableIndex, fieldIndex)
                }
                name={"field"}
                control={control}
                label={"field"}
              />
              <FormInputDropdown
                uniqueID={`Datatype-${fieldIndex}`}
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
                handleChange={e =>
                  handleChange(e, "dataType", tableIndex, fieldIndex)
                }
              />
              <FormInputDropdown
                uniqueID={`Mod1-${fieldIndex}`}
                name={"mod1"}
                control={control}
                label={"MOD1"}
                menuOptions={[
                  { label: "None", value: "" },
                  { label: "NOT NULL", value: "NOT NULL" },
                  { label: "UNIQUE", value: " UNIQUE" },
                  { label: "SERIAL", value: "SERIAL" },
                ]}
                handleChange={e =>
                  handleChange(e, "mod1", tableIndex, fieldIndex)
                }
              />
              <FormInputDropdown
                uniqueID={`Mod2-${fieldIndex}`}
                name={"mod2"}
                control={control}
                label={"MOD2"}
                menuOptions={[
                  { label: "None", value: "" },
                  { label: "NOT NULL", value: "NOT NULL" },
                  { label: "UNIQUE", value: "UNIQUE" },
                  { label: "SERIAL", value: "SERIAL" },
                ]}
                handleChange={e =>
                  handleChange(e, "mod2", tableIndex, fieldIndex)
                }
              />
              {/* <FormInputDropdown
                uniqueID={`Reference-${fieldIndex}`}
                name={"Reference"}
                control={control}
                label={"Reference"}
                menuOptions={references}
                handleChange={e =>
                  handleChange(e, "reference", tableIndex, fieldIndex)
                }
              /> */}
              <FormInputText
                uniqueID={`Default-${fieldIndex}`}
                handleChange={e =>
                  handleChange(e, "default", tableIndex, fieldIndex)
                }
                name={"default"}
                control={control}
                label={"default"}
              />
              <Button
                key={`Remove-${fieldIndex}`}
                onClick={() => removeField(tableIndex, fieldIndex)}
              >
                X
              </Button>
            </div>
          </div>
        );
      })}

      <div className="addButton">
        <Button
          key={`Add-${tableIndex}`}
          primary="true"
          onClick={() => addField(tableIndex)}
        >
          Add Field +
        </Button>
      </div>
    </div>
  );
};

export default QueriesForm;
