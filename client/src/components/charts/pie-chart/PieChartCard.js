import React from "react";
import ResponsivePieChart from "./ResponsivePieChart";
import { FormInputDropdown } from "../../fields/FormInputDropdown";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

const PieChartCard = ({
  tableNameList,
  columnList,
  activeTableIndex,
  activeColIndex,
  selectTableHandler,
  selectColumnHandler,
}) => {
  const {
    formState: { errors },
    control,
  } = useForm();

  return (
    <Card
      sx={{
        textAlign: "center",
        paddingX: "30px",
        marginTop: "50px",
        backgroundColor: "#e8e8e8",
        boxShadow: "0 8px 20px -6px #f7f7f7",
        ":hover": { backgroundColor: "#f3f3f3" },
      }}
    >
      <div id="title">
        <h2>Pie Chart</h2>
      </div>
      <div id="dropdown">
        <FormInputDropdown
          name={"TableSelect"}
          control={control}
          label={"Select Table"}
          menuOptions={tableNameList}
          handleChange={event => selectTableHandler(event)}
          value={tableNameList[activeTableIndex].value}
        />
        <FormInputDropdown
          name={"ColumnSelect"}
          control={control}
          label={"Select Column"}
          menuOptions={columnList}
          handleChange={event => selectColumnHandler(event)}
          value={columnList[activeColIndex].value}
        />
      </div>
      <div id="chart">
        <ResponsivePieChart
          width={500}
          height={350}
          chartColor={"#e68209"}
          textColor1={"#e68209"}
          textColor2={"#fcba03"}
          tableName={tableNameList[activeTableIndex].value}
          colName={columnList[activeColIndex].value}
        />
      </div>
    </Card>
  );
};

export default PieChartCard;
