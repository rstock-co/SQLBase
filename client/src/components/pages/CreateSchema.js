import { React, useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Box } from "@mui/material";
import SchemaForm from "../forms/SchemaForm";
import useSchemaState from "../../state/hooks/useSchemaState";
import useDatabase from "../../state/hooks/useDatabase";
import ERDModal from "../modal/ERDModal";
import { generateSeedSQL } from "../../helpers/seedFormHelpers";
import {
  generateSQL,
  generateReferenceObject,
} from "../../helpers/schemaFormHelpers";

import PageSplitter from "../../styles/components/PageSplitter";
import SuccessSnackbar from "../snackbars/SuccessSnackbar";
import "../forms/SchemaForm.scss";
import EditableField from "../fields/EditableField";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SaveIcon from "@mui/icons-material/Save";
import LanIcon from "@mui/icons-material/Lan";

const CreateSchemaPage = () => {
  const {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
  } = useSchemaState();

  const { saveProgress, loadProgress, createDatabase, seedDatabase } =
    useDatabase();

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
      case "createDB":
        let allStrings = generateSQL(state.schemaState);
        createDatabase(allStrings.join(""));
        break;
      case "seed":
        let seedString = generateSeedSQL(state.seedState);
        console.log(seedString);
        seedDatabase(state.databaseName, seedString);
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
      <div id="container">
        <EditableField
          focused={isNameFocused}
          handleChange={handleSchemaChange}
          focus={handleEditableField}
          state={state}
        />
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
              <div className="schema-demo">
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

        <Box id="add-copy-buttons">
          <Button
            id="add-table"
            primary="true"
            onClick={() => buttonHandler("addTable")}
            variant="contained"
            sx={{
              backgroundColor: "#4a748f",
              ":hover": { backgroundColor: "#588bab" },
            }}
          >
            <AddCircleIcon /> <div>Add Table</div>
          </Button>
          <Button
            id="copy-all"
            variant="contained"
            sx={{
              backgroundColor: "#4a748f",
              ":hover": { backgroundColor: "#588bab" },
            }}
            primary="true"
            onClick={() => buttonHandler("copy")}
          >
            <ContentCopyIcon /> <div>Copy All Schema</div>
          </Button>
        </Box>
      </div>
      <Box id="schema-buttons">
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4a748f",
            ":hover": { backgroundColor: "#588bab" },
          }}
          primary="true"
          onClick={() => buttonHandler("modal")}
        >
          <LanIcon /> <div> View ERD</div>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4a748f",
            ":hover": { backgroundColor: "#588bab" },
          }}
          primary="true"
          onClick={() => buttonHandler("save")}
        >
          <SaveIcon /> <div>Save</div>
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4a748f",
            ":hover": { backgroundColor: "#588bab" },
          }}
          primary="true"
          onClick={() => buttonHandler("createDB")}
        >
          <AddCircleIcon /> <div> Create</div>
        </Button>
      </Box>
      <PageSplitter src="body-teal.png" id="tables-bottom" />
    </main>
  );
};

export default CreateSchemaPage;
