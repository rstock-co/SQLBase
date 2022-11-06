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

  const getRelations = tableName => {
    const allTables = ["companies", "employees", "products"];
    allTables.splice(allTables.indexOf(tableName), 1);
    console.log(
      "Relations: ",
      allTables.map(rel => ({
        label: rel,
        value: rel,
      }))
    );
    return allTables.map(rel => ({
      label: rel,
      value: rel,
    }));
  };

  return {
    getUniqueValues,
    getRelations,
  };
};

export default useChartsState;
