// SELECT, WHERE, DISTINCT,

// make a reducer that takes current state and produces the below query data structure

// Build up a data structure from each query form:

// (1) user selects a table
// (2) get a list of columns for that table
// (3) display x number of "select columns" drop down boxes in one row
// (4)


const generateFirstLine = (table, columns, distinct = false) => {
  let columnString = "";
  if (columns.length > 0) {
    columns.forEach(col => (columnString += `${col}, `));
    columnString = columnString.slice(0, -2);
  } else {
    columnString += "*"
  }
  return distinct
    ? `SELECT DISTINCT ${columnString} FROM ${table}`
    : `SELECT ${columnString} FROM ${table}`;
};

const generateWhere = condition => `WHERE ${condition}`;
const generateLimit = limit => `LIMIT ${limit}`;
const generateOrder = order => ``


export default function generateQuerySQL(query) {
  return `${generateFirstLine(query.table, query.columns, query.distinct) || ""} 
  ${generateWhere(query.condition) || ""}
  ${generateLimit(query.limit) || ""}`
};

