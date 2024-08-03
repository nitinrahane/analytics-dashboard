import React from 'react';
import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  Legend,
} from 'recharts';

interface RadialBarChartComponentProps {
  data: any;
}

export const RadialBarChartComponent: React.FC<RadialBarChartComponentProps> = ({ data }) => (
  <RadialBarChart width={730} height={400} innerRadius="10%" outerRadius="80%" data={data} startAngle={180} endAngle={0}>
    <RadialBar fill="#8884d8" label={{ fill: '#fff', position: 'insideStart' }} background dataKey="count" />
    <Legend iconSize={10} layout="horizontal" verticalAlign="bottom" align="center" />
    <Tooltip />
  </RadialBarChart>
);

export default RadialBarChartComponent;
