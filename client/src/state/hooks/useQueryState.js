import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import {
  QUERY_ADD_TABLE,
  INSERT_QUERY_TABLE,
  SET_QUERY_PARAMS,
  QUERY_REMOVE_TABLE,
  // SCHEMA_ADD_TABLE,
  // SCHEMA_REMOVE_TABLE,
  // SCHEMA_ADD_FIELD,
  // SCHEMA_REMOVE_FIELD,
  // SCHEMA_HANDLE_CHANGE,
  SCHEMA_LOAD_DATA,
} from "../reducers/globalReducer";
import { deepCopy } from "../../helpers/schemaFormHelpers";

const useQueryState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  console.log("GLOBAL STATE: ", state);

  const addQueryTable = () => {
    console.log("Add Table function triggered");
    dispatch({ type: QUERY_ADD_TABLE });
  };
  const removeQueryTable = (tableIndex) => {
    dispatch({ type: QUERY_REMOVE_TABLE, tableIndex })
  }
  // const removeSchemaTable = tableIndex =>
  //   dispatch({ type: SCHEMA_REMOVE_TABLE, tableIndex });
  // const addSchemaField = tableIndex =>
  //   dispatch({ type: SCHEMA_ADD_FIELD, tableIndex });
  // const removeSchemaField = (tableIndex, fieldIndex) =>
  //   dispatch({ type: SCHEMA_REMOVE_FIELD, tableIndex, fieldIndex });
  // const handleSchemaChange = (event, fieldType, tableIndex, fieldIndex) =>
  //   dispatch({
  //     type: SCHEMA_HANDLE_CHANGE,
  //     event,
  //     fieldType,
  //     tableIndex,
  //     fieldIndex,
  //   });
  const selectTableHandler = (event, queryIndex) => {
    const tableName = event.target.value;
    const queryName = event.target.value;
    dispatch({ type: INSERT_QUERY_TABLE, tableName },
      dispatch({ type: SET_QUERY_PARAMS, queryName, queryIndex, queryType: 'name' })
    );
  }

  const setQueryParams = (e, queryIndex, queryType) => {
    const queryName = e.target.value;
    dispatch({ type: SET_QUERY_PARAMS, queryName, queryIndex, queryType })
  }
  // include
  // const insertQueryTable = (table) => {
  //   setQueryTables(prev => {
  //     let newPrev = deepCopy(prev);
  //     let lastObject = newPrev[newPrev.length - 1];
  //     if (lastObject.table === "") {
  //       newPrev.pop()
  //       return [...newPrev, table]
  //     }
  //     return [...prev, table]
  //   })
  // };

  const getTableNames = () => {
    const newState = deepCopy(state);
    let output = [];
    newState.schemaState.forEach(table => {
      output.push({ value: table.table, label: table.table })
    });
    return output;
  };
  // const findTable = (state, tableName) => {
  //   return state.schemaState.filter(table => table.table === tableName)[0]
  // }

  const getColumnList = table => {
    let output = [];
    table.fields.map(field => output.push({
      label: field.fieldName,
      value: field.fieldName,
    }));
    return output;
  };

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
    addQueryTable,
    removeQueryTable,
    // addSchemaField,
    // removeSchemaField,
    // handleSchemaChange,
    saveSchemaProgress,
    loadSchemaProgress,
    getTableNames,
    // findTable,
    getColumnList,
    selectTableHandler,
    setQueryParams,
  };
};

export default useQueryState;
