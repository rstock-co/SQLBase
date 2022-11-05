import React, { useState, useEffect } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useChartsState from "../../state/hooks/useChartsState";
import useSchemaState from "../../state/hooks/useSchemaState";
import PieChartCard from "../charts/pie-chart/PieChartCard";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { getUniqueValues } = useChartsState();

  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const [activeColIndex, setActiveColIndex] = useState(1);
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [valueList, setValueList] = useState([
    {
      label: "none",
      value: "none",
    },
  ]);

  const { state } = useSchemaState();
  const allTables = state.schemaState;

  const tableList = getTableNames();
  const columnList = getColumnList(allTables[activeTableIndex]);

  useEffect(() => {
    setValueList(prev =>
      getUniqueValues(
        String(tableList[activeTableIndex].value),
        String(columnList[activeColIndex].value)
      )
    );
  }, [activeColIndex, activeTableIndex]);

  const selectTableHandler = event => {
    setActiveTableIndex(
      tableList.map(table => table.value).indexOf(event.target.value)
    );
    setActiveColIndex(0);
  };

  const selectColumnHandler = event => {
    setActiveColIndex(prev =>
      columnList.map(col => col.value).indexOf(event.target.value)
    );

    setValueList(prev =>
      getUniqueValues(
        String(tableList[activeTableIndex].value),
        String(columnList[activeColIndex].value)
      )
    );
  };

  const selectValueHandler = event => {
    setActiveValueIndex(
      valueList.map(value => value.value).indexOf(event.target.value)
    );
  };

  return (
    <main>
      <PieChartCard
        tableNameList={tableList}
        columnList={columnList}
        valueList={valueList}
        activeTableIndex={activeTableIndex}
        activeColIndex={activeColIndex}
        activeValueIndex={activeValueIndex}
        selectTableHandler={selectTableHandler}
        selectColumnHandler={selectColumnHandler}
        selectValueHandler={selectValueHandler}
      />
    </main>
  );
};

export default CreateChartsPage;

/**
    NOTE: There is no need to modify global state, all chart fucntionality is "READ ONLY" (unless we want to save their charts)

    Chart UI
    -------
      (✓)  create a card per chart (render 2 or 4 charts on the page)
      (✓)  create dependent dropdowns (schema state -> tables list -> col list)
      (✓)  create a dynamic chart title based on the user's selected table / col
      (✘ ) create a dynamic dropdown box for selecting the "UNIQUE" seeded values for the table
          (ie: for companies, 'NIKE', 'TESLA', etc)

    Chart Data Prep
    ---------------
      (✓) create 2-3 "pre-built scenarios" per chart, and a "matcher" object that contains their associated categories.
      (✓) handleChange function for dropdowns will determine if the user has selected a combination that matches a pre-built scenario
      (✓) inside the "useChartState" hook, design reducer functions that get the required data for each scenario from global "seedState".
      (✓) place the reducer functions inside the matcher object as key/values, that fire when the user hits that specific scenario.

------------------------
| SCENARIOS - PIE CHART |
------------------------

    `companies` table is selected, AND
    ---------
      (✓)  Column is `num_employees`:  pie chart shows the age distribution of the selected company.
      (✓)  Column is `
      (✓)

      `employees` table is selected, AND
    ---------
      (✓)  Column is `fav_drink`:  pie chart shows the age distribution of the selected company.
      (✓)
      (✓)
*/
