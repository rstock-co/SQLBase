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

const yAxisFormatter = value =>
  `$${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

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
  const chartTitle = `Financial Report for: ${companyName}`;

  return (
    <>
      <div id="chart-title">
        <h1
          style={{
            whiteSpace: "pre-line",
            textAlign: "center",
            // textAlign: "left",
            // marginLeft: "17%",
            lineHeight: "2em",
            color: "#383838",
          }}
        >
          {chartTitle}
        </h1>
      </div>
      <div style={{ width: width, height: height }}>
        <ResponsiveContainer>
          <ComposedChart
            width={width - 150}
            height={height + 100}
            data={chartData} // change to "chartData" when ready
            margin={{
              top: 20,
              right: 40,
              bottom: 50,
              left: 100,
            }}
          >
            <CartesianGrid stroke="#d9d1ff" />
            <XAxis
              dataKey="year"
              type="number"
              domain={["dataMin", "dataMax"]}
              padding={{ left: 20 }}
              tick={{
                fontSize: 25,
                fontWeight: "600",
                fill: "#383838",
              }}
              dy={10}
            />
            <YAxis
              tickFormatter={yAxisFormatter}
              tick={{ fontSize: 22, fontWeight: "600", fill: "#383838" }}
              dx={-10}
            />
            <Tooltip
              formatter={value => {
                return `$${value
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
              }}
            />
            <Legend
              wrapperStyle={{
                fontSize: "1.5em",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                paddingTop: "40px",
                marginTop: "50px",
                border: "2px",
                borderColor: "#d9d1ff",
              }}
              iconSize={25}
            />
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
