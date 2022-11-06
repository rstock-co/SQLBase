import React from "react";
import ResponsivePieChart from "./ResponsivePieChart";
import { FormInputDropdown } from "../../fields/FormInputDropdown";
import { useForm } from "react-hook-form";
import { Card } from "@mui/material";

const PieChartCard = ({
  tableList,
  columnList,
  valueList,
  relationList,
  activeTableIndex,
  activeColIndex,
  activeValueIndex,
  activeRelIndex,
  selectTableHandler,
  selectColumnHandler,
  selectValueHandler,
  selectRelHandler,
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
      <div id="dropdown-row-1">
        <FormInputDropdown
          name={"TableSelect"}
          control={control}
          label={"Select Table"}
          menuOptions={tableList}
          handleChange={event => selectTableHandler(event)}
          value={tableList[activeTableIndex].value}
        />
        <FormInputDropdown
          name={"ColumnSelect"}
          control={control}
          label={"Select Column"}
          menuOptions={columnList}
          handleChange={event => selectColumnHandler(event)}
          value={columnList[activeColIndex].value}
        />
        <FormInputDropdown
          name={"ValueColumnSelect"}
          control={control}
          label={"Select Value"}
          menuOptions={valueList}
          handleChange={event => selectValueHandler(event)}
          value={valueList[activeValueIndex].value}
        />
      </div>
      <div id="dropdown-row-2">
        <FormInputDropdown
          name={"RelationSelect"}
          control={control}
          label={"Select Relation"}
          menuOptions={relationList}
          handleChange={event => selectRelHandler(event)}
          value={relationList[activeRelIndex].value}
        />
        {/* <FormInputDropdown
          name={"ColumnSelect"}
          control={control}
          label={"Select Column"}
          menuOptions={columnList}
          handleChange={event => selectColumnHandler(event)}
          value={columnList[activeColIndex].value}
        />
        <FormInputDropdown
          name={"ValueColumnSelect"}
          control={control}
          label={"Select Value"}
          menuOptions={valueList}
          handleChange={event => selectValueHandler(event)}
          value={valueList[activeValueIndex].value}
        /> */}
      </div>
      <div id="chart">
        <ResponsivePieChart
          width={500}
          height={350}
          chartColor={"#e68209"}
          textColor1={"#e68209"}
          textColor2={"#fcba03"}
          tableName={tableList[activeTableIndex].value}
          colName={columnList[activeColIndex].value}
        />
      </div>
    </Card>
  );
};

export default PieChartCard;
