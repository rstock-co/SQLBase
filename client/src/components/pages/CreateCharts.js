import React, { useState } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useSchemaState from "../../state/hooks/useSchemaState";
import PieChartCard from "../charts/pie-chart/PieChartCard";
import PageSplitter from "../../styles/components/PageSplitter";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { state } = useSchemaState();
  const allTables = state.schemaState;

  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeColIndex, setActiveColIndex] = useState(0);

  const tableNameList = getTableNames();
  const columnList = getColumnList(allTables[activeTableIndex]);

  const selectTableHandler = (event) => {
    setActiveTableIndex(
      tableNameList.map((table) => table.value).indexOf(event.target.value)
    );
    setActiveColIndex(0);
  };

  const selectColumnHandler = (event) => {
    setActiveColIndex(
      columnList.map((col) => col.value).indexOf(event.target.value)
    );
  };

  return (
    <main>
      <PieChartCard
        tableNameList={tableNameList}
        columnList={columnList}
        activeTableIndex={activeTableIndex}
        activeColIndex={activeColIndex}
        selectTableHandler={selectTableHandler}
        selectColumnHandler={selectColumnHandler}
      />
      <PageSplitter src="body-teal.png" id="tables-bottom" />
    </main>
  );
};

export default CreateChartsPage;
