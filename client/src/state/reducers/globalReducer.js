import {
  schemaTableFields,
  initialSchemaState,
} from "../data_structures/schemaState";
import { deepCopy } from "../../helpers/schemaFormHelpers";

// schema
export const SCHEMA_ADD_TABLE = "SCHEMA_ADD_TABLE";
export const SCHEMA_REMOVE_TABLE = "SCHEMA_REMOVE_TABLE";
export const SCHEMA_ADD_FIELD = "SCHEMA_ADD_FIELD";
export const SCHEMA_REMOVE_FIELD = "SCHEMA_REMOVE_FIELD";
export const SCHEMA_HANDLE_CHANGE = "SCHEMA_HANDLE_CHANGE";
export const SCHEMA_LOAD_DATA = "SCHEMA_LOAD_DATA";

// query

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
  };

  if (reducers[action.type]) return reducers[action.type](state);
  return reducers.default;
};

export default globalReducer;
