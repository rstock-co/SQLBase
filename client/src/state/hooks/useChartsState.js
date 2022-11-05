import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";

import {
  QUERY_ADD_TABLE,
  INSERT_QUERY_TABLE,
  SET_QUERY_PARAMS,
  QUERY_REMOVE_TABLE,
} from "../reducers/globalReducer";

const useChartsState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const addQueryTable = () => {
    console.log("Add Table function triggered");
    dispatch({ type: QUERY_ADD_TABLE });
  };

  const removeQueryTable = tableIndex => {
    dispatch({ type: QUERY_REMOVE_TABLE, tableIndex });
  };

  const selectTableHandler = (event, queryIndex) => {
    const tableName = event.target.value;
    const queryName = event.target.value;
    dispatch(
      { type: INSERT_QUERY_TABLE, tableName },
      dispatch({
        type: SET_QUERY_PARAMS,
        queryName,
        queryIndex,
        queryType: "name",
      })
    );
  };

  const setQueryParams = (event, queryIndex, queryType, fieldIndex) => {
    const queryName = event.target.value;
    dispatch({
      type: SET_QUERY_PARAMS,
      queryName,
      queryIndex,
      queryType,
      fieldIndex,
    });
  };

  return {
    state,
    addQueryTable,
    removeQueryTable,
    selectTableHandler,
    setQueryParams,
  };
};

export default useChartsState;
