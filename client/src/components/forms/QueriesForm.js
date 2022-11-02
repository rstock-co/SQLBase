import { React, useState } from "react";
import "./QueriesForm.scss";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { FormInputText } from "../fields/FormInputText";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";

const QueriesForm = ({
  table,
  queries,
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
        value={table.table}
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
              value={queries[tableIndex].columns[fieldIndex]}
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
            <FormInputDropdown
              uniqueID={`aggregate-${fieldIndex}`}
              name={"aggregate"}
              control={control}
              label={"Aggregate"}
              menuOptions={[
                { label: "Sum", value: 'SUM' },
                { label: "Average", value: 'AVG' },
                { label: "Count", value: 'COUNT' },
                { label: "Max", value: 'MAX' },
                { label: "Min", value: 'MIN' },
              ]}
              handleChange={e =>
                handleQuery(e, tableIndex, 'aggregate')
              }
            />
            {queries[tableIndex].aggregate && <FormInputText
              uniqueID={`aggregateAs-${fieldIndex}`}
              handleChange={e =>
                handleQuery(e, tableIndex, 'aggregateAs', fieldIndex)
              }
              name={"aggregateAs"}
              control={control}
              label={"As"}
            />}
            {queries[tableIndex].aggregate && <FormInputDropdown
              uniqueID={`groupBy-${fieldIndex}`}
              name={"groupBy"}
              control={control}
              label={"Group By"}
              menuOptions={getColumnList(table)}
              handleChange={e =>
                handleQuery(e, tableIndex, 'groupBy')
              }
            />}
            {queries[tableIndex].aggregate && <FormInputText
              uniqueID={`having-${fieldIndex}`}
              handleChange={e =>
                handleQuery(e, tableIndex, 'having')
              }
              name={"having"}
              control={control}
              label={"Having Condition"}
            />}
            <FormInputText
              uniqueID={`condition-${fieldIndex}`}
              handleChange={e =>
                handleQuery(e, tableIndex, 'whereCondition')
              }
              name={"whereCondition"}
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
            <FormInputDropdown
              uniqueID={`orderBy-${fieldIndex}`}
              name={"orderBy"}
              control={control}
              label={"Order by"}
              menuOptions={getColumnList(table)}
              handleChange={e =>
                handleQuery(e, tableIndex, 'orderBy')
              }
            />
            {queries[tableIndex].orderBy && <FormInputDropdown
              uniqueID={`order-${fieldIndex}`}
              name={"order"}
              control={control}
              label={"Asc/Desc"}
              menuOptions={[
                { label: "Ascending", value: 'ASC' },
                { label: "Descending", value: 'DESC' },
              ]}
              handleChange={e =>
                handleQuery(e, tableIndex, 'order')
              }
            />}
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
