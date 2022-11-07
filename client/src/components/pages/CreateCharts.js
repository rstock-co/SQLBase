import React, { useState, useEffect, useCallback } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useChartsState from "../../state/hooks/useChartsState";
import useSchemaState from "../../state/hooks/useSchemaState";
import PieChartCard from "../charts/pie-chart/PieChartCard";
import PageSplitter from "../../styles/components/PageSplitter";
import { deepCopy } from "../../helpers/schemaFormHelpers";
import { pieChartData } from "../../state/data_structures/chartState";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const {
    getUniqueValues,
    getAllValues,
    getRelTableList,
    getRelColList,
    filterChartData,
  } = useChartsState();

  const { state } = useSchemaState();
  let tableList = getTableNames();
  let allTables = state.schemaState;

  const [indexes, setIndexes] = useState({
    tableIndex: 0,
    colIndex: 1,
    valIndex: 0,
    relTableIndex: 0,
    relColIndex: 8,
  });

  const [columnList, setColumnList] = useState(
    getColumnList(allTables[indexes.tableIndex])
  );
  const [valueList, setValueList] = useState(
    getUniqueValues(
      String(tableList[indexes.tableIndex].value),
      String(columnList[indexes.colIndex].value)
    )
  );
  const [relTableList, setRelTableList] = useState(
    getRelTableList(String(tableList[indexes.tableIndex].value))
  );
  const [relColList, setRelColList] = useState(
    getRelColList(String(relTableList[indexes.relTableIndex].value))
  );
  const [relValList, setRelValList] = useState(
    getAllValues(
      String(relTableList[indexes.relTableIndex].value),
      String(relColList[indexes.relColIndex].value),
      indexes.valIndex
    )
  );
  const [chartData, setChartData] = useState(pieChartData);

  useEffect(() => {
    setColumnList(prev => getColumnList(allTables[indexes.tableIndex]));
    setValueList(prev =>
      getUniqueValues(
        String(tableList[indexes.tableIndex].value),
        String(columnList[indexes.colIndex].value)
      )
    );
    setRelTableList(prev =>
      getRelTableList(String(tableList[indexes.tableIndex].value))
    );
    setRelColList(prev => {
      return getRelColList(String(relTableList[indexes.relTableIndex].value));
    });
    setRelValList(prev =>
      getAllValues(
        String(relTableList[indexes.relTableIndex].value),
        String(relColList[indexes.relColIndex].value),
        indexes.valIndex
      )
    );
  }, [
    indexes.colIndex,
    indexes.tableIndex,
    indexes.relTableIndex,
    indexes.relColIndex,
    indexes.valIndex,
  ]);

  const generateData = useCallback(() => {
    setChartData(prev =>
      filterChartData(
        chartData,
        String(relColList[indexes.relColIndex].value),
        relValList
      )
    );
  }, [relValList]);

  useEffect(() => {
    generateData(chartData, relValList);
  }, [generateData]);

  const selectHandler = (list, index, event) => {
    setIndexes(prev => {
      let next = deepCopy(prev);
      next[index] = list.map(val => val.value).indexOf(event.target.value);
      return next;
    });
  };

  return (
    <main>
      <PieChartCard
        tableList={tableList}
        columnList={columnList}
        valueList={valueList}
        relTableList={relTableList}
        relColList={relColList}
        indexes={indexes}
        setIndexes={setIndexes}
        selectHandler={selectHandler}
        chartData={chartData}
      />
      <PageSplitter src="body-teal.png" id="tables-bottom" />
    </main>
  );
};

export default CreateChartsPage;

/**
    NOTE: There is no need to modify global state, all chart fucntionality is "READ ONLY" (unless we want to save their charts)

    Chart UI
    -------
      (✘ )  create a card per chart (render 2 or 4 charts on the page)
      (✓)  create dependent dropdowns (schema state -> tables list -> col list -> val list)
      (✓)  create a dynamic chart title based on the user's selected table / col
      (✓) create a dynamic dropdown box for selecting the "UNIQUE" seeded values for the table
          (ie: for companies, 'NIKE', 'TESLA', etc)

    Chart Data Prep
    ---------------
      (✘ ) create 2-3 "pre-built scenarios" per chart, and a "matcher" object that contains their associated categories.
      (✘ ) handleChange function for dropdowns will determine if the user has selected a combination that matches a pre-built scenario
      (-O-) inside the "useChartState" hook, design reducer functions that get the required data for each scenario from global "seedState".
      (✘ ) place the reducer functions inside the matcher object as key/values, that fire when the user hits that specific scenario.

------------------------
| SCENARIOS - PIE CHART |
------------------------

    `companies` table is selected, AND
    ---------
      (✘ )  Column is `num_employees`:  pie chart shows the age distribution of the selected company.
      (✘ )  Column is `
      (✘ )

      `employees` table is selected, AND
    ---------
      (✓)  Column is `fav_drink`:  pie chart shows the age distribution of the selected company.
      (✓)
      (✓)
*/
