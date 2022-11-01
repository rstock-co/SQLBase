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

export default emptyQuery;
