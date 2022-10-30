import React, { useState } from "react";
import { CopyBlock, monokai } from "react-code-blocks";
import { Button, Paper } from "@mui/material";
import { tableFields, emptyTable } from "../data_structures/schemaTable";
import SchemaForm from "../components/forms/SchemaForm";
import SchemaTable from "../components/tables/SchemaTable";

import {
  deepCopyArray,
  generateSQL,
  generateReferenceObject,
} from "../helpers/schemaFormHelpers";

import "../components/forms/SchemaForm.scss";

const CreateTablesPage = () => {
  const [tables, setTables] = useState([deepCopyArray(emptyTable)]);
  const [references, setReferences] = useState([]);

  console.log("TABLES: ", tables);
  console.log("REFERENCES: ", references);

  const addReference = (tables, i) => {
    if (i === 0) return references;
    const newReferences = deepCopyArray(references);
    newReferences.push(generateReferenceObject(tables, i));
    setReferences(newReferences);
  };

  const handleAddTable = () => {
    const newTables = deepCopyArray(tables);
    const newTable = deepCopyArray(emptyTable);
    newTables.push(newTable);
    setTables(newTables);
  };

  const handleAddField = i => {
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

  const handleRemoveTable = i => {
    const newTables = deepCopyArray(tables);
    newTables.splice(i, 1);
    setTables(newTables);
  };

  const handleRemoveField = (tableIndex, fieldIndex) => {
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
        <form>
          {tables.map((table, tableIndex) => {
            return (
              <SchemaForm
                key={`SchemaForm - ${tableIndex}`}
                table={table}
                tableIndex={tableIndex}
                handleChange={handleChange}
                onRemove={handleRemoveField}
                onAdd={handleAddField}
                references={references}
              />
            );
          })}

          <Button primary="true" onClick={() => handleAddTable()}>
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

export default CreateTablesPage;
