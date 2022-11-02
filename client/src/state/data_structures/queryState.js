import { initialSchemaState } from "./schemaState";

export const initialQueries = {
  table: "",
  columns: [],
  whereCondition: "",
  distinct: false,
  limit: 1000,
  aggregate: [], // one of 3 choices:  sum, avg, count
  aggregateAs: [],
};

const initialQueryState = {
  schemas: [initialSchemaState],
  queries: [initialQueries],
};



export default initialQueryState;
