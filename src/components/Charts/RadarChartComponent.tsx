import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';

interface RadarChartComponentProps {
  data: any;
}

export const RadarChartComponent: React.FC<RadarChartComponentProps> = ({ data }) => (
  <RadarChart outerRadius={150} width={500} height={400} data={data}>
    <PolarGrid />
    <PolarAngleAxis dataKey="name" />
    <Radar name="Responses" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    <Legend />
    <Tooltip />
  </RadarChart>
);

export default RadarChartComponent;
