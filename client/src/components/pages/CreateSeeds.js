import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import "../forms/SeedsForm.scss";
import useSeedState from "../../state/hooks/useSeedState";
import useDatabase from "../../state/hooks/useDatabase";
import useGlobalState from "../../state/hooks/useGlobalState";
import { numRowsDropdown } from "../../state/data_structures/seedState";
import SeedsForm from "../forms/SeedsForm";
import SeedsModal from "../modal/SeedsModal";
import { CopyBlock, monokai } from "react-code-blocks";
import { generateSeedSQL } from "../../helpers/seedFormHelpers";
import PageSplitter from "../../styles/components/PageSplitter";
import SaveIcon from "@mui/icons-material/Save";
import DownloadIcon from "@mui/icons-material/Download";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";

const CreateSeedsPage = () => {
  const { state, generateSeedState } = useSeedState();
  const { getTableNames } = useGlobalState();
  const { saveProgress, loadProgress, seedDatabase } = useDatabase();

  const tableNameList = getTableNames();

  const table = state.schemaState;
  const seeds = state.seedState;
  let seedString = generateSeedSQL(seeds);

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
          id="seedsModal"
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
      <Box id="seeds-buttons">
        <Button
          primary="true"
          onClick={() => seedDatabase(state.databaseName, seedString)}
          variant="contained" sx={{ backgroundColor: '#4a748f', ":hover": { backgroundColor: "#588bab" } }}
        >
          <AutoFixHighIcon /> <div>  Seed </div>
        </Button>
        <Button primary="true" variant="contained" sx={{ backgroundColor: '#4a748f', ":hover": { backgroundColor: "#588bab" } }} onClick={() => saveProgress()}>
          <SaveIcon />  <div>Save</div>
        </Button>
        <Button primary="true" variant="contained" sx={{ backgroundColor: '#4a748f', ":hover": { backgroundColor: "#588bab" } }} onClick={() => loadProgress()}>
          <DownloadIcon /> <div> Load </div>
        </Button>
      </Box>
      <PageSplitter src="body-teal.png" id="seeds-tables-bottom" />
    </main>
  );
};
export default CreateSeedsPage;
