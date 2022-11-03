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

const CreateSeedsPage = () => {
  const { state, employeeSeed, companySeed, productSeed, generateSeedState } =
    useSeedState();
  const { getTableNames, getColumnList } = useGlobalState();
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

  const buttonHandler = (table) => {
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
        <label id='seedsFormTitle'>Seeds Databse</label>
          <SeedsForm
            key={`SeedsForm`}
            tableNameList={tableNameList}
            numRowsDropdown={numRowsDropdown}
            table={table}
            buttonHandler={buttonHandler}
          />
        </form>
        <div id="seedsDemo">
          <CopyBlock
            key={`CopyBlock-seeds`}
            language="sql"
            text={'generated SQL String Here'}
            theme={monokai}
            wrapLines={true}
            codeBlock
          />
        </div>
      </div>
      <Button primary="true" onClick={() => generateSeedState(seedFormData)}>
        Seed into State
      </Button>
      <Button primary="true" onClick={() => saveProgress()}>
        Save Progress
      </Button>
      <Button primary="true" onClick={() => loadProgress()}>
        Load Progress
      </Button>
    </main>
    /* // <main>
    //   <div id="container">
    //     {schemas.map((table, tableIndex) =>
    //       console.warn(queries[tableIndex]);
    //       return (
    //         <div id="row-container">
    //           <form>
    //             <QueriesForm
    //               key={`QueriesForm - ${tableIndex}`}
    //               table={table}
    //               tableIndex={tableIndex}
    //               handleChange={selectTableHandler}
    //               removeField={removeField}
    //               addField={addField}
    //               tableNameList={tableNameList}
    //               removeQuery={removeQueryTable}
    //               getColumnList={getColumnList}
    //               handleQuery={setQueryParams}
    //             />
    //           </form>
    //           <div className="tables">
    //             {/* <SchemaTable
    //               key={`table-${tableIndex}`}
    //               table={table.table}
    //               fields={table.fields}
    //             />
    //           </div>
    //           <div className="demo">
    //             <CopyBlock
    //               key={`CopyBlock-${tableIndex}`}
    //               language="sql"
    //               text={generateQuerySQL(queries[tableIndex])}
    //               theme={monokai}
    //               wrapLines={true}
    //               codeBlock
    //             />
    //           </div>
    //         </div>
    //       );
    //     })}

    //     <Button id="add-table" primary="true" onClick={() => addQueryTable()}>
    //       Add Table
    //     </Button>
    //     <Button primary="true" onClick={() => saveSchemaProgress()}>
    //       Save Progress
    //     </Button>
    //     <Button primary="true" onClick={() => loadSchemaProgress()}>
    //       Load Progress
    //     </Button>
    //   </div>
    //   <PageSplitter src="body-purple.png" id="tables-bottom" />
    // </main>
    */
  );
};
export default CreateSeedsPage;
