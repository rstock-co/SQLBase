import React from "react";
import { Button } from "@mui/material";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import { FormInputText } from "../fields/FormInputText";
import { useForm } from "react-hook-form";

const SeedsForms = ({
  numRowsDropdown,
  table,
  buttonHandler,
  dropDownHandler,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <>
      <div id="labels">
        <label>Tables</label>
        <label># of Rows</label>
        <div id="previewButtons">Preview Table</div>
      </div>
      <div id="seedItems">
        {table.map((table, index) => {
          return (
            <>
              <div className="tableOptions">
                <label>{table.table}</label>
                <FormInputDropdown
                  uniqueID={`tableForSeeds - ${index}`}
                  handleChange={e =>
                    dropDownHandler(table.table, e.target.value)
                  }
                  name={"TablesForSeeding"}
                  control={control}
                  label={"Number of Rows"}
                  menuOptions={numRowsDropdown}
                />
                <Button primary="true" onClick={() => buttonHandler(table)}>
                  Preview
                </Button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default SeedsForms;
