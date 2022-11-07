// SELECT, WHERE, DISTINCT,

// make a reducer that takes current state and produces the below query data structure

// Build up a data structure from each query form:

// (1) user selects a table
// (2) get a list of columns for that table
// (3) display x number of "select columns" drop down boxes in one row
// (4)

const generateColumns = (aggregate, aggregateAs, columns, having, orderBy, order = 'ASC') => {
  let columnString = '';
  let havingString = 'HAVING ';
  let orderByString = 'ORDER BY ';
  if (columns.length > 0) {
    columns.forEach(col => {
      (columnString += `${aggregate[columns.indexOf(col)] ? aggregate[columns.indexOf(col)] + '(' + col + ')' : col}${aggregateAs[columns.indexOf(col)] ? ' AS ' + aggregateAs[columns.indexOf(col)] : ''}${columns.indexOf(col) === columns.length - 1 ? "" : ", "}`);

      (havingString += `${having[columns.indexOf(col)] ? aggregate[columns.indexOf(col)] + '(' + col + ') ' + having[columns.indexOf(col)] : ""}`);

      (orderByString += `${orderBy[columns.indexOf(col)] ? orderBy[columns.indexOf(col)] + ' ' + order : ""}`)
    })
  } else {
    columnString += "*"
  }
  return {
    columnString,
    havingString,
    orderByString
  }
}

const generateFirstLine = (table, columns, distinct = false, aggregate, aggregateAs, having, orderBy, order) => {
  return `SELECT${distinct ? ' DISTINCT' : ''} ${generateColumns(aggregate, aggregateAs, columns, having, orderBy, order).columnString} FROM ${table}`
};

const generateWhere = (condition) => {
  let whereString = 'WHERE ';
  if (condition.length < 2) {
    whereString += `${condition[0]}`
  } else {
    condition.forEach(con => {
      if (condition.indexOf(con) !== condition.length - 1) {
        whereString += `${con ? con + ' AND ' : ""}`
      } else {
        whereString += `${con}`
      }
    })
  }
  return whereString
}

const generateLimit = limit => {
  return (limit === 1000) ? "" : `LIMIT ${limit}`;
}

// const generateOrder = (orderBy, order) => {
//   return orderBy.length > 0 ? `ORDER BY ${orderBy} ${order || ""}` : "";
// }

const generateGroupBy = (groupBy) => {
  let groupByString = 'GROUP BY ';
  if (groupBy.length < 2) {
    groupByString += `${groupBy[0]}`
  } else {
    groupBy.forEach(con => {
      if (groupBy.indexOf(con) !== groupBy.length - 1) {
        groupByString += `${con}, `
      } else {
        groupByString += `${con}`
      }
    })
  }
  return groupByString
}


export default function generateQuerySQL(queries) {
  return queries.map(query => {
    return `${generateFirstLine(query.table, query.columns, query.distinct, query.aggregate, query.aggregateAs, query.having, query.orderBy, query.order)} ${query.whereCondition.length > 0 ? '\n' + generateWhere(query.whereCondition) : ""} ${query.groupBy.length > 0 ? "\n" + generateGroupBy(query.groupBy) : ""} ${query.having.length > 0 ? "\n" + generateColumns(query.aggregate, query.aggregateAs, query.columns, query.having, query.orderBy, query.order).havingString : ""} ${query.orderBy.length > 0 ? '\n' + generateColumns(query.aggregate, query.aggregateAs, query.columns, query.having, query.orderBy, query.order).orderByString : ""} ${query.limit ? "\n" + generateLimit(query.limit) : ""};`
  })
};

