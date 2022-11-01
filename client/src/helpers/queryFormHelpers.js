// SELECT, WHERE, DISTINCT,

// make a reducer that takes current state and produces the below query data structure

// Build up a data structure from each query form:

// (1) user selects a table
// (2) get a list of columns for that table
// (3) display x number of "select columns" drop down boxes in one row
// (4)

const query = {
  table: "users",
  columns: ["*"], //"first_name", "last_name", "age"], // need to create an array of fieldNames when user selects a table
  whereCondition: "age > 40", // string (from text input box)
  distinct: false, // boolean (checkbox),
  limit: 5, // number
  // orderBy: ascending
  // aggregate: count // one of 3 choices:  sum, avg, count
};

const emptyQuery = {
  table: "",
  columns: [],
  whereCondition: "",
  distinct: false,
  limit: 1000,
  orderAscending: false,
  orderDescending: false,
  aggregate: "", // one of 3 choices:  sum, avg, count
};

let queryString = "";

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

// console.log(generateFirstLine(query.table, query.columns, query.distinct));

const generateWhere = condition => `WHERE ${condition}`;
const generateLimit = limit => `LIMIT ${limit}`;

// const generateOrder = (desc)

export default function generateQuerySQL(query) {
  return `${generateFirstLine(query.table, query.columns, query.distinct) || ""} 
  ${generateWhere(query.condition) || ""}
  ${generateLimit(query.limit) || ""}`
};

// const generateSQL = tables => {
//   let result = [];
//   tables.map(table => {
//     let output = `CREATE TABLE ${table.table} (
//         id SERIAL PRIMARY KEY NOT NULL,
//         `;
//     table.fields.map(field => {
//       output += `${field.fieldName || ""} ${field.dataType || ""} ${
//         generateReference(field.reference) || ""
//       } ${field.mod1 || ""} ${field.mod2 || ""} ${
//         field.default ? "DEFAULT '" + field.default + "'" : ""
//       },\n        `;
//     });
//     result.push(output.replace(/,\n {6} *$/, "\n);"));
//   });
//   return result;
// };
