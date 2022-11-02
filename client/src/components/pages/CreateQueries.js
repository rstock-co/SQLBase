import React from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";
import QueriesForm from "../forms/QueriesForm";
import PageSplitter from "../../styles/components/PageSplitter";
import "../forms/SchemaForm.scss";
import generateQuerySQL from "../../helpers/queryFormHelpers";
import useQueryState from "../../state/hooks/useQueryState";
import useDatabase from "../../state/hooks/useDatabase";
import useGlobalState from "../../state/hooks/useGlobalState";

const CreateQueriesPage = () => {
  const {
    state,
    addQueryTable,
    removeQueryTable,
    selectTableHandler,
    setQueryParams,
    // addField,
    // removeField,
  } = useQueryState();

  const { getTableNames, getColumnList } = useGlobalState();
  const { saveProgress, loadProgress } = useDatabase();

  console.log("QUERY PAGE STATE: ", state);

  const tableNameList = getTableNames();
  let schemas = state.queryState[0].schemas;
  let queries = state.queryState[0].queries;

  return (
    <main>
      <div id="container">
        {console.error(state.queryState[0])}
        {schemas.map((table, tableIndex) => {
          console.warn(queries[tableIndex]);
          return (
            <div id="row-container">
              <form>
                <QueriesForm
                  key={`QueriesForm - ${tableIndex}`}
                  table={table}
                  tableIndex={tableIndex}
                  handleChange={selectTableHandler}
                  tableNameList={tableNameList}
                  removeQuery={removeQueryTable}
                  getColumnList={getColumnList}
                  handleQuery={setQueryParams}
                  // removeField={removeField}
                  // addField={addField}
                />
              </form>
              <div className="tables">
                {/* <SchemaTable
                  key={`table-${tableIndex}`}
                  table={table.table}
                  fields={table.fields}
                /> */}
              </div>
              <div className="demo">
                <CopyBlock
                  key={`CopyBlock-${tableIndex}`}
                  language="sql"
                  text={generateQuerySQL(queries[tableIndex])}
                  theme={monokai}
                  wrapLines={true}
                  codeBlock
                />
              </div>
            </div>
          );
        })}

        <Button id="add-table" primary="true" onClick={() => addQueryTable()}>
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
