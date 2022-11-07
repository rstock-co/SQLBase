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

import { initialBarChartData } from "../../../state/data_structures/chartState"; // delete this when ready

const ResponsiveBarChart = ({
  width,
  height,
  barSize,
  lineColor,
  barColor,
  areaColor,
  chartData,
}) => {
  return (
    <div style={{ width: width, height: height }}>
      <ResponsiveContainer>
        <ComposedChart
          width={width - 100}
          height={height + 100}
          data={initialBarChartData} // change to "chartData" when ready
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#d9d1ff" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Area
            type="monotone"
            dataKey="amt"
            fill={areaColor}
            stroke={areaColor}
          />
          <Bar dataKey="pv" barSize={barSize} fill={barColor} />
          <Line type="monotone" dataKey="uv" stroke={lineColor} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponsiveBarChart;
