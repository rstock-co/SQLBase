const tableFields = {
  fieldName: "",
  dataType: "",
  mod1: "",
  mod2: "",
  default: "",
  reference: "",
};

const emptyTable = {
  id: null,
  table: "",
  fields: [tableFields],
};

const emptyQueryParams = {
  table: "",
  columns: [],
  distinct: false,
  condition: "",
  limit: 1000,
}

export { tableFields, emptyTable, emptyQueryParams };
