import React, { useState } from "react";
import ResponsivePieChart from "../charts/pie-chart/ResponsivePieChart";
import { FormInputDropdown } from "../fields/FormInputDropdown";
import useGlobalState from "../../state/hooks/useGlobalState";
import useSchemaState from "../../state/hooks/useSchemaState";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

const CreateChartsPage = () => {
  const { getTableNames, getColumnList } = useGlobalState();
  const { state } = useSchemaState();
  const tableNameList = getTableNames();

  const [activeTableIndex, setActiveTableIndex] = useState(0);
  const selectTableHandler = event => {
    setActiveTableIndex(
      tableNameList.map(table => table.value).indexOf(event.target.value)
    );
  };

  console.log("CHART STATE: ", state);
  console.log("CHART TABLES: ", tableNameList);
  console.log("CURRENT TABLE: ", tableNameList[activeTableIndex].value);
  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <main>
      <Card>
        <div class="dropdown">
          <FormInputDropdown
            name={"TableSelect"}
            control={control}
            label={"Table Select"}
            menuOptions={tableNameList}
            handleChange={event => selectTableHandler(event)}
            value={tableNameList[activeTableIndex].value}
          />
        </div>
        <div class="chart">
          <ResponsivePieChart
            width={500}
            height={500}
            chartColor={"#e68209"}
            textColor1={"#e68209"}
            textColor2={"#fcba03"}
          />
        </div>
      </Card>
    </main>
  );
};

export default CreateChartsPage;
