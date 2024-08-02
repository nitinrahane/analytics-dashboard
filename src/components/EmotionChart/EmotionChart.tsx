import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  AreaChart,
  Area,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Typography } from '@mui/material';
import './EmotionChart.scss';

const EmotionChart: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);
  const [chartType, setChartType] = useState<string>('radar');

  const handleChange = (event: SelectChangeEvent<string>) => {
    setChartType(event.target.value);
  };

  // Prepare data for the charts
  const emotionCounts: { [key: string]: number } = {
    Happiness: 0,
    Sadness: 0,
    Anger: 0,
    Other: 0,
  };

  data.forEach((item) => {
    if (item.Emotion in emotionCounts) {
      emotionCounts[item.Emotion]++;
    } else {
      emotionCounts.Other++;
    }
  });

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const chartData = Object.keys(emotionCounts).map((emotion) => ({
    name: emotion,
    count: emotionCounts[emotion],
    fill:'#8884d8',
  }));



  const renderChart = () => {
    switch (chartType) {
      case 'radar':
        return (
          <RadarChart outerRadius={150} width={500} height={400} data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar name="Responses" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
            <Tooltip />
          </RadarChart>
        );
      case 'bar':
        return (
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        );
      case 'line':
        return (
          <LineChart width={500} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        );
      case 'pie':
        return (
          <PieChart width={400} height={400}>
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="name"            
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'radialBar':
        return (       
            <RadialBarChart
                width={730}
                height={250}
                innerRadius="10%"
                outerRadius="80%"
                data={chartData}
                startAngle={180}
                endAngle={0}
            >
                <RadialBar  fill="#8884d8" label={{ fill: '#fff', position: 'insideStart' }} background dataKey="count" />
                <Legend iconSize={10}  layout='horizontal' verticalAlign='bottom' align="center"  />
                <Tooltip />
            </RadialBarChart>
        );
      case 'area':
        return (
          <AreaChart width={500} height={300} data={chartData}>
            <defs>
              <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="count" stroke="#8884d8" fillOpacity={1} fill="url(#colorCount)" />
          </AreaChart>
        );
      default:
        return <RadarChart outerRadius={150} width={500} height={400} data={chartData} />;
    }
  };

  return (
    <Box className="emotion-chart">
      <Typography variant="h6" className="chart-title">
        Responses Distribution by Emotion
      </Typography>
      <FormControl className="chart-select">
        <InputLabel id="chart-type-label">Chart Type</InputLabel>
        <Select
          labelId="chart-type-label"
          id="chart-type"
          value={chartType}
          onChange={handleChange}
          label="Chart Type"
        >
          <MenuItem value="radar">Radar</MenuItem>
          <MenuItem value="bar">Bar</MenuItem>
          <MenuItem value="line">Line</MenuItem>
          <MenuItem value="pie">Pie</MenuItem>
          <MenuItem value="radialBar">Radial Bar</MenuItem>
          <MenuItem value="area">Area</MenuItem>
        </Select>
      </FormControl>
      <Box className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </Box>
      {/* <Box className="chart-legend">
        {chartData.map((entry, index) => (
          <Box key={`legend-${index}`} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
            <Typography>{entry.name}</Typography>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default EmotionChart;
