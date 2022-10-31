import { tableFields, emptyTable } from "../data_structures/schemaTable";
import { deepCopyArray } from "../helpers/schemaFormHelpers";

export const ADD_TABLE = "ADD_TABLE";
export const REMOVE_TABLE = "REMOVE_TABLE";
export const ADD_FIELD = "ADD_FIELD";
export const REMOVE_FIELD = "REMOVE_FIELD";
export const HANDLE_CHANGE = "HANDLE_CHANGE";
export const LOAD_DATA = "LOAD_DATA";

/**
 * The reducer function from the 'useReducer' hook, specifies the actions (functions to execute) to update the state object
 * @param {object} state The application's current state
 * @param {object} action The action performed by the user
 * @returns the next state, OR returns an error message if the given action type isn't valid
 */

const reducer = (state, action) => {
  const reducers = {
    ADD_TABLE: state => {
      const newState = deepCopyArray(state);
      const newTable = deepCopyArray(emptyTable);
      newState.push(newTable);
      return newState;
    },
    REMOVE_TABLE: state => {
      const newState = deepCopyArray(state);
      newState.splice(action.tableIndex, 1);
      return newState;
    },
    ADD_FIELD: state => {
      const newState = deepCopyArray(state);
      const newFields = { ...tableFields };
      newState[action.tableIndex].fields.push(newFields);
      return newState;
    },
    REMOVE_FIELD: state => {
      const fieldsToRemove = [...state[action.tableIndex].fields];
      fieldsToRemove.splice(action.fieldIndex, 1);
      const newState = deepCopyArray(state);
      newState[action.tableIndex] = {
        ...newState[action.tableIndex],
        fields: [...fieldsToRemove],
      };
      return newState;
    },
    HANDLE_CHANGE: state => {
      const newState = deepCopyArray(state);
      if (action.fieldType === "tableName") {
        newState[action.tableIndex].table = action.event.target.value;
        return newState;
      }

      const newFields = [...state[action.tableIndex].fields];
      newFields[action.fieldIndex][action.fieldType] =
        action.event.target.value;
      newState[action.tableIndex] = {
        ...newState[action.tableIndex],
        fields: [...newFields],
      };
      return newState;
    },
    LOAD_DATA: state => action.loadedData,
    default: "tried to reduce with unsupported action type",
  };

  if (reducers[action.type]) return reducers[action.type](state);
  return reducers.default;
};

export default reducer;
