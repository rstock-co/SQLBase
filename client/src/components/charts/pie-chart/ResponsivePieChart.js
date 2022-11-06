import React, { useCallback, useState } from "react";
import { PieChart, Pie } from "recharts";
import ActivePieShape from "./ActivePieShape";
import {
  pieChartData,
  pieChartColors,
} from "../../../state/data_structures/chartState";

const ResponsivePieChart = ({
  width,
  height,
  subTextColor,
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

  const chartTitle = `${
    tableName.charAt(0).toUpperCase() + tableName.slice(1)
  }, categorized by "${colName.charAt(0).toUpperCase() + colName.slice(1)}"`;

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
              <ActivePieShape
                chartColors={pieChartColors}
                subTextColor={subTextColor}
                activeIndex={activeIndex}
              />
            }
            data={pieChartData}
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
