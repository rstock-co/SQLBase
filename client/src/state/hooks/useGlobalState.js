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
    let columnNames = [];
    table.fields.map(field =>
      columnNames.push({
        label: field.fieldName,
        value: field.fieldName,
      })
    );
    return columnNames;
  };

  return {
    getTableNames,
    getColumnList,
  };
};

export default useGlobalState;
