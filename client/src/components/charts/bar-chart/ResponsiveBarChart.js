import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// import { initialBarChartData } from "../../../state/data_structures/chartState"; // delete this when ready

const ResponsiveBarChart = ({
  width,
  height,
  barSize,
  lineColor,
  barColor,
  areaColor,
  chartData,
  companyName,
}) => {
  const chartTitle = `Financial Report for ${companyName}`;

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
      <div style={{ width: width, height: height }}>
        <ResponsiveContainer>
          <ComposedChart
            width={width - 100}
            height={height + 100}
            data={chartData} // change to "chartData" when ready
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 50,
            }}
          >
            <CartesianGrid stroke="#d9d1ff" />
            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin", "dataMax"]}
              padding={{ left: 19 }}
            />
            <YAxis />
            <Tooltip />
            <Legend wrapperStyle={{ fontSize: "25px" }} iconSize={25} />
            <Area
              type="monotone"
              dataKey={"annual_revenue"}
              fill={areaColor}
              stroke={"#5d59bd"}
            />
            <Bar
              dataKey={"annual_expenditures"}
              barSize={barSize}
              fill={barColor}
            />
            <Line
              type="monotone"
              dataKey={"total_assets"}
              stroke={lineColor}
              strokeWidth={2}
              dot={{ strokeWidth: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ResponsiveBarChart;
