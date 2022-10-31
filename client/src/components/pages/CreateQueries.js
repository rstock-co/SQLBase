import React, { useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Paper } from "@mui/material";
import { tableFields, emptyTable } from "../../data_structures/schemaTable";
import QueriesForm from "../forms/QueriesForm";
import SchemaTable from "../tables/SchemaTable";

import { deepCopyArray, generateSQL } from "../../helpers/schemaFormHelpers";

import "../forms/SchemaForm.scss";

const CreateQueriesPage = () => {
  const [tables, setTables] = useState([deepCopyArray(emptyTable)]);

  const generateTableList = tables => tables.map(table => table.table);

  console.log("TABLES: ", tables);
  console.log("TABLE NAMES: ", generateTableList(tables));

  const addTable = () => {
    const newTables = deepCopyArray(tables);
    const newTable = deepCopyArray(emptyTable);
    newTables.push(newTable);
    setTables(newTables);
  };

  const addField = i => {
    const newTables = deepCopyArray(tables);
    const newFields = { ...tableFields };
    newTables[i].fields.push(newFields);
    setTables(newTables);
  };

  const handleChange = (event, type, tableIndex, fieldIndex) => {
    if (type === "tableName") {
      const newTables = deepCopyArray(tables);
      newTables[tableIndex].table = event.target.value;
      return setTables(newTables);
    }

    const newFields = [...tables[tableIndex].fields];
    newFields[fieldIndex][type] = event.target.value;
    const newTables = deepCopyArray(tables);
    newTables[tableIndex] = {
      ...newTables[tableIndex],
      fields: [...newFields],
    };
    setTables(newTables);
  };

  const removeTable = i => {
    const newTables = deepCopyArray(tables);
    newTables.splice(i, 1);
    setTables(newTables);
  };

  const removeField = (tableIndex, fieldIndex) => {
    const fieldsToRemove = [...tables[tableIndex].fields];
    fieldsToRemove.splice(fieldIndex, 1);
    const newTables = deepCopyArray(tables);
    newTables[tableIndex] = {
      ...newTables[tableIndex],
      fields: [...fieldsToRemove],
    };
    setTables(newTables);
  };

  return (
    <main>
      <Paper id="container">
        <h2>Create Queries</h2>
        <br />
        <form>
          {tables.map((table, tableIndex) => {
            return (
              <QueriesForm
                key={`SchemaForm - ${tableIndex}`}
                table={table}
                tableIndex={tableIndex}
                handleChange={handleChange}
                removeField={removeField}
                addField={addField}
                tableNameList={generateTableList(tables)}
              />
            );
          })}

          <Button primary="true" onClick={() => addTable()}>
            Add Table
          </Button>
        </form>

        <div className="tables">
          {tables.map((table, tableIndex) => {
            return (
              <SchemaTable
                key={`table-${tableIndex}`}
                table={table.table}
                fields={table.fields}
              />
            );
          })}
        </div>
        <div className="demo">
          {generateSQL(tables).map((table, tableIndex) => {
            return (
              <CopyBlock
                key={`CopyBlock-${tableIndex}`}
                language="sql"
                text={table}
                theme={monokai}
                wrapLines={true}
                codeBlock
              />
            );
          })}
        </div>
      </Paper>
    </main>
  );
};

export default CreateQueriesPage;
