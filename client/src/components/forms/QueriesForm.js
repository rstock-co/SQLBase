import { React, useState } from "react";
import "./SchemaForm.scss";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormInputText } from "../fields/FormInputText";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";

const QueriesForm = ({
  table,
  tableIndex,
  handleChange,
  addField,
  removeField,
  removeTable,
  tableNameList,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();






  console.log("tableNameList", tableNameList)

  return (
    <div className="table">
      <FormInputDropdown
        name={"TableSelect"}
        control={control}
        label={"Table Select"}
        menuOptions={tableNameList}
      // handleChange={e => handleChange(e, "tableS", tableIndex, fieldIndex)}
      />
      {table.fields.map((field, fieldIndex) => {
        return (
          <div className="field-inputs">
            <FormInputDropdown
              uniqueID={`Col-select-${fieldIndex}`}
              name={"Reference"}
              control={control}
              label={"Reference"}
              menuOptions={tableNameList}
              handleChange={e =>
                handleChange(e, "reference", tableIndex, fieldIndex)
              }
            />
            <label>Field {fieldIndex}</label>
            <FormInputText
              uniqueID={`Field-${fieldIndex}`}
              handleChange={e =>
                handleChange(e, "fieldName", tableIndex, fieldIndex)
              }
              name={"field"}
              control={control}
              label={"Field"}
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
              <ClearIcon />
            </Button>
          </div>
        );
      })}

      <div className="add-remove-button">
        <Button
          key={`Add-${tableIndex}`}
          primary="true"
          onClick={() => addField(tableIndex)}
        >
          Add Field +
        </Button>
        <Button
          key={`Remove-${tableIndex}`}
          primary="true"
          onClick={() => removeTable(tableIndex)}
        >
          <DeleteForeverIcon /> Delete Table
        </Button>
      </div>
    </div>
  );
};

export default QueriesForm;
