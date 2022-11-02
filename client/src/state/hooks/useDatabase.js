import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import axios from "axios";

import { LOAD_DATA } from "../reducers/globalReducer";

const useDatabase = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const loadData = loadedData => dispatch({ type: LOAD_DATA, loadedData });

  /**
   * Save/load progress:  User can save the current state of their schema or load last saved at any time
   * @param {integer} id the user's id (**STRETCH**)
   * @param {object} state the tables data
   * @returns an axios call to save/load current progress (table data)
   */

  const saveProgress = () => {
    const schemaString = JSON.stringify(state);
    return axios
      .put(`/api/tables`, { schemaString }) // add ${id} to route if we have multiple users
      .then(data => console.log("Save successful: ", data));
  };

  const loadProgress = () => {
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
    saveProgress,
    loadProgress,
  };
};

export default useDatabase;
