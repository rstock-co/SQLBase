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
  removeQuery,
  tableNameList,
  getColumnList,
  handleQuery,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <div className="table">
      <FormInputDropdown
        name={"TableSelect"}
        control={control}
        label={"Table Select"}
        menuOptions={tableNameList}
        handleChange={e => handleChange(e, tableIndex)}
      />
      {table.fields.map((field, fieldIndex) => {
        return (
          <div className="field-inputs">
            <FormInputDropdown
              uniqueID={`Col-select-${fieldIndex}`}
              name={"Column"}
              control={control}
              label={"Column"}
              menuOptions={getColumnList(table)}
              handleChange={e =>
                handleQuery(e, tableIndex, 'columns')
              }
            />
            <FormInputDropdown
              uniqueID={`distinct-${fieldIndex}`}
              name={"distinct"}
              control={control}
              label={"Distinct"}
              menuOptions={[
                { label: "Not Distinct", value: false },
                { label: "Distinct", value: true },
              ]}
              handleChange={e =>
                handleQuery(e, tableIndex, 'distinct')
              }
            />
            <FormInputText
              uniqueID={`condition-${fieldIndex}`}
              handleChange={e =>
                handleQuery(e, tableIndex, 'condition')
              }
              name={"condition"}
              control={control}
              label={"Condition"}
            />
            <FormInputText
              uniqueID={`limit-${fieldIndex}`}
              handleChange={e =>
                handleQuery(e, tableIndex, 'limit')
              }
              name={"limit"}
              control={control}
              label={"Limit"}
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
          key={`Remove-${tableIndex}`}
          primary="true"
          onClick={() => removeQuery(tableIndex)}
        >
          <DeleteForeverIcon /> Delete Query
        </Button>
      </div>
    </div>
  );
};

export default QueriesForm;
