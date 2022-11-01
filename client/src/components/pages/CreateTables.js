import { React, useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Snackbar } from "@mui/material";
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
import CopySnackbar from "../snackbars/CopySnackbar";

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




  const [isOpen, setIsOpen] = useState({
    modal: false,
    copy: false,
    save: false,
    load: false,
    message: ''
  });
  const buttonHandler = (target) => {
    switch (target) {
      case "modal":
        setIsOpen({ modal: true });
        break;
      case "copy":
        setIsOpen({ copy: true, message: 'Copy Success!' })
        copyHandler()
        break;
      case "save":
        saveProgress()
        setIsOpen({ save: true, message: 'Save Success!' })
        break;
      case "load":
        loadProgress()
        setIsOpen({ load: true, message: 'Load Success!' })
        break;
      default:
        return false;
    }
    console.log('openState', isOpen)
  }
  const handleClose = () => (isOpen && setIsOpen(false));



  const copyHandler = () => {

    let allStrings = generateSQL(state)

    return navigator.clipboard.writeText(allStrings.join(""))
  }

  //   CREATE TABLE dsafdsa (
  //     id SERIAL PRIMARY KEY NOT NULL,
  //     fdsafdsa INT    
  // );
  // ,CREATE TABLE safdsa (
  //     id SERIAL PRIMARY KEY NOT NULL,
  //     fdsafdsa  INTEGER REFERENCES a(id) ON DELETE CASCADE   
  // );
  // ,CREATE TABLE a (
  //     id SERIAL PRIMARY KEY NOT NULL,
  //     fds INT    
  // );




  return (
    <main>
      <div id="container">
        {(isOpen.modal && <ERDModal open={isOpen} table={state} onClick={handleClose} />)}
        {((isOpen && !isOpen.modal) && <CopySnackbar open={isOpen} table={state} handleClose={handleClose} message={isOpen.message} />)}
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
        <Button primary="true" onClick={() => buttonHandler("save")}>
          Save Progress
        </Button>
        <Button primary="true" onClick={() => buttonHandler("load")}>
          Load Progress
        </Button>
        <Button primary="true" onClick={() => buttonHandler("modal")}>
          Generate ERD
        </Button>
        <Button primary="true" onClick={() => buttonHandler("copy")}>
          Copy All Schema
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateTablesPage;
