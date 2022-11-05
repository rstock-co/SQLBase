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
  } = useQueryState();

  console.log("QUERY PAGE STATE: ", state.queryState[0].queries);

  const { getTableNames, getColumnList } = useGlobalState();
  const { saveProgress, loadProgress, queryDatabase } = useDatabase();

  console.log("QUERY PAGE STATE: ", state);

  const tableNameList = getTableNames();
  let schemas = state.queryState[0].schemas;
  let queries = state.queryState[0].queries;

  const buttonHandler = async (target, tableIndex) => {
    if (target === 'query') {
      let result = await queryDatabase(state.databaseName, generateQuerySQL(queries)[tableIndex])

      console.log(result)
    }
  }

  return (
    <main>
      <div id="container">
        {schemas.map((table, tableIndex) => {
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
                  queries={queries}
                  state={state}
                />
                <Button onClick={() => buttonHandler('query', tableIndex)}>
                  Query Database
                </Button>
              </form>
              <div className="demo">
                <CopyBlock
                  key={`CopyBlock-${tableIndex}`}
                  language="sql"
                  text={generateQuerySQL(queries)[tableIndex]}
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
