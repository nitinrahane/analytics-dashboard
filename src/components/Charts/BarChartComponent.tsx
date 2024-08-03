import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

interface BarChartComponentProps {
  data: any;
}

export const BarChartComponent: React.FC<BarChartComponentProps> = ({ data }) => (
  <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="count" fill="#8884d8" />
  </BarChart>
);

export default BarChartComponent;
