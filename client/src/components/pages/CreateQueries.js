import React, { useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button } from "@mui/material";
import { initialSchemaState } from "../../state/data_structures/schemaState";
import initialQueryState from "../../state/data_structures/queryState";
import QueriesForm from "../forms/QueriesForm";
import PageSplitter from "../../styles/components/PageSplitter";
import "../forms/SchemaForm.scss";
import generateQuerySQL from "../../helpers/queryFormHelpers";
import { deepCopy } from "../../helpers/schemaFormHelpers";
import useSchemaState from "../../state/hooks/useSchemaState";

const CreateQueriesPage = () => {
  const {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
    saveSchemaProgress,
    loadSchemaProgress,
    getTableNames,
    getColumnList
  } = useSchemaState();

  console.log("QUERY PAGE STATE: ", state);

  const tableNameList = getTableNames();

  const [ queryTables, setQueryTables ] = useState([initialSchemaState]);
  const [ queryParams, setQueryParams ] = useState([initialQueryState])

  const findTable = (state, tableName) => {
    return state.schemaState.filter(table => table.table === tableName)[0]
  }

  const selectTableHandler = (e, tableIndex) => {
    addToQueryTable(findTable(state, e.target.value));
    handleQueryParams(e, tableIndex, 'name')
  }

  const addToQueryTable = (table) => {
    setQueryTables(prev => {
      let newPrev = deepCopy(prev);
      let lastObject = newPrev[newPrev.length - 1];
      if (lastObject.table === "") {
        newPrev.pop()
        return [...newPrev, table]
      }
      return  [...prev, table]
    })
  }; 

  const addQueryTable = (emptyTable) => {
    setQueryTables(prev => [...prev, initialSchemaState])
    setQueryParams(prev => [...prev, initialQueryState])
  }

  const handleQueryParams = (event, queryIndex, type) => {
    console.log('qp', queryParams[0])
    if (type === 'columns') {
      const newQueries = deepCopy(queryParams);
      newQueries[queryIndex].columns.push(event.target.value)
      return setQueryParams(newQueries)
    }
    if (type === 'condition') {
      const newQueries = deepCopy(queryParams);
      newQueries[queryIndex].condition = event.target.value;
      return setQueryParams(newQueries)
    }
    if (type === 'distinct') {
      const newQueries = deepCopy(queryParams);
      newQueries[queryIndex].distinct = event.target.value;
      return setQueryParams(newQueries)
    }
    if (type === 'name') {
      const newQueries = deepCopy(queryParams);
      newQueries[queryIndex].table = event.target.value.table
      console.log("test", newQueries)
      return setQueryParams(newQueries)
    }
    if (type === 'limit') {
      const newQueries = deepCopy(queryParams);
      newQueries[queryIndex].limit = event.target.value;
      return setQueryParams(newQueries)
    }
  }

  const removeQuery = (tableIndex) => {
    const newQueries = deepCopy(queryParams)
    const newQueryTables = deepCopy(queryTables)
    newQueries.splice(tableIndex, 1);
    newQueryTables.splice(tableIndex, 1);
    setQueryParams(newQueries); 
    setQueryTables(newQueryTables);
  }

  return (
    <main>
      <div id="container">
        {queryTables.map((table, tableIndex) => {
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
                  removeQuery={removeQuery}
                  getColumnList={getColumnList}
                  handleQuery={handleQueryParams}
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
                  text={generateQuerySQL(queryParams[tableIndex])}
                  theme={monokai}
                  wrapLines={true}
                  codeBlock
                />
              </div>
            </div>
          );
        })}

        <Button id="add-table" primary="true" onClick={() => addQueryTable(initialSchemaState)}>
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
