import { React, useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";
import SchemaForm from "../forms/SchemaForm";
import SchemaTable from "../tables/SchemaTable";
import useApplicationData from "../../hooks/useApplicationData";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../styles/theme/theme.js";
import ERDModal from "../modal/ERDModal";

import {
  generateSQL,
  generateReferenceObject,
} from "../../helpers/schemaFormHelpers";

import "../forms/SchemaForm.scss";
import PageSplitter from "../../styles/components/PageSplitter";

const CreateTablesPage = () => {
  const {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
    saveProgress,
    loadProgress,
  } = useApplicationData();

  console.log("TABLES: ", state);

  const handleLoadData = () => {
    console.log(loadProgress)
  }

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => (isOpen && setIsOpen(false));
  // console.log('isOpen', isOpen)


  return (
    <main onClick={handleClose}>
      <div id="container">
        {(isOpen && <ERDModal open={isOpen} table={state} />)}
        {state.map((table, tableIndex) => {
          return (
            <div id="row-container">
              <form>
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
        <Button primary="true" onClick={() => handleOpen()}>
          Generate ERD
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateTablesPage;
