import {
  schemaTableFields,
  initialSchemaState,
} from "../data_structures/schemaState";
import { deepCopy } from "../../helpers/schemaFormHelpers";
import { initialQueries } from "../data_structures/queryState";

// schema
export const SCHEMA_ADD_TABLE = "SCHEMA_ADD_TABLE";
export const SCHEMA_REMOVE_TABLE = "SCHEMA_REMOVE_TABLE";
export const SCHEMA_ADD_FIELD = "SCHEMA_ADD_FIELD";
export const SCHEMA_REMOVE_FIELD = "SCHEMA_REMOVE_FIELD";
export const SCHEMA_HANDLE_CHANGE = "SCHEMA_HANDLE_CHANGE";
export const SCHEMA_LOAD_DATA = "SCHEMA_LOAD_DATA";

// query
export const QUERY_ADD_TABLE = "QUERY_ADD_TABLE";
export const QUERY_REMOVE_TABLE = "QUERY_REMOVE_TABLE"
export const INSERT_QUERY_TABLE = "INSERT_QUERY_TABLE";
export const SET_QUERY_PARAMS = "SET_QUERY_PARAMS";


// seed

/**
 * The reducer function from the 'useReducer' hook, specifies the actions (functions to execute) to update the state object
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user
 * @returns the next state, OR returns an error message if the given action type isn't valid
 */

const globalReducer = (state, action) => {
  const reducers = {
    SCHEMA_ADD_TABLE: state => {
      const newState = deepCopy(state);
      const schemaState = newState.schemaState;
      const newTable = deepCopy(initialSchemaState);
      schemaState.push(newTable);
      return {
        ...newState,
        schemaState,
      };
    },
    SCHEMA_REMOVE_TABLE: state => {
      const newState = deepCopy(state);
      const schemaState = newState.schemaState;
      schemaState.splice(action.tableIndex, 1);
      return {
        ...newState,
        schemaState,
      };
    },
    SCHEMA_ADD_FIELD: state => {
      const newState = deepCopy(state);
      const schemaState = newState.schemaState;
      const newFields = { ...schemaTableFields };
      schemaState[action.tableIndex].fields.push(newFields);
      return {
        ...newState,
        schemaState,
      };
    },
    SCHEMA_REMOVE_FIELD: state => {
      const fieldsToRemove = [...state.schemaState[action.tableIndex].fields];
      fieldsToRemove.splice(action.fieldIndex, 1);
      const newState = deepCopy(state);
      const schemaState = newState.schemaState;
      schemaState[action.tableIndex] = {
        ...schemaState[action.tableIndex],
        fields: [...fieldsToRemove],
      };
      return {
        ...newState,
        schemaState,
      };
    },
    SCHEMA_HANDLE_CHANGE: state => {
      const newState = deepCopy(state);
      const schemaState = newState.schemaState;
      if (action.fieldType === "tableName") {
        schemaState[action.tableIndex].table = action.event.target.value;
        return {
          ...newState,
          schemaState,
        };
      }

      const newFields = [...schemaState[action.tableIndex].fields];
      newFields[action.fieldIndex][action.fieldType] =
        action.event.target.value;
      schemaState[action.tableIndex] = {
        ...schemaState[action.tableIndex],
        fields: [...newFields],
      };
      return {
        ...newState,
        schemaState,
      };
    },
    SCHEMA_LOAD_DATA: state => action.loadedData,

    //------------------------------------------- QUERY REDUCERS
    QUERY_ADD_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let schema = queryState.schemas
      let queries = queryState.queries
      const newTable = deepCopy(initialSchemaState);
      const newQueries = deepCopy(initialQueries);
      schema.push(newTable);
      queries.push(newQueries)

      queryState = [{
        ...queryState,
        schema,
        queries
      }]
      return {
        ...newState,
        queryState
      };
    },
    QUERY_REMOVE_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      const schema = queryState.schemas;
      schema.splice(action.tableIndex, 1);
      queryState = [{
        ...queryState,
        schema,
      }]
      return {
        ...newState,
        queryState,
      }
    },
    INSERT_QUERY_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let schemas = queryState.schemas;
      const tableName = action.tableName
      const findTable = (newState, tableName) => {
        return newState.schemaState.filter(table => table.table === tableName)[0]
      }
      const table = findTable(newState, tableName)
      const insertQueryTable = (tableObj) => {
        let lastTableObject = schemas[schemas.length - 1];
        if (lastTableObject.table === "") {
          schemas.pop()
          return [...schemas, tableObj]
        }
        return [...schemas, tableObj]
      }
      schemas = insertQueryTable(table)
      queryState = [{
        ...queryState,
        schemas,
      }]
      return {
        ...newState,
        queryState,
      }
    },
    SET_QUERY_PARAMS: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let queries = queryState.queries;
      if (action.queryType === "name") {
        queries[action.queryIndex].table = action.queryName;
        queryState = [{
          ...queryState,
          queries,
        }]
        return {
          ...newState,
          queryState,
        }
      }
      if (action.queryType === "columns") {
        queries[action.queryIndex].columns.push(action.queryName)
        queryState = [{
          ...queryState,
          queries,
        }]
        return {
          ...newState,
          queryState,
        }
      }
      if (action.queryType === "aggregate") {
        queries[action.queryIndex].aggregate[action.fieldIndex] = (action.queryName)
        queryState = [{
          ...queryState,
          queries,
        }]
        return {
          ...newState,
          queryState,
        }
      }
      if (action.queryType === "aggregateAs") {
        queries[action.queryIndex].aggregateAs[action.fieldIndex] = (action.queryName)
        queryState = [{
          ...queryState,
          queries,
        }]
        return {
          ...newState,
          queryState,
        }
      }
      if (action.queryType === "having") {
        queries[action.queryIndex].having[action.fieldIndex] = (action.queryName)
        queryState = [{
          ...queryState,
          queries,
        }]
        return {
          ...newState,
          queryState,
        }
      }
      queries[action.queryIndex][action.queryType] = action.queryName;
      queryState = [{
        ...queryState,
        queries,
      }]
      return {
        ...newState,
        queryState,
      }
    },




  };

  if (reducers[action.type]) return reducers[action.type](state);
  return reducers.default;
};

export default globalReducer;
