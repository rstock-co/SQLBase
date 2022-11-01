import { useReducer } from "react";
import { deepCopyArray } from "../helpers/schemaFormHelpers";
import emptyQuery from "../data_structures/queryTable";
import useSchemaData from "./useSchemaData";
import axios from "axios";

import reducer, {
  ADD_QUERY,
  // REMOVE_TABLE,
  // ADD_FIELD,
  // REMOVE_FIELD,
  // HANDLE_CHANGE,
  // LOAD_DATA,
} from "../reducers/queryFormReducer";

const useQueryData = () => {
  const { getState, state: tableState } = useSchemaData();
  // const [state, dispatch] = useReducer(reducer, [deepCopyArray(emptyQuery)]);

  const schemaState = getState();
  console.log("STATE FROM SCHEMA: ", schemaState);
  console.log("TABLES FROM SCHEMA: ", tableState);
  /**
   * Initializes application data via useEffect hook which runs only once
   * Then dispatches the data to update the application state via useReducer hook
   */

  // useEffect(() => {
  //   Promise.all([
  //     axios.get("/api/days"),
  //     axios.get("/api/appointments"),
  //     axios.get("/api/interviewers"),
  //   ]).then(all => {
  //     dispatch({
  //       type: SET_APPLICATION_DATA,
  //       days: all[0].data,
  //       appointments: all[1].data,
  //       interviewers: all[2].data,
  //     });
  //   });
  // }, []);

  /**
   * Dispatch functions
   */

  // const addQuery = () => dispatch({ type: ADD_QUERY });
  // const removeTable = tableIndex =>
  //   dispatch({ type: REMOVE_TABLE, tableIndex });
  // const addField = tableIndex => dispatch({ type: ADD_FIELD, tableIndex });
  // const removeField = (tableIndex, fieldIndex) =>
  //   dispatch({ type: REMOVE_FIELD, tableIndex, fieldIndex });
  // const handleChange = (event, fieldType, tableIndex, fieldIndex) =>
  //   dispatch({ type: HANDLE_CHANGE, event, fieldType, tableIndex, fieldIndex });
  // const loadData = loadedData => dispatch({ type: LOAD_DATA, loadedData });

  /**
   * Dependent dropdown functions
   */

  const getTableNames = () => {
    schemaState.map(table => ({
      label: table.table,
      value: table.table,
    }));
  };

  const getColumnNames = table => {
    table.fields.map(field => ({
      label: field.fieldName,
      value: field.fieldName,
    }));
  };

  /**
   * Save/load progress:  User can save the current state of their schema or load last saved at any time
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios call to save/load current progress (table data)
   */

  // const saveProgress = () => {
  //   const schemaString = JSON.stringify(state);
  //   return axios
  //     .put(`/api/tables`, { schemaString }) // add ${id} to route if we have multiple users
  //     .then(data => console.log("Save successful: ", data));
  // };

  const loadProgress = () => {
    return axios
      .get(`/api/tables`) // add ${id} to route if we have multiple users
      .then(data => {
        const schemaString = JSON.parse(data.data[0]["schema_string"]);
        // loadData(schemaString);
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };

  return {
    // state,
    // schemaState,
    // addQuery,
    // removeTable,
    // addField,
    // removeField,
    // handleChange,
    // saveProgress,
    // loadProgress,
    getTableNames,
    getColumnNames,
  };
};

export default useQueryData;
