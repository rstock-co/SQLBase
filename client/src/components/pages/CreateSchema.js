import { React, useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";
import SchemaForm from "../forms/SchemaForm";
import SchemaTable from "../tables/SchemaTable";
import useSchemaState from "../../state/hooks/useSchemaState";
import ERDModal from "../modal/ERDModal";

import {
  generateSQL,
  generateReferenceObject,
} from "../../helpers/schemaFormHelpers";

import "../forms/SchemaForm.scss";
import PageSplitter from "../../styles/components/PageSplitter";

const CreateSchemaPage = () => {
  const {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
    saveSchemaProgress,
    loadSchemaProgress,
  } = useSchemaState();

  console.log("SCHEMA PAGE STATE: ", state);

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => isOpen && setIsOpen(false);

  return (
    <main onClick={handleClose}>
      <div id="container">
        {isOpen && <ERDModal open={isOpen} table={state} />}
        {state.schemaState.map((table, tableIndex) => {
          return (
            <div id="row-container">
              <form>
                <SchemaForm
                  key={`SchemaForm - ${tableIndex}`}
                  table={table}
                  tableIndex={tableIndex}
                  handleChange={handleSchemaChange}
                  removeField={removeSchemaField}
                  addField={addSchemaField}
                  references={generateReferenceObject(state.schemaState, table)}
                  removeTable={removeSchemaTable}
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
                  text={generateSQL(state.schemaState)[tableIndex]}
                  theme={monokai}
                  wrapLines={true}
                  codeBlock
                />
              </div>
            </div>
          );
        })}

        <Button id="add-table" primary="true" onClick={() => addSchemaTable()}>
          Add Table
        </Button>
        <Button primary="true" onClick={() => saveSchemaProgress()}>
          Save Progress
        </Button>
        <Button primary="true" onClick={() => loadSchemaProgress()}>
          Load Progress
        </Button>
        <Button primary="true" onClick={() => handleOpen()}>
          Generate ERD
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateSchemaPage;
