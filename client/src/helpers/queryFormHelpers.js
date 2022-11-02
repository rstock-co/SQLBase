// SELECT, WHERE, DISTINCT,

// make a reducer that takes current state and produces the below query data structure

// Build up a data structure from each query form:

// (1) user selects a table
// (2) get a list of columns for that table
// (3) display x number of "select columns" drop down boxes in one row
// (4)

const generateColumns = (aggregate, aggregateAs, columns, having) => {
  let columnString = '';
  let havingString = '';
  if (columns.length > 0) {
    columns.forEach(col => {
      (columnString += `${aggregate[columns.indexOf(col)] ? aggregate[columns.indexOf(col)] + '(' + col + ')' : col}${aggregateAs[columns.indexOf(col)] ? ' AS ' + aggregateAs[columns.indexOf(col)] + ", " : ', '}`);
      
      (havingString += `${having.length > 0 ? "HAVING " + aggregate[columns.indexOf(col)] + '(' + col + ')' : ""}`); 
    })
  } else {
    columnString += "*"
  }
  return {
    columnString,
    havingString 
  }
}

const generateFirstLine = (table, columns, distinct = false, aggregate, aggregateAs, having) => {
  return `SELECT${distinct ? ' DISTINCT' : ''} ${generateColumns(aggregate, aggregateAs, columns, having).columnString} FROM ${table}`
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

const generateGroupBy = (groupBy) => {
  return groupBy ? `GROUP BY ${groupBy ? groupBy : ""}` : '';
}


export default function generateQuerySQL(queries) {
  return queries.map(query => {
    return `${generateFirstLine(query.table, query.columns, query.distinct, query.aggregate, query.aggregateAs, query.having)} ${query.whereCondition ?'\n' + generateWhere(query.whereCondition) : ""} ${query.groupBy ? "\n" + generateGroupBy(query.groupBy) : ""} ${query.having.length > 0 ? "\n" + generateColumns(query.aggregate, query.aggregateAs, query.columns, query.having).havingString : ""} ${query.orderBy ? "\n" + generateOrder(query.orderBy, query.order) : ""} ${query.limit ? "\n" + generateLimit(query.limit) : ""};`
  })
};
  
