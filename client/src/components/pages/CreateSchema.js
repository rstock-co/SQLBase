import { React, useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Snackbar } from "@mui/material";
import SchemaForm from "../forms/SchemaForm";
import SchemaTable from "../tables/SchemaTable";
import useSchemaState from "../../state/hooks/useSchemaState";
import useDatabase from "../../state/hooks/useDatabase";
import ERDModal from "../modal/ERDModal";
import useSeedState from "../../state/hooks/useSeedState";
import { seedFormData } from "../../state/data_structures/seedState";
import {
  generateSQL,
  generateReferenceObject,
} from "../../helpers/schemaFormHelpers";

import PageSplitter from "../../styles/components/PageSplitter";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import "../forms/SchemaForm.scss";
import EditableField from "../fields/EditableField";

const CreateSchemaPage = () => {
  const {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
  } = useSchemaState();

  const { generateAllSeedState } = useSeedState();

  console.log(state.databaseUuid);

  const { saveProgress, loadProgress, createDatabase } = useDatabase();
  const [isNameFocused, setIsNamedFocused] = useState(false);
  const [isOpen, setIsOpen] = useState({
    modal: false,
    copy: false,
    save: false,
    load: false,
    addTable: false,
    message: null,
  });
  const buttonHandler = target => {
    switch (target) {
      case "modal":
        setIsOpen({ modal: true });
        break;
      case "copy":
        setIsOpen({ copy: true, message: "Copy Success!" });
        copyHandler();
        break;
      case "save":
        setIsOpen({ save: true, message: "Save Success!" });
        saveProgress();
        break;
      case "load":
        setIsOpen({ load: true, message: "Load Success!" });
        loadProgress();
        break;
      case "createDB":
        let allStrings = generateSQL(state.schemaState);
        createDatabase(allStrings.join(""));
        break;
      case "addTable":
        setIsOpen({ addTable: true, message: "Table Added" });
        addSchemaTable();
        break;
      default:
        return false;
    }
    console.log("openState", isOpen);
  };
  const handleClose = () => isOpen && setIsOpen(false);
  const handleEditableField = focused => setIsNamedFocused(focused);

  const copyHandler = () => {
    let allStrings = generateSQL(state.schemaState);

    return navigator.clipboard.writeText(allStrings.join(""));
  };

  return (
    <main onClick={handleClose}>
      <EditableField
        focused={isNameFocused}
        handleChange={handleSchemaChange}
        focus={handleEditableField}
        state={state}
      />
      <div id="container">
        {isOpen.modal && (
          <ERDModal
            open={isOpen}
            table={state.schemaState}
            onClick={handleClose}
          />
        )}
        {isOpen && !isOpen.modal && (
          <SuccessSnackbar
            open={isOpen}
            table={state}
            handleClose={handleClose}
            message={isOpen.message}
          />
        )}
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

        <Button
          id="add-table"
          primary="true"
          onClick={() => buttonHandler("addTable")}
        >
          Add Table
        </Button>
        <Button primary="true" onClick={() => buttonHandler("save")}>
          Save Progress
        </Button>
        <Button primary="true" onClick={() => buttonHandler("load")}>
          Load Progress
        </Button>
        <Button primary="true" onClick={() => buttonHandler("createDB")}>
          Create Database
        </Button>
        <Button primary="true" onClick={() => buttonHandler("modal")}>
          Generate ERD
        </Button>
        <Button primary="true" onClick={() => buttonHandler("copy")}>
          Copy All Schema
        </Button>
        <Button
          primary="true"
          onClick={() => generateAllSeedState(seedFormData)}
        >
          Generate Seeds
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateSchemaPage;
