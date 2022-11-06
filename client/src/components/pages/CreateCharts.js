import React, { useState, useEffect } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useChartsState from "../../state/hooks/useChartsState";
import useSchemaState from "../../state/hooks/useSchemaState";
import PieChartCard from "../charts/pie-chart/PieChartCard";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { getUniqueValues, getRelations } = useChartsState();
  const { state } = useSchemaState();
  const allTables = state.schemaState;
  const tableList = getTableNames();

  const [indexes, setIndexes] = useState({
    tableIndex: 0,
    colIndex: 1,
    valIndex: 0,
    relIndex: 0,
  });
  const columnList = getColumnList(allTables[indexes.tableIndex]);

  const [valueList, setValueList] = useState([
    { label: "none", value: "none" },
  ]);
  const [relationList, setRelationList] = useState([
    { label: "none", value: "none" },
  ]);

  useEffect(() => {
    setValueList(prev =>
      getUniqueValues(
        String(tableList[indexes.tableIndex].value),
        String(columnList[indexes.colIndex].value)
      )
    );

    setRelationList(prev =>
      getRelations(String(tableList[indexes.tableIndex].value))
    );
  }, [indexes.colIndex, indexes.tableIndex]);

  console.log("RELATIONS LIST: ", relationList);

  const selectTableHandler = event => {
    setIndexes(prev => ({
      ...prev,
      tableIndex: tableList
        .map(table => table.value)
        .indexOf(event.target.value),
    }));
    setIndexes(prev => ({
      ...prev,
      colIndex: 0,
    }));
  };

  const selectColumnHandler = event => {
    setIndexes(prev => ({
      ...prev,
      colIndex: columnList.map(col => col.value).indexOf(event.target.value),
    }));
  };

  const selectValueHandler = event => {
    setIndexes(prev => ({
      ...prev,
      valIndex: valueList.map(val => val.value).indexOf(event.target.value),
    }));
  };

  const selectRelHandler = event => {
    setIndexes(prev => ({
      ...prev,
      relIndex: relationList.map(rel => rel.value).indexOf(event.target.value),
    }));
  };

  return (
    <main>
      <PieChartCard
        tableList={tableList}
        columnList={columnList}
        valueList={valueList}
        relationList={relationList}
        activeTableIndex={indexes.tableIndex}
        activeColIndex={indexes.colIndex}
        activeValueIndex={indexes.valIndex}
        activeRelIndex={indexes.relIndex}
        selectTableHandler={selectTableHandler}
        selectColumnHandler={selectColumnHandler}
        selectValueHandler={selectValueHandler}
        selectRelHandler={selectRelHandler}
      />
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
