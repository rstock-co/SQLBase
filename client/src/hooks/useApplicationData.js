import { useEffect, useReducer } from "react";
import { deepCopyArray } from "../helpers/schemaFormHelpers";
import { emptyTable } from "../data_structures/schemaTable";
// import axios from "axios";

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
   * Updates the appointments list with the new interview object when either
   * the 'bookInterview' or 'cancelInterview' functions make an AJAX request
   * @param {integer} id
   * @param {object} interview
   * @returns nothing; updates state via dispatching new appointments and updated number of spots
   */

  // const updateAppointments = (id, interview) => {
  //   const int = interview ? { ...interview } : null;
  //   const appointment = {
  //     ...state.appointments[id],
  //     interview: int,
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment,
  //   };
  //   dispatch({
  //     type: SET_INTERVIEW,
  //     appointments,
  //     days: updateSpots(state, appointments),
  //   });
  // };

  /**
   * Books & cancels interviews when user submits the form or clicks delete button
   * @param {integer} id the appointment id for the appointment being booked
   * @param {object} interview the interview data
   * @returns an axios put call to update appointments with new interview, then update state, then update spots
   */

  const saveProgress = () => {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then(() => updateAppointments(id, interview));
  };

  // const cancelInterview = id =>
  //   axios.delete(`/api/appointments/${id}`).then(() => updateAppointments(id));

  return {
    state,
    addTable,
    removeTable,
    addField,
    removeField,
    handleChange,
  };
};

export default useApplicationData;
