import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface LineChartComponentProps {
  data: any;
}

export const LineChartComponent: React.FC<LineChartComponentProps> = ({ data }) => (
  <LineChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="count" stroke="#8884d8" />
  </LineChart>
);

export default LineChartComponent;
