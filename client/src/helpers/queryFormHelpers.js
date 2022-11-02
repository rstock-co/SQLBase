// SELECT, WHERE, DISTINCT,

// make a reducer that takes current state and produces the below query data structure

// Build up a data structure from each query form:

// (1) user selects a table
// (2) get a list of columns for that table
// (3) display x number of "select columns" drop down boxes in one row
// (4)

const generateColumns = (aggregate, aggregateAs, columns) => {
  console.log('aggregateAs', aggregateAs)
  let columnString = '';
  if (columns.length > 0) {
    columns.forEach(col => (columnString += `${aggregate[columns.indexOf(col)] ? aggregate[columns.indexOf(col)] + '(' + col + ')' : col} ${aggregateAs[columns.indexOf(col)] ? 'AS ' + aggregateAs[columns.indexOf(col)] : ''}`));
  } else {
    columnString += "*"
  }
  return columnString
}

const generateFirstLine = (table, columns, distinct = false, aggregate, aggregateAs) => {
  return `SELECT${distinct ? ' DISTINCT' : ''} ${generateColumns(aggregate, aggregateAs, columns)} FROM ${table}`
};

const generateWhere = condition => {
  return condition ? `WHERE ${condition}` : "";
}
  
const generateLimit = limit => {
  return (limit === 1000) ? "" : `LIMIT ${limit}`;
}

const generateOrder = (orderBy, order) => {
  return orderBy ? `ORDER BY ${orderBy} ${order || ""}` : "";
}

const generateGroupBy = (aggregate, groupBy) => {
  return aggregate ? `GROUP BY ${groupBy ? groupBy : ""}` : '';
}

const generateHaving = (aggregate, having) => {
  return aggregate ? `HAVING ${having ? having : ""}` : "";
}

export default function generateQuerySQL(query) {
  return `${generateFirstLine(query.table, query.columns, query.distinct, query.aggregate, query.aggregateAs)} 
  ${generateWhere(query.condition)}
  ${generateGroupBy(query.aggregate, query.groupBy)}
  ${generateHaving(query.aggregate, query.having)}
  ${generateOrder(query.orderBy, query.order)}
  ${generateLimit(query.limit)}`
};

