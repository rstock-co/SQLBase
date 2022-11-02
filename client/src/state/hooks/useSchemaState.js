import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import {
  SCHEMA_ADD_TABLE,
  SCHEMA_REMOVE_TABLE,
  SCHEMA_ADD_FIELD,
  SCHEMA_REMOVE_FIELD,
  SCHEMA_HANDLE_CHANGE,
  SCHEMA_LOAD_DATA,
} from "../reducers/globalReducer";
import { deepCopy } from "../../helpers/schemaFormHelpers";

const useSchemaState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  console.log("GLOBAL STATE: ", state);

  const addSchemaTable = () => {
    console.log("Add Table function triggered");
    dispatch({ type: SCHEMA_ADD_TABLE });
  };
  const removeSchemaTable = tableIndex =>
    dispatch({ type: SCHEMA_REMOVE_TABLE, tableIndex });
  const addSchemaField = tableIndex =>
    dispatch({ type: SCHEMA_ADD_FIELD, tableIndex });
  const removeSchemaField = (tableIndex, fieldIndex) =>
    dispatch({ type: SCHEMA_REMOVE_FIELD, tableIndex, fieldIndex });
  const handleSchemaChange = (event, fieldType, tableIndex, fieldIndex) =>
    dispatch({
      type: SCHEMA_HANDLE_CHANGE,
      event,
      fieldType,
      tableIndex,
      fieldIndex,
    });


  /**
   * Database
   */


  const loadData = loadedData =>
    dispatch({ type: SCHEMA_LOAD_DATA, loadedData });

  /**
   * Save/load progress:  User can save the current state of their schema or load last saved at any time
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios call to save/load current progress (table data)
   */

  const saveSchemaProgress = () => {
    const schemaString = JSON.stringify(state);
    return axios
      .put(`/api/tables`, { schemaString }) // add ${id} to route if we have multiple users
      .then(data => console.log("Save successful: ", data));
  };

  const loadSchemaProgress = () => {
    return axios
      .get(`/api/tables`) // add ${id} to route if we have multiple users
      .then(data => {
        console.log(JSON.parse(data.data[0]["schema_string"]));
        const schemaString = JSON.parse(data.data[0]["schema_string"]);
        loadData(schemaString);
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };

  return {
    state,
    addSchemaTable,
    removeSchemaTable,
    addSchemaField,
    removeSchemaField,
    handleSchemaChange,
    saveSchemaProgress,
    loadSchemaProgress,
  };
};

export default useSchemaState;
