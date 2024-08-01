import React from 'react';
import { Radar } from 'react-chartjs-2';
import { useAppSelector } from '../../store/hooks';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ResponseData } from '../../store/reducers/dataSlice';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const SentimateDistrubution: React.FC = () => {
  const data = useAppSelector((state) => state.data.data) as ResponseData[];

  // Process data to get counts for each sentiment
  const sentimentCounts = {
    Positive: 0,
    Neutral: 0,
    Negative: 0,
  };

  data.forEach((response) => {
    if (response.Sentiment in sentimentCounts) {
      sentimentCounts[response.Sentiment]++;
    }
  });

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Responses',
        data: [
          sentimentCounts.Positive,
          sentimentCounts.Neutral,
          sentimentCounts.Negative,
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: Math.max(
          sentimentCounts.Positive,
          sentimentCounts.Neutral,
          sentimentCounts.Negative
        ),
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6">SentimateDistrubution</Typography>
      <Box sx={{ width: '100%', height: '400px' }}>
        <Radar data={chartData} options={options} />
      </Box>
    </Box>
  );
};

export default SentimateDistrubution;
