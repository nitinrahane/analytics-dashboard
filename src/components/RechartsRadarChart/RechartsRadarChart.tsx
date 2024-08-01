import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';
import { useAppSelector } from '../../store/hooks';
import { ResponseData } from '../../store/reducers/dataSlice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const RechartsRadarChart: React.FC = () => {
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

  const chartData = [
    { subject: 'Positive', A: sentimentCounts.Positive },
    { subject: 'Neutral', A: sentimentCounts.Neutral },
    { subject: 'Negative', A: sentimentCounts.Negative },
  ];

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Typography variant="h6">Sentiment Distribution</Typography>
      <Box sx={{ width: '100%', height: '400px' }}>
        <RadarChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          width={400}
          height={400}
          data={chartData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={30} domain={[0, 5]} />
          <Radar
            name="Sentiments"
            dataKey="A"
            stroke="rgba(75, 192, 192, 1)"
            fill="rgba(75, 192, 192, 0.2)"
            fillOpacity={0.6}
          />
          <Tooltip />
          <Legend />
        </RadarChart>
      </Box>
    </Box>
  );
};

export default RechartsRadarChart;
