import { useContext } from "react";
import { GlobalContext } from "../GlobalStateProvider";

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalContext);

  const getTableNames = () => {
    let tableNames = [];
    state.schemaState.forEach(table => {
      tableNames.push({ value: table.table, label: table.table });
    });
    return tableNames;
  };

  const getColumnList = table => {
    let columnList = [{ label: "None", value: "none" }];
    table.fields.map(field =>
      columnList.push({
        label: field.fieldName,
        value: field.fieldName,
      })
    );
    return columnList;
  };

  return {
    getTableNames,
    getColumnList,
  };
};

export default useGlobalState;
