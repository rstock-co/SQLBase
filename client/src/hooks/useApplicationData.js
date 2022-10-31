import { useEffect, useReducer } from "react";
import { deepCopyArray } from "../helpers/schemaFormHelpers";
import { emptyTable } from "../data_structures/schemaTable";
import axios from "axios";

import reducer, {
  ADD_TABLE,
  REMOVE_TABLE,
  ADD_FIELD,
  REMOVE_FIELD,
  HANDLE_CHANGE,
} from "../reducers/schemaFormReducer";

const useApplicationData = () => {
  const [state, dispatch] = useReducer(reducer, [deepCopyArray(emptyTable)]);

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
  const addTable = () => dispatch({ type: ADD_TABLE });
  const removeTable = tableIndex =>
    dispatch({ type: REMOVE_TABLE, tableIndex });
  const addField = tableIndex => dispatch({ type: ADD_FIELD, tableIndex });
  const removeField = (tableIndex, fieldIndex) =>
    dispatch({ type: REMOVE_FIELD, tableIndex, fieldIndex });
  const handleChange = (event, fieldType, tableIndex, fieldIndex) =>
    dispatch({ type: HANDLE_CHANGE, event, fieldType, tableIndex, fieldIndex });

  /**
   * Save progress:  User can save the current state of their schema at any time
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios put call to save current progress (table data)
   */

  const saveProgress = () => {
    const schemaString = JSON.stringify(state);
    return axios
      .put(`/api/tables`, { schemaString }) // add ${id} to route if we have multiple users
      .then(data => console.log("Save successful: ", data));
  };

  return {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
    saveProgress,
  };
};

export default useApplicationData;
