import React, { useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Paper } from "@mui/material";
import { tableFields, emptyTable, emptyQueryParams } from "../../data_structures/schemaTable";
import QueriesForm from "../forms/QueriesForm";
import SchemaTable from "../tables/SchemaTable";
import useApplicationData from "../../hooks/useApplicationData";
import {
  deepCopyArray,
  generateReferenceObject,
  generateSQL,
} from "../../helpers/schemaFormHelpers";
import PageSplitter from "../../styles/components/PageSplitter";
import "../forms/SchemaForm.scss";
import generateQuerySQL from "../../helpers/queryFormHelpers";

const CreateQueriesPage = () => {
  const {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
    saveProgress,
    loadProgress,
    getTableNames,
    getColumnList
  } = useApplicationData();

  console.log("TABLES: ", state);

  const tableNameList = getTableNames()

  const [ selectedTable, setSelectedTable ] = useState(emptyTable);
  const [ queryTables, setQueryTables ] = useState([emptyTable]);
  const [ queryParams, setQueryParams ] = useState([emptyQueryParams])

  const selectTableHandler = (e, tableIndex) => {
    setSelectedTable(e.target.value);
    addToQueryTable(e.target.value);
    handleQueryParams(e, tableIndex, 'name')
  }

  const addToQueryTable = (table) => {
    setQueryTables(prev => {
      let newPrev = deepCopyArray(prev);
      let lastObject = newPrev[newPrev.length - 1];
      if (lastObject.table === "") {
        newPrev.pop()
        return [...newPrev, table]
      }
      return  [...prev, table]
    })
  }; 

  const addQueryTable = (emptyTable) => {
    setQueryTables(prev => [...prev, emptyTable])
    setQueryParams(prev => [...prev, emptyQueryParams])
  }

  const handleQueryParams = (event, queryIndex, type) => {
    console.log('qp', queryParams[0])
    if (type === 'columns') {
      const newQueries = deepCopyArray(queryParams);
      newQueries[queryIndex].columns.push(event.target.value)
      return setQueryParams(newQueries)
    }
    if (type === 'condition') {
      const newQueries = deepCopyArray(queryParams);
      newQueries[queryIndex].condition = event.target.value;
      return setQueryParams(newQueries)
    }
    if (type === 'distinct') {
      const newQueries = deepCopyArray(queryParams);
      newQueries[queryIndex].distinct = event.target.value;
      return setQueryParams(newQueries)
    }
    if (type === 'name') {
      const newQueries = deepCopyArray(queryParams);
      newQueries[queryIndex].table = event.target.value.table
      console.log("test", newQueries)
      return setQueryParams(newQueries)
    }
    if (type === 'limit') {
      const newQueries = deepCopyArray(queryParams);
      newQueries[queryIndex].limit = event.target.value;
      return setQueryParams(newQueries)
    }
  }

  const removeQuery = (tableIndex) => {
    const newQueries = deepCopyArray(queryParams)
    const newQueryTables = deepCopyArray(queryTables)
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
                  columnList={getColumnList}
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

        <Button id="add-table" primary="true" onClick={() => addQueryTable(emptyTable)}>
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
