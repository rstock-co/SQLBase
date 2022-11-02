import { React, useState } from "react";
import "./SchemaForm.scss";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormInputText } from "../fields/FormInputText";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SuccessSnackbar from "../snackbars/SuccessSnackbar";

const SchemaForm = ({
  table,
  tableIndex,
  handleChange,
  handleChangeAndNullify,
  addField,
  removeField,
  references,
  removeTable
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  const hasProperty = (fieldProperty) => {
    return (fieldProperty || false)
  }

  console.log('tableschemaform', table)
  const [isOpen, setIsOpen] = useState({
    addField: false,
    removeTable: false,
    removeField: false,
    isError: false,
    message: null
  });
  const buttonHandler = (target, tableIndex, fieldIndex) => {
    switch (target) {
      case "addField":
        setIsOpen({ removeTable: true, message: 'Field Added!' });
        addField(tableIndex)
        break;
      case "removeTable":
        setIsOpen({ removeTable: true, message: 'Table Deleted!', isError: true });
        removeTable(tableIndex)
        break;
      case "removeField":
        setIsOpen({ removeField: true, message: 'Field Deleted!', isError: true })
        removeField(tableIndex, fieldIndex)
        break;
      default:
        return false;
    }
    console.log('openState', isOpen)
  }
  const handleClose = () => (isOpen && setIsOpen(false));

  return (
    <div className="table">
      {((isOpen && !isOpen.modal) && <SuccessSnackbar open={isOpen} handleClose={handleClose} message={isOpen.message} isError={isOpen.isError} />)}
      <FormInputText
        unqiueID={`${table}-${tableIndex}`}
        handleChange={e => handleChange(e, "tableName", tableIndex)}
        name={"Table Name"}
        control={control}
        label={"Table Name"}
        value={table.table}
      />
      {table.fields.map((field, fieldIndex) => {
        return (
          <div className="field-inputs">
            <label>Field {fieldIndex}</label>
            <FormInputText
              uniqueID={`Field-${fieldIndex}`}
              handleChange={e =>
                handleChange(e, "fieldName", tableIndex, fieldIndex)
              }
              name={"field"}
              control={control}
              label={"Field"}
              value={field.fieldName}

            />
            <FormInputDropdown
              uniqueID={`Datatype-${fieldIndex}`}
              name={"datatype"}
              // need to update state
              value={hasProperty(field.reference) ? "" : field.dataType}
              // value={field.dataType}
              control={control}
              label={"datatype"}
              disabled={hasProperty(field.reference)}
              menuOptions={[
                { label: "None", value: "" },
                { label: "INT", value: "INT" },
                { label: "TEXT", value: "TEXT" },
                { label: "BOOLEAN", value: "BOOLEAN" },
                { label: "DATE", value: "DATE" },
              ]}
              handleChange={e =>
                handleChange(e, "dataType", tableIndex, fieldIndex)}
            />
            <FormInputDropdown
              uniqueID={`Mod1-${fieldIndex}`}
              name={"mod1"}
              value={field.mod1}
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
              value={field.mod2}
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
            <FormInputDropdown
              uniqueID={`Reference-${fieldIndex}`}
              name={"Reference"}
              value={field.reference}
              control={control}
              label={"Reference"}
              menuOptions={references}
              handleChange={e =>
                handleChange(e, "reference", tableIndex, fieldIndex)
                // does not change state or nullify anything
                // handleChange={e => handleChangeAndNullify(e, "reference", tableIndex, fieldIndex, "dataType")
              }

            />
            <FormInputText
              uniqueID={`Default-${fieldIndex}`}
              handleChange={e =>
                handleChange(e, "default", tableIndex, fieldIndex)
              }
              name={"default"}
              value={field.default}
              control={control}
              label={"default"}
            />
            <Button
              key={`Remove-${fieldIndex}`}
              onClick={() => buttonHandler('removeField', tableIndex, fieldIndex)}
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
          onClick={() => buttonHandler('addField', tableIndex)}
        >
          Add Field +
        </Button>
        <Button
          key={`Remove-${tableIndex}`}
          primary="true"
          onClick={() => buttonHandler('removeTable', tableIndex)}
        >
          <DeleteForeverIcon /> Delete Table
        </Button>
      </div>
    </div>
  );
};

export default SchemaForm;
