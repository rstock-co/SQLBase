import { initialSchemaState } from "./schemaState";

export const initialQueries = {
  table: "",
  columns: [],
  whereCondition: [],
  distinct: false,
  limit: 1000,
  aggregate: [],
  aggregateAs: [],
  having: [],
  groupBy: [],
  orderBy: [],
};

export const initialQueryState = {
  schemas: [initialSchemaState],
  queries: [initialQueries],
};
