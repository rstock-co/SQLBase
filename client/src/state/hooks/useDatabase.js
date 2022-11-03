import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import { LOAD_DB_TO_STATE } from "../reducers/globalReducer";

const useDatabase = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const loadData = loadedData =>
    dispatch({ type: LOAD_DB_TO_STATE, loadedData });

  /**
   * Save/load progress:  User can save the current state of their schema or load last saved at any time
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios call to save/load current progress (table data)
   */

  const saveProgress = () => {
    const globalStateString = JSON.stringify(state);
    const databaseName = state.databaseName;
    const userID = 1;
    return axios
      .put(`/api/tables`, { userID, databaseName, globalStateString }) // add ${id} to route if we have multiple users
      .then(data => console.log("Save successful: ", data));
  };

  const loadProgress = () => {
    return axios
      .get(`/api/tables`) // add ${id} to route if we have multiple users
      .then(data => {
        console.log("Loading log: ", JSON.parse(data.data[0]["global_state"]));
        const globalStateString = JSON.parse(data.data[0]["global_state"]);
        loadData(globalStateString);
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };
  const loadDatabase = (databaseID) => {
    console.log(databaseID)

    return axios
      .get(`/api/tables`, { params: { databaseID } }) // add ${id} to route if we have multiple users
      .then(data => {
        console.log(data.data)
        console.log("Loading log: ", JSON.parse(data.data[0]["global_state"]));
        const globalStateString = JSON.parse(data.data[0]["global_state"]);
        loadData(globalStateString);
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };


  // get current user

  const createDatabase = () => {
    const globalStateString = state;
    const userID = 1;
    console.log(globalStateString)
    return axios
      .put(`/api/databases`, { globalStateString })
      .then(data => {
        console.log('post createDB', data)
      })
      .catch(err => {
        console.log("Error Creating DB", err)
      })
  }


  const getDatabases = () => {
    console.log('getDatabase')
    return axios
      .get(`/api/databases`)
      .then(data => {
        // console.log(JSON.parse(data.data.global_state))
        return data.data
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  }



  return {
    state,
    saveProgress,
    loadProgress,
    loadDatabase,
    createDatabase,
    getDatabases
  };
};

export default useDatabase;
