import React from "react";
import ResponsivePieChart from "./ResponsivePieChart";
import { FormInputDropdown } from "../../fields/FormInputDropdown";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

const PieChartCard = ({
  tableList,
  columnList,
  valueList,
  relTableList,
  relColList,
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
        <p style={{ fontSize: "1.5em" }}>Select Dataset</p>
      </div>
      <div id="dropdown-row-1">
        <FormInputDropdown
          name={"TableSelect"}
          control={control}
          label={"Select Table"}
          menuOptions={tableList}
          handleChange={event => {
            selectHandler("pie", tableList, "tableIndex", event);
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
            selectHandler("pie", columnList, "colIndex", event)
          }
          value={columnList[indexes.colIndex].value}
        />
        <FormInputDropdown
          name={"ValueColumnSelect"}
          control={control}
          label={"Select Value"}
          menuOptions={valueList}
          handleChange={event =>
            selectHandler("pie", valueList, "valIndex", event)
          }
          value={valueList[indexes.valIndex].value}
        />
      </div>
      <div id="dropdown-row-2">
        <FormInputDropdown
          name={"RelTableSelect"}
          control={control}
          label={"Select Relation Table"}
          menuOptions={relTableList}
          handleChange={event =>
            selectHandler("pie", relTableList, "relTableIndex", event)
          }
          value={relTableList[indexes.relTableIndex].value}
        />
        <FormInputDropdown
          name={"RelColSelect"}
          control={control}
          label={"Select Relation Column"}
          menuOptions={relColList}
          handleChange={event => {
            selectHandler("pie", relColList, "relColIndex", event);
          }}
          value={relColList[indexes.relColIndex].value}
        />
      </div>
      <div id="chart">
        <ResponsivePieChart
          width={700}
          height={450}
          subTextColor={"#3a3a3b"}
          tableName={tableList[indexes.tableIndex].value}
          colName={columnList[indexes.colIndex].value}
          valName={valueList[indexes.valIndex].value}
          relTableName={relTableList[indexes.relTableIndex].value}
          relColName={relColList[indexes.relColIndex].value}
          chartData={chartData[String(relColList[indexes.relColIndex].value)]}
        />
      </div>
    </Card>
  );
};

export default PieChartCard;
