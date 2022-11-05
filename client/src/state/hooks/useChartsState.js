import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import { uniqueArray } from "../../helpers/chartFormHelpers";

const useChartsState = () => {
  const [state, dispatch] = useContext(GlobalContext);
  const seeds = state.seedState[0];

  const getUniqueValues = (tableName, colName) => {
    const uniqueValues = uniqueArray(
      seeds[tableName].map(tableData => tableData[colName])
    );
    const uniqVals = uniqueValues.map(val => ({
      label: val,
      value: val,
    }));
    return uniqVals;
  };

  return {
    getUniqueValues,
  };
};

export default useChartsState;
