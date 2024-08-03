import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { COLORS } from '@constants/colors';

interface PieChartComponentProps {
  data: any;
}

export const PieChartComponent: React.FC<PieChartComponentProps> = ({ data }) => (
  <PieChart width={400} height={400}>
    <Pie data={data} dataKey="count" nameKey="name" outerRadius={150} fill="#8884d8" label>
      {data.map((entry: any, index: number) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
);

export default PieChartComponent;
