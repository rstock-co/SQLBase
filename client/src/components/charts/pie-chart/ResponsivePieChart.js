import React, { useCallback, useState } from "react";
import { PieChart, Pie } from "recharts";
import ActivePieShape from "./ActivePieShape";
import { pieChartData } from "../../../state/data_structures/chartState";

const ResponsivePieChart = ({
  width,
  height,
  chartColor,
  textColor1,
  textColor2,
  tableName,
  colName,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  const chartTitle = `${tableName} - ${colName}`;

  return (
    <>
      <div id="chart-title">
        <h3>{chartTitle}</h3>
      </div>
      <div id="pie-chart">
        <PieChart width={width} height={height}>
          <Pie
            activeIndex={activeIndex}
            activeShape={
              <ActivePieShape textColor1={textColor1} textColor2={textColor2} />
            }
            data={pieChartData}
            cx={width / 2}
            cy={height / 2}
            innerRadius={60}
            outerRadius={80}
            fill={chartColor}
            dataKey="value"
            onMouseEnter={onPieEnter}
          />
        </PieChart>
      </div>
    </>
  );
};
export default ResponsivePieChart;
