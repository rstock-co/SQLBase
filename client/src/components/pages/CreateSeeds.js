import React from "react";
import { Button } from "@mui/material";
import QueriesForm from "../forms/QueriesForm";
import "../forms/SchemaForm.scss";
import useSeedState from "../../state/hooks/useSeedState";
import useDatabase from "../../state/hooks/useDatabase";
import useGlobalState from "../../state/hooks/useGlobalState";
import { numRowsDropdown } from "../../state/data_structures/seedState";

const CreateSeedsPage = () => {
  const { state, productName, companyName, productDesc } = useSeedState();
  const { getTableNames, getColumnList } = useGlobalState();
  const { saveProgress, loadProgress } = useDatabase();
  const h1style = {
    marginLeft: "50px",
  };
  const style = {
    fontSize: "25px",
    marginLeft: "75px",
  };

  console.log("STATE from SEEDS: ", state);
  console.log(
    "TABLE: ",
    state.schemaState.filter(table => table.table === "users")[0]
  );
  const product = productName();
  const tableNameList = getTableNames();
  const usersTable = state.schemaState.filter(
    table => table.table === "users"
  )[0];
  const columnList = getColumnList(usersTable).map(user => user.label);
  console.log(columnList);

  return (
    <>
      {/* <div style={h1style}>
        <h1>Fake Company Generation</h1>
      </div> */}
      <div style={style}>
        {/* <p>
          <b>Company Name:</b> {companyName(10)}
        </p>
        <p>
          <b>Product Name:</b> {product}
        </p>
        <p>
          <b>Product Desc:</b> {productDesc(product, 2)}
        </p> */}
        <p>
          <b>Tables:</b> {JSON.stringify(tableNameList)}
        </p>
        <p>
          <b>Num Rows Dropdown:</b> {JSON.stringify(numRowsDropdown)}
        </p>
        <p>
          <b>Columns for users table:</b> {JSON.stringify(columnList)}
        </p>
      </div>
      <Button primary="true" onClick={() => saveProgress()}>
        Save Progress
      </Button>
      <Button primary="true" onClick={() => loadProgress()}>
        Load Progress
      </Button>
    </>
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
