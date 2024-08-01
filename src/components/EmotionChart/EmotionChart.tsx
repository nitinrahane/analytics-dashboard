import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useAppSelector } from '../../store/hooks';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './EmotionChart.scss';

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

const emotions = ['All', 'Happiness', 'Sadness', 'Anger', 'Others'] as const;
type EmotionType = (typeof emotions)[number];

const emotionColors: Record<Exclude<EmotionType, 'All'>, string> = {
  Happiness: 'rgba(75, 192, 192, 1)',
  Sadness: 'rgba(54, 162, 235, 1)',
  Anger: 'rgba(255, 99, 132, 1)',
  Others: 'rgba(153, 102, 255, 1)',
};

const EmotionChart: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);
  const [selectedEmotion, setSelectedEmotion] = useState<EmotionType>(emotions[0]);

  if (data.length === 0) {
    return <div>No data available for emotion analysis.</div>;
  }

  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedEmotion(event.target.value as EmotionType);
  };

  const getEmotionData = (emotion: EmotionType) => {
    const filteredData = emotion === 'All' ? data : data.filter((item) => item.Emotion === emotion);
    // Generate indices for x-axis (e.g., [1, 2, 3, ...]) as placeholders
    const indices = filteredData.map((_, index) => index + 1);
    // Extract the 'Score' field for y-axis values
    const emotionScores = filteredData.map((item) => item.Score);
    return { indices, emotionScores };
  };

  const datasets = selectedEmotion === 'All'
    ? emotions.filter(e => e !== 'All').map((emotion) => {
        const { indices, emotionScores } = getEmotionData(emotion);
        return {
          label: emotion,
          data: emotionScores,
          borderColor: emotionColors[emotion],
          fill: false,
          tension: 0.2, // Adjust tension for smooth curves
        };
      })
    : [{
        label: selectedEmotion,
        data: getEmotionData(selectedEmotion).emotionScores,
        borderColor: emotionColors[selectedEmotion],
        fill: false,
        tension: 0.4, // Adjust tension for smooth curves
      }];

  const chartData = {
    // Use indices for x-axis labels
    labels: Array.from({ length: Math.max(...datasets.map(d => d.data.length)) }, (_, i) => i + 1),
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Responses by ${selectedEmotion}`,
      },
    },
  };

  return (
    <div className="emotion-chart">
      <FormControl variant="outlined" className="chart-controls">
        <InputLabel id="emotion-select-label">Select Emotion</InputLabel>
        <Select
          labelId="emotion-select-label"
          id="emotion-select"
          value={selectedEmotion}
          onChange={handleChange}
          label="Select Emotion"
        >
          {emotions.map((emotion) => (
            <MenuItem key={emotion} value={emotion}>
              {emotion}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <div className="chart-container">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default EmotionChart;
