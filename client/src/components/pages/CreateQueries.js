import React from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";

import QueriesForm from "../forms/QueriesForm";
import SchemaTable from "../tables/SchemaTable";
import useGlobalState from "../../state/hooks/useSchemaState";
import { generateSQL } from "../../helpers/schemaFormHelpers";
import PageSplitter from "../../styles/components/PageSplitter";
import "../forms/SchemaForm.scss";

const CreateQueriesPage = () => {
  const {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
    saveProgress,
    loadProgress,
    getTableNames,
  } = useGlobalState();

  console.log("QUERY PAGE STATE: ", state);

  const tableNameList = getTableNames();

  return (
    <main>
      <div id="container">
        {state.schemaState.map((table, tableIndex) => {
          return (
            <div id="row-container">
              <form>
                <QueriesForm
                  key={`QueriesForm - ${tableIndex}`}
                  table={table}
                  tableIndex={tableIndex}
                  handleChange={handleChange}
                  removeField={removeField}
                  addField={addField}
                  tableNameList={tableNameList}
                  removeTable={removeTable}
                />
              </form>
              <div className="tables">
                <SchemaTable
                  key={`table-${tableIndex}`}
                  table={table.table}
                  fields={table.fields}
                />
              </div>
              <div className="demo">
                <CopyBlock
                  key={`CopyBlock-${tableIndex}`}
                  language="sql"
                  text={generateSQL(state)[tableIndex]}
                  theme={monokai}
                  wrapLines={true}
                  codeBlock
                />
              </div>
            </div>
          );
        })}

        <Button id="add-table" primary="true" onClick={() => addTable()}>
          Add Table
        </Button>
        <Button primary="true" onClick={() => saveProgress()}>
          Save Progress
        </Button>
        <Button primary="true" onClick={() => loadProgress()}>
          Load Progress
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateQueriesPage;
