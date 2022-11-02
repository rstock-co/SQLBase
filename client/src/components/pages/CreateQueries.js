import React from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";
import QueriesForm from "../forms/QueriesForm";
import PageSplitter from "../../styles/components/PageSplitter";
import "../forms/SchemaForm.scss";
import generateQuerySQL from "../../helpers/queryFormHelpers";
import useQueryState from "../../state/hooks/useQueryState";

const CreateQueriesPage = () => {
  const {
    state,
    addQueryTable,
    removeQueryTable,
    addField,
    removeField,
    selectTableHandler,
    setQueryParams,
    saveSchemaProgress,
    loadSchemaProgress,
    getTableNames,
    getColumnList,
  } = useQueryState();

  console.log("QUERY PAGE STATE: ", state.queryState[0].queries);

  const tableNameList = getTableNames();
  let schemas = state.queryState[0].schemas
  let queries = state.queryState[0].queries

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
                  removeField={removeField}
                  addField={addField}
                  tableNameList={tableNameList}
                  removeQuery={removeQueryTable}
                  getColumnList={getColumnList}
                  handleQuery={setQueryParams}
                  queries={queries}
                />
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
        <Button primary="true" onClick={() => saveSchemaProgress()}>
          Save Progress
        </Button>
        <Button primary="true" onClick={() => loadSchemaProgress()}>
          Load Progress
        </Button>
      </div>
      <PageSplitter src="body-purple.png" id="tables-bottom" />
    </main>
  );
};

export default CreateQueriesPage;
