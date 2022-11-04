import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import { LOAD_DB_TO_STATE, CREATE_NEW_STATE } from "../reducers/globalReducer";

const useDatabase = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const loadData = loadedData =>
    dispatch({ type: LOAD_DB_TO_STATE, loadedData });
  const createNewState = uuid =>
    dispatch({ type: CREATE_NEW_STATE, uuid });

  /**
   * Save/load progress:  User can save the current global state (all schema, queries, seeds)
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios call to save/load current progress
   */

  const saveProgress = () => {
    const globalStateString = JSON.stringify(state);
    const databaseName = state.databaseName;
    const databaseUuid = state.databaseUuid
    const userID = 1;
    return axios
      .post(`/api/tables`, { userID, databaseName, globalStateString, databaseUuid }) // add ${id} to route if we have multiple users
      .then(data => console.log("Save successful: ", data));
  };

  const loadProgress = () => {
    return axios
      .get(`/api/tables`) // add ${id} to route if we have multiple users
      .then(data => {
        console.log(
          "Data Loaded from DB: ",
          JSON.parse(data.data[0]["global_state"])
        );
        const globalStateString = JSON.parse(data.data[0]["global_state"]);
        loadData(globalStateString);
      })
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };

  const loadDatabase = (uuid) => {
    console.log(uuid)

    return axios
      .get(`/api/tables`, { params: { uuid } }) // add ${id} to route if we have multiple users
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

  // creates new pgsql database, and blank tables
  const createDatabase = async (schemaString) => {
    const globalStateString = state;
    saveProgress();

    const userID = 1;
    console.log(globalStateString)
    return axios.all([
      await axios.put(`/api/databases`, { globalStateString }),
      // creates tables
      await axios.put(`/api/virtualDatabases`, { globalStateString, userID, schemaString })
    ])
      .then(axios.spread((createDBData, createTableData) => {
        console.log('put createDB', createDBData)
        console.log('put createTable', createTableData)
      }))
      .catch(err => {
        console.log("Error loading: ", err);
      });
  };

  const deleteDatabase = async (databaseName, databaseUuid) => {
    return axios.all([
      await axios.post(`api/databases`, { databaseName }),
      await axios.delete(`api/tables`, { params: { databaseUuid } })
    ])
      .then(axios.spread((dropDBData, removeStateData) => {
        console.log('post dropDBData', dropDBData)
        console.log('delete removeStateData', removeStateData)
      }))
      .catch(err => {
        console.log("Error loading: ", err);
      });
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
    createNewState,
    loadProgress,
    loadDatabase,
    createDatabase,
    getDatabases,
    deleteDatabase
  };
};

export default useDatabase;
