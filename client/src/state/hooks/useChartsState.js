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
    if (uniqueValues) {
      return uniqueValues.map(val => ({
        label: val,
        value: val,
      }));
    }
    return { label: "None", value: "None" };
  };

  const getRelTableList = tableName => {
    const allTables = ["companies", "employees", "products"];
    allTables.splice(allTables.indexOf(tableName), 1);
    return allTables.map(rel => ({
      label: rel,
      value: rel,
    }));
  };

  const getRelColList = tableName => {
    let relColList = [{ label: "None", value: "none" }];
    console.log("TABLE NAME from ZZZZ: ", tableName);
    console.log(
      "FILTER from ZZZZ: ",
      state.schemaState.filter(table => table.table === tableName)
    );
    const relTable = state.schemaState.filter(
      table => table.table === tableName
    );
    relTable[0].fields.map(field =>
      relColList.push({
        label: field.fieldName,
        value: field.fieldName,
      })
    );
    return relColList;
  };

  return {
    getUniqueValues,
    getRelTableList,
    getRelColList,
  };
};

export default useChartsState;
