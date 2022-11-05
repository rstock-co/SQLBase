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

  const chartTitle = `${
    tableName.charAt(0).toUpperCase() + tableName.slice(1)
  }, categorized by "${colName.charAt(0).toUpperCase() + colName.slice(1)}"`;
  // const chartTitle = titleString.replace(/(^\w{1})|(\s+\w{1})/g, letter =>
  //   letter.toUpperCase()
  // );

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
