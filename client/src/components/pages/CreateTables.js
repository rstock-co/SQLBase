import React from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Paper } from "@mui/material";
import SchemaForm from "../forms/SchemaForm";
import SchemaTable from "../tables/SchemaTable";
import useApplicationData from "../../hooks/useApplicationData";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme/theme.js";

import {
  generateSQL,
  generateReferenceObject,
} from "../../helpers/schemaFormHelpers";

import "../forms/SchemaForm.scss";

const CreateTablesPage = () => {
  const { state, addTable, removeTable, addField, removeField, handleChange } =
    useApplicationData();

  console.log("TABLES: ", state);

  return (
    <ThemeProvider theme={theme}>

      <main>
        <Paper id="container">
          <h2>Create Tables</h2>
          <br />
          <form>
            {state.map((table, tableIndex) => {
              return (
                <SchemaForm
                  key={`SchemaForm - ${tableIndex}`}
                  table={table}
                  tableIndex={tableIndex}
                  handleChange={handleChange}
                  removeField={removeField}
                  addField={addField}
                  references={generateReferenceObject(state, table)}
                  removeTable={removeTable}
                />
              );
            })}

            <Button primary="true" onClick={() => addTable()}>
              Add Table
            </Button>
          </form>

          <div className="tables">
            {state.map((table, tableIndex) => {
              return (
                <SchemaTable
                  key={`table-${tableIndex}`}
                  table={table.table}
                  fields={table.fields}
                />
              );
            })}
          </div>
          <div className="demo">
            {generateSQL(state).map((table, tableIndex) => {
              return (
                <CopyBlock
                  key={`CopyBlock-${tableIndex}`}
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
      </main>
    </ThemeProvider>
  );
};

export default CreateTablesPage;
