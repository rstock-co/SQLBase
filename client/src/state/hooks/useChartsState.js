import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";
import { uniqueArray } from "../../helpers/chartFormHelpers";
import { deepCopy } from "../../helpers/schemaFormHelpers";

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

  const getAllValues = (tableName, colName, valIndex) => {
    console.log("Company ID: ", valIndex);
    console.log("COL NAME: ", colName);
    const allValues = seeds[tableName]
      .filter(tableData => tableData.company_id === valIndex)
      .map(data => data[colName]);
    console.log("ALL VALSZZ: ", allValues);
    if (allValues) return allValues;
    return [];
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

  const filterChartData = (data, field, valueIndex, relValList) => {
    const newData = deepCopy(data);
    console.log("(1) INITIAL DATA: ", newData);
    console.log("REL VAL LIST: ", relValList);
    console.log("FIELD: ", field);
    console.log("DATASET: ", newData[field]);

    // get

    if (newData[field]) {
      newData[field].forEach(category => {
        let count = relValList.filter(
          val => val >= category.low && val <= category.hi
        );
        category.value = count.length;
      });
      console.log("(2) FILTERED DATA: ", newData);
      return newData;
    }
    return data;
  };

  return {
    getUniqueValues,
    getAllValues,
    getRelTableList,
    getRelColList,
    filterChartData,
  };
};

export default useChartsState;
