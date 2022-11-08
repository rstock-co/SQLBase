import React, { useState, useEffect, useCallback } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useChartsState from "../../state/hooks/useChartsState";
import useSchemaState from "../../state/hooks/useSchemaState";
import useSeedState from "../../state/hooks/useSeedState";
import PieChartCard from "../charts/pie-chart/PieChartCard";
import BarChartCard from "../charts/bar-chart/BarChartCard";
import PageSplitter from "../../styles/components/PageSplitter";
import { deepCopy } from "../../helpers/schemaFormHelpers";
import {
  initialPieChartData,
  initialBarChartData,
} from "../../state/data_structures/chartState";
import "./CreateCharts.scss";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { yearsGenerator } = useSeedState();
  const {
    getUniqueValues,
    getAllPieValues,
    getRelTableList,
    getRelColList,
    filterPieChartData,
  } = useChartsState();

  const { state } = useSchemaState();
  let tableList = getTableNames();
  let allTables = state.schemaState;

  /**
   * PIE CHART STATE
   */

  const [pieIndexes, setPieIndexes] = useState({
    tableIndex: 0,
    colIndex: 1,
    valIndex: 0,
    relTableIndex: 0,
    relColIndex: 8,
  });

  const [pieColList, setPieColList] = useState(
    getColumnList(allTables[pieIndexes.tableIndex])
  );
  const [pieValList, setPieValList] = useState(
    getUniqueValues(
      String(tableList[pieIndexes.tableIndex].value),
      String(pieColList[pieIndexes.colIndex].value)
    )
  );
  const [pieRelTableList, setPieRelTableList] = useState(
    getRelTableList(String(tableList[pieIndexes.tableIndex].value))
  );
  const [pieRelColList, setPieRelColList] = useState(
    getRelColList(String(pieRelTableList[pieIndexes.relTableIndex].value))
  );
  const [pieRelValList, setPieRelValList] = useState(
    getAllPieValues(
      String(pieRelTableList[pieIndexes.relTableIndex].value),
      String(pieRelColList[pieIndexes.relColIndex].value),
      pieIndexes.valIndex
    )
  );
  const [pieChartData, setPieChartData] = useState(initialPieChartData);

  /**
   * BAR CHART STATE
   */

  const [barIndexes, setBarIndexes] = useState({
    tableIndex: 0,
    colIndex: 1,
    valIndex: 0,
  });

  const [barColList, setBarColList] = useState(
    getColumnList(allTables[barIndexes.tableIndex])
  );
  const [barValList, setBarValList] = useState(
    getUniqueValues(
      String(tableList[barIndexes.tableIndex].value),
      String(barColList[barIndexes.colIndex].value)
    )
  );
  const [barChartData, setBarChartData] = useState(initialBarChartData);

  /**
   * PIE CHART SETTERS
   */

  useEffect(() => {
    setPieColList(prev => getColumnList(allTables[pieIndexes.tableIndex]));
    setPieValList(prev =>
      getUniqueValues(
        String(tableList[pieIndexes.tableIndex].value),
        String(pieColList[pieIndexes.colIndex].value)
      )
    );
    setPieRelTableList(prev =>
      getRelTableList(String(tableList[pieIndexes.tableIndex].value))
    );
    setPieRelColList(prev => {
      return getRelColList(
        String(pieRelTableList[pieIndexes.relTableIndex].value)
      );
    });
    setPieRelValList(prev =>
      getAllPieValues(
        String(pieRelTableList[pieIndexes.relTableIndex].value),
        String(pieRelColList[pieIndexes.relColIndex].value),
        pieIndexes.valIndex
      )
    );
  }, [
    pieIndexes.colIndex,
    pieIndexes.tableIndex,
    pieIndexes.relTableIndex,
    pieIndexes.relColIndex,
    pieIndexes.valIndex,
  ]);

  /**
   * BAR CHART SETTERS
   */

  useEffect(() => {
    setBarColList(prev => getColumnList(allTables[barIndexes.tableIndex]));
    setBarChartData(prev =>
      yearsGenerator([5, 7, 9][Math.floor(Math.random() * 3)])
    );
  }, [barIndexes.colIndex, barIndexes.tableIndex, barIndexes.valIndex]);

  /**  USE CALLBACK (PIE CHART) */

  const generatePieData = useCallback(() => {
    setPieChartData(prev =>
      filterPieChartData(
        pieChartData,
        String(pieRelColList[pieIndexes.relColIndex].value),
        pieRelValList
      )
    );
  }, [pieRelValList]);

  useEffect(() => {
    generatePieData(pieChartData, pieRelValList);
  }, [generatePieData]);

  /** COMMON */

  const selectHandler = (chart, list, index, event) => {
    if (chart === "pie") {
      setPieIndexes(prev => {
        let next = deepCopy(prev);
        next[index] = list.map(val => val.value).indexOf(event.target.value);
        return next;
      });
    }
    if (chart === "bar") {
      setBarIndexes(prev => {
        let next = deepCopy(prev);
        next[index] = list.map(val => val.value).indexOf(event.target.value);
        return next;
      });
    }
  };

  return (
    <main>
      <div id="chart-container">
        <PieChartCard
          tableList={tableList}
          columnList={pieColList}
          valueList={pieValList}
          relTableList={pieRelTableList}
          relColList={pieRelColList}
          indexes={pieIndexes}
          setIndexes={setPieIndexes}
          selectHandler={selectHandler}
          chartData={pieChartData}
        />

        <BarChartCard
          tableList={tableList}
          columnList={barColList}
          valueList={barValList}
          indexes={barIndexes}
          setIndexes={setBarIndexes}
          selectHandler={selectHandler}
          chartData={barChartData}
        />
      </div>
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
