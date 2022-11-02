import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import { deepCopy } from "../../helpers/schemaFormHelpers";

import {
  QUERY_ADD_TABLE,
  INSERT_QUERY_TABLE,
  SET_QUERY_PARAMS,
  QUERY_REMOVE_TABLE,
} from "../reducers/globalReducer";

const useQueryState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const getTableNames = () => {
    const newState = deepCopy(state);
    let output = [];
    newState.schemaState.forEach(table => {
      output.push({ value: table.table, label: table.table });
    });
    return output;
  };

  const getColumnList = table => {
    let output = [];
    table.fields.map(field =>
      output.push({
        label: field.fieldName,
        value: field.fieldName,
      })
    );
    return output;
  };

  /**
   * DISPATCH functions
   */

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

  const setQueryParams = (e, queryIndex, queryType) => {
    const queryName = e.target.value;
    dispatch({ type: SET_QUERY_PARAMS, queryName, queryIndex, queryType });
  };

  return {
    state,
    getTableNames,
    getColumnList,
    addQueryTable,
    removeQueryTable,
    selectTableHandler,
    setQueryParams,
  };
};

export default useQueryState;
