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
    return axios
      .put(`/api/tables`, { globalStateString }) // add ${id} to route if we have multiple users
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

  return {
    state,
    saveProgress,
    loadProgress,
  };
};

export default useDatabase;
