import * as React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
  } from "recharts";

export interface ChartProps {
    data: any;
}

const Chart = ({data} : ChartProps) => {
    return (
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[20, 26]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="aTechStockPrice" stroke="#8884d8" />
        <Line type="monotone" dataKey="bTechStockPrice" stroke="#82ca9d" />
      </LineChart>
    )
}

export default Chart;