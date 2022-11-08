import React from "react";
import ResponsiveBarChart from "./ResponsiveBarChart";
import { FormInputDropdown } from "../../fields/FormInputDropdown";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

const BarChartCard = ({
  tableList,
  columnList,
  valueList,
  indexes,
  setIndexes,
  selectHandler,
  chartData,
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
        marginTop: "90px",
        backgroundColor: "#e8e8e8",
        boxShadow: "0 8px 20px -6px #f7f7f7",
        ":hover": { backgroundColor: "#f3f3f3" },
      }}
    >
      <div id="title">
        <h2>Select Dataset</h2>
      </div>
      <div id="dropdown-row-1">
        <FormInputDropdown
          name={"TableSelect"}
          control={control}
          label={"Select Table"}
          menuOptions={tableList}
          handleChange={event => {
            selectHandler("bar", tableList, "tableIndex", event);
            setIndexes(prev => ({
              ...prev,
              colIndex: 0,
            }));
          }}
          value={tableList[indexes.tableIndex].value}
        />
        <FormInputDropdown
          name={"ColumnSelect"}
          control={control}
          label={"Select Column"}
          menuOptions={columnList}
          handleChange={event =>
            selectHandler("bar", columnList, "colIndex", event)
          }
          value={columnList[indexes.colIndex].value}
        />
        <FormInputDropdown
          name={"ValueColumnSelect"}
          control={control}
          label={"Select Value"}
          menuOptions={valueList}
          handleChange={event =>
            selectHandler("bar", valueList, "valIndex", event)
          }
          value={valueList[indexes.valIndex].value}
        />
      </div>
      <div id="chart">
        <ResponsiveBarChart
          width={1000}
          height={600}
          barSize={35}
          lineColor={"#ff7300"}
          barColor={"#413ea0"}
          areaColor={"#8884d8"}
          tableName={tableList[indexes.tableIndex].value}
          colName={columnList[indexes.colIndex].value}
          valName={valueList[indexes.valIndex].value}
          chartData={chartData}
        />
      </div>
    </Card>
  );
};

export default BarChartCard;
