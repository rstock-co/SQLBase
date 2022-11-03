import { initialSchemaState } from "./schemaState";

export const initialQueries = {
  table: "",
  columns: [],
  whereCondition: "",
  distinct: false,
  limit: 1000,
  orderAscending: false,
  orderDescending: false,
  aggregate: "", // one of 3 choices:  sum, avg, count
};

export const initialQueryState = {
  schemas: [initialSchemaState],
  queries: [initialQueries],
};
