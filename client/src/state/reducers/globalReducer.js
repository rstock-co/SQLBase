import { deepCopy } from "../../helpers/schemaFormHelpers";
import {
  schemaTableFields,
  initialSchemaState,
} from "../data_structures/schemaState";
import { initialGlobalState } from "../data_structures/globalState";
import { initialQueries } from "../data_structures/queryState";
import uuid from 'react-uuid'

// database
export const LOAD_DB_TO_STATE = "LOAD_DB_TO_STATE";
export const CREATE_NEW_STATE = "CREATE_NEW_STATE";

// schema
export const SCHEMA_ADD_TABLE = "SCHEMA_ADD_TABLE";
export const SCHEMA_REMOVE_TABLE = "SCHEMA_REMOVE_TABLE";
export const SCHEMA_ADD_FIELD = "SCHEMA_ADD_FIELD";
export const SCHEMA_REMOVE_FIELD = "SCHEMA_REMOVE_FIELD";
export const SCHEMA_HANDLE_CHANGE = "SCHEMA_HANDLE_CHANGE";

// query
export const QUERY_ADD_TABLE = "QUERY_ADD_TABLE";
export const QUERY_REMOVE_TABLE = "QUERY_REMOVE_TABLE";
export const INSERT_QUERY_TABLE = "INSERT_QUERY_TABLE";
export const SET_QUERY_PARAMS = "SET_QUERY_PARAMS";

// seed
export const SEED_FAKE_DATA = "SEED_FAKE_DATA";
export const SEED_ALL_FAKE_DATA = "SEED_ALL_FAKE_DATA";

/**
 * The reducer function from the 'useReducer' hook, specifies the actions (functions to execute) to update the state object
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user
 * @returns the next state, OR returns an error message if the given action type isn't valid
 */

const globalReducer = (state, action) => {
  const reducers = {
    LOAD_DB_TO_STATE: state => action.loadedData,
    CREATE_NEW_STATE: state => {
      initialGlobalState.databaseUuid = uuid();
      return initialGlobalState;
    },
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
      if (action.fieldType === "databaseName") {
        newState.databaseName = action.event.target.value;
        return {
          ...newState,
        };
      }
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

    //--------------------------------------- QUERY REDUCERS
    QUERY_ADD_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let schemas = queryState.schemas;
      let queries = queryState.queries;
      const newTable = deepCopy(initialSchemaState);
      const newQueries = deepCopy(initialQueries);
      schemas.push(newTable);
      queries.push(newQueries);

      queryState = [
        {
          ...queryState,
          schemas,
          queries,
        },
      ];
      return {
        ...newState,
        queryState,
      };
    },
    QUERY_REMOVE_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      const queries = queryState.queries;
      const schemas = queryState.schemas;
      schemas.splice(action.tableIndex, 1);
      queries.splice(action.tableIndex, 1);
      queryState = [
        {
          queries,
          schemas,
        },
      ];
      return {
        ...newState,
        queryState,
      };
    },
    INSERT_QUERY_TABLE: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let schemas = queryState.schemas;
      const tableName = action.tableName;
      const findTable = (newState, tableName) => {
        return newState.schemaState.filter(
          table => table.table === tableName
        )[0];
      };
      const table = findTable(newState, tableName);
      const insertQueryTable = tableObj => {
        let lastTableObject = schemas[schemas.length - 1];
        if (lastTableObject.table === "") {
          schemas.pop();
          return [...schemas, tableObj];
        }
        return [...schemas, tableObj];
      };
      schemas = insertQueryTable(table);
      queryState = [
        {
          ...queryState,
          schemas,
        },
      ];
      return {
        ...newState,
        queryState,
      };
    },
    SET_QUERY_PARAMS: state => {
      const newState = deepCopy(state);
      let queryState = newState.queryState[0];
      let queries = queryState.queries;
      if (action.queryType === "name") {
        if (action.queryName !== "none") {
          queries[action.queryIndex].table = action.queryName;
        } else {
          queries[action.queryIndex].table = ""
        }
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "columns") {
        if (action.queryName !== "none") {
          queries[action.queryIndex].columns.push(action.queryName);
        } else {
          queries[action.queryIndex].columns.splice(action.fieldIndex, 1);
        }
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "aggregate") {
        if (action.queryName !== "none") {
          queries[action.queryIndex].aggregate[action.fieldIndex] =
            action.queryName;
        } else {
          queries[action.queryIndex].aggregate.splice(action.fieldIndex, 1)
        }
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "aggregateAs") {
        queries[action.queryIndex].aggregateAs[action.fieldIndex] =
          action.queryName;
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "having") {
        queries[action.queryIndex].having[action.fieldIndex] = action.queryName;
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "whereCondition") {
        queries[action.queryIndex].whereCondition[action.fieldIndex] =
          action.queryName;
        console.log(
          "bug fix",
          queries[action.queryIndex].whereCondition[action.fieldIndex]
        );
        console.log("bug fix 2", action.fieldIndex);
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "groupBy") {
        if (action.queryName !== 'none') {
          queries[action.queryIndex].groupBy[action.fieldIndex] =
            action.queryName;
        } else {
          queries[action.queryIndex].groupBy.splice(action.fieldIndex, 1)
        }
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      if (action.queryType === "orderBy") {
        if (action.queryName !== "none") {
          queries[action.queryIndex].orderBy[action.fieldIndex] =
            action.queryName;
        } else {
          queries[action.queryIndex].orderBy.splice(action.fieldIndex, 1)
        }
        queryState = [
          {
            ...queryState,
            queries,
          },
        ];
        return {
          ...newState,
          queryState,
        };
      }
      queries[action.queryIndex][action.queryType] = action.queryName;
      queryState = [
        {
          ...queryState,
          queries,
        },
      ];
      return {
        ...newState,
        queryState,
      };
    },
    //--------------------------------------- SEED REDUCERS
    SEED_ALL_FAKE_DATA: state => {
      const newState = deepCopy(state);
      const seedState = action.seedState;
      return {
        ...newState,
        seedState,
      };
    },
    SEED_FAKE_DATA: state => {
      const newState = deepCopy(state);
      let seedState = newState.seedState[0];
      seedState[action.tableName] = action.seedData
      seedState = [{
        ...seedState,
      }]
      return {
        ...newState,
        seedState,
      };
    },
  };

  if (reducers[action.type]) return reducers[action.type](state);
  return reducers.default;
};

export default globalReducer;
