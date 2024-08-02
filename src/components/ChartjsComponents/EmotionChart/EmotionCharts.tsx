import React, { useState } from 'react';

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar, Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Box, Typography } from '@mui/material';
import './EmotionChart.scss';
import { useAppSelector } from '../../../store/hooks';

ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Tooltip,
  Legend
);

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

  const chartData = {
    labels: Object.keys(emotionCounts),
    datasets: [
      {
        label: 'Responses',
        data: Object.values(emotionCounts),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const renderChart = () => {
    switch (chartType) {
      case 'radar':
        return <Radar data={chartData} />;
      case 'bar':
        return <Bar data={chartData} />;
      case 'line':
        return <Line data={chartData} />;
      case 'pie':
        return <Pie data={chartData} />;
      case 'doughnut':
        return <Doughnut data={chartData} />;
      case 'area':
        return (
          <Line
            data={chartData}
            options={{
              elements: {
                line: {
                  tension: 0.4,
                  fill: true,
                },
              },
            }}
          />
        );
      default:
        return <Radar data={chartData} />;
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
          <MenuItem value="doughnut">Radial Bar</MenuItem>
          <MenuItem value="area">Area</MenuItem>
        </Select>
      </FormControl>
      <Box className="chart-container">{renderChart()}</Box>
      {/* <Box className="chart-legend">
        {Object.keys(emotionCounts).map((emotion, index) => (
          <Box key={index} className="legend-item">
            <span className="legend-color" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></span>
            <Typography>{emotion}</Typography>
          </Box>
        ))}
      </Box> */}
    </Box>
  );
};

export default EmotionChart;