const deepCopy = dataStructure => JSON.parse(JSON.stringify(dataStructure));

const generateReference = reference => {
  if (!reference) return null;
  return `INTEGER REFERENCES ${reference}(id) ON DELETE CASCADE`;
};

const generateSQL = tables => {
  let result = [];
  tables.map(table => {
    let output = `CREATE TABLE ${table.table} (
        id SERIAL PRIMARY KEY NOT NULL,
        `;
    table.fields.map(field => {
      output += `${field.fieldName || ""} ${field.dataType || ""} ${
        generateReference(field.reference) || ""
      } ${field.mod1 || ""} ${field.mod2 || ""} ${
        field.default ? "DEFAULT '" + field.default + "'" : ""
      },\n        `;
    });
    result.push(output.replace(/,\n {6} *$/, "\n);\n"));
  });
  return result;
};

const generateReferenceObject = (tables, i) => {
  let output = [];
  tables.map(table => {
    if (i !== table) {
      let obj = { label: table.table, value: table.table };
      output.push(obj);
    }
  });
  return output;
};

export { deepCopy, generateSQL, generateReferenceObject };
