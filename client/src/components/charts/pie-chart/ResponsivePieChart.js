import React, { useCallback, useState } from "react";
import { PieChart, Pie } from "recharts";
import ActivePieShape from "./ActivePieShape";
import { pieChartColors } from "../../../state/data_structures/chartState";
import { capitalizeWord, titleCase } from "../../../helpers/chartFormHelpers";

const ResponsivePieChart = ({
  width,
  height,
  subTextColor,
  tableName,
  colName,
  valName,
  relTableName,
  relColName,
  chartData,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const sectorName = capitalizeWord(relTableName);

  const chartTitle = `${capitalizeWord(tableName)}, ${titleCase(
    colName
  )}: '${valName}',
  categorized by
  ${sectorName}: '${capitalizeWord(relColName)}'`;

  return (
    <>
      <div id="chart-title">
        <h2
          style={{
            whiteSpace: "pre-line",
            textAlign: "center",
            // textAlign: "left",
            // marginLeft: "17%",
            lineHeight: "2em",
          }}
        >
          {chartTitle}
        </h2>
      </div>
      <div id="pie-chart">
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={
              <ActivePieShape
                chartColors={pieChartColors}
                subTextColor={subTextColor}
                activeIndex={activeIndex}
                sectorName={sectorName}
              />
            }
            data={chartData}
            cx={width / 2}
            cy={height / 2}
            innerRadius={100}
            outerRadius={140}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </div>
    </>
  );
};
export default ResponsivePieChart;
