import React, { useState } from "react";
import { Button } from "@mui/material";
import "../forms/SeedsForm.scss";
import useSeedState from "../../state/hooks/useSeedState";
import useDatabase from "../../state/hooks/useDatabase";
import useGlobalState from "../../state/hooks/useGlobalState";
import {
  numRowsDropdown,
  seedFormData,
} from "../../state/data_structures/seedState"; // delete seedFormData once form is built
import SeedsForm from "../forms/SeedsForm";
import SeedsModal from "../modal/SeedsModal";
import { CopyBlock, monokai } from "react-code-blocks";
import { generateSeedSQL } from "../../helpers/seedFormHelpers";

const CreateSeedsPage = () => {
  const { state, generateSeedState, generateAllSeedState } = useSeedState();
  const { getTableNames } = useGlobalState();
  const { saveProgress, loadProgress } = useDatabase();

  const style = {
    fontSize: "25px",
    marginLeft: "75px",
  };

  console.log("STATE from SEEDS: ", state);
  // console.log(
  //   "TABLE: ",
  //   state.schemaState.filter((table) => table.table === "users")[0]
  // );

  const tableNameList = getTableNames();
  console.log("Table Name List", tableNameList);
  // const usersTable = state.schemaState.filter(
  //   (table) => table.table === "users"
  // )[0];
  // const columnList = getColumnList(usersTable).map((user) => user.label);
  // console.log(columnList);

  const table = state.schemaState;
  const seeds = state.seedState;

  const [isOpen, setIsOpen] = useState({
    modal: false,
    table: null,
  });

  const buttonHandler = table => {
    setIsOpen({ modal: true, table: table });
  };

  const handleClose = () => isOpen && setIsOpen(false);

  return (
    <main id="seedsMain">
      {isOpen.modal && (
        <SeedsModal
          open={isOpen}
          onClick={handleClose}
          table={isOpen.table}
          seeds={seeds}
        />
      )}
      <div id="seedsContainer">
        <form id="seedsForm">
          <label id="seedsFormTitle">Seeds Databse</label>
          <SeedsForm
            key={`SeedsForm`}
            tableNameList={tableNameList}
            numRowsDropdown={numRowsDropdown}
            table={table}
            buttonHandler={buttonHandler}
            dropDownHandler={generateSeedState}
          />
        </form>
        <div id="seedsDemo">
          <CopyBlock
            key={`CopyBlock-seeds`}
            language="sql"
            text={generateSeedSQL(seeds)}
            theme={monokai}
            wrapLines={true}
            codeBlock
          />
        </div>
      </div>
      <Button primary="true" onClick={() => generateAllSeedState(seedFormData)}>
        Seed into State
      </Button>
      <Button primary="true" onClick={() => saveProgress()}>
        Save Progress
      </Button>
      <Button primary="true" onClick={() => loadProgress()}>
        Load Progress
      </Button>
    </main>
  );
};
export default CreateSeedsPage;
