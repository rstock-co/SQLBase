import React, { useState, useEffect, useRef } from "react";
import useGlobalState from "../../state/hooks/useGlobalState";
import useChartsState from "../../state/hooks/useChartsState";
import useSchemaState from "../../state/hooks/useSchemaState";
import PieChartCard from "../charts/pie-chart/PieChartCard";
import PageSplitter from "../../styles/components/PageSplitter";
import { deepCopy } from "../../helpers/schemaFormHelpers";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { getUniqueValues, getRelations } = useChartsState();
  const { state } = useSchemaState();

  const [indexes, setIndexes] = useState({
    tableIndex: 0,
    colIndex: 1,
    valIndex: 0,
    relIndex: 0,
  });

  let tableList = getTableNames();

  const [columnList, setColumnList] = useState(
    getColumnList(state.schemaState[indexes.tableIndex])
  );
  const [valueList, setValueList] = useState(
    getUniqueValues(String(tableList[0].value), String(columnList[1].value))
  );
  const [relationList, setRelationList] = useState(
    getRelations(String(tableList[indexes.tableIndex].value))
  );

  useEffect(() => {
    setColumnList(prev => getColumnList(state.schemaState[indexes.tableIndex]));
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

  const selectHandler = (list, index, event) => {
    setIndexes(prev => {
      let next = deepCopy(prev);
      next[index] = list.map((val, i) => val.value).indexOf(event.target.value);
      return next;
    });
  };

  return (
    <main>
      <PieChartCard
        tableList={tableList}
        columnList={columnList}
        valueList={valueList}
        relationList={relationList}
        indexes={indexes}
        setIndexes={setIndexes}
        selectHandler={selectHandler}
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
