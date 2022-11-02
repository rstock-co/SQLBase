import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import {
  QUERY_ADD_TABLE,
  INSERT_QUERY_TABLE,
  SET_QUERY_PARAMS,
  QUERY_REMOVE_TABLE,
  SCHEMA_LOAD_DATA,
} from "../reducers/globalReducer";
import { deepCopy } from "../../helpers/schemaFormHelpers";

const useQueryState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  // console.log("GLOBAL STATE: ", state);

  const addQueryTable = () => {
    console.log("Add Table function triggered");
    dispatch({ type: QUERY_ADD_TABLE });
  };


  const removeQueryTable = (tableIndex) => {
    dispatch({ type: QUERY_REMOVE_TABLE, tableIndex })
  }


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


  const getTableNames = () => {
    const newState = deepCopy(state);
    let output = [];
    newState.schemaState.forEach(table => {
      output.push({ value: table.table, label: table.table })
    });
    return output;
  };


  const getColumnList = table => {
    let output = [];
    table.fields.map(field => output.push({
      label: field.fieldName,
      value: field.fieldName,
    }));
    return output;
  };


  const createMenuOption = (array) => {
    return array.map(item => {
      return {
        label: item,
        value: item
      }
    })
  }

  
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
    saveSchemaProgress,
    loadSchemaProgress,
    getTableNames,
    getColumnList,
    selectTableHandler,
    setQueryParams,
    createMenuOption
  };
};

export default useQueryState;
