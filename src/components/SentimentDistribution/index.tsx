import React, { useMemo } from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend,
} from 'recharts';
import { useAppSelector } from '@store/hooks';
import Box from '@mui/material/Box';
import './SentimentDistribution.scss';
import { SurveyResponse } from '@interfaces';

const SentimentDistribution: React.FC = () => {
  const data = useAppSelector((state) => state.data.data) as SurveyResponse[];

  const sentimentCounts = useMemo(() => {
    const counts = {
      Positive: 0,
      Neutral: 0,
      Negative: 0,
    };

    data.forEach((response) => {
      if (response.Sentiment in counts) {
        counts[response.Sentiment]++;
      }
    });

    return counts;
  }, [data]);

  const chartData = useMemo(
    () => [
      { subject: 'Positive', A: sentimentCounts.Positive },
      { subject: 'Neutral', A: sentimentCounts.Neutral },
      { subject: 'Negative', A: sentimentCounts.Negative },
    ],
    [sentimentCounts]
  );

  return (
    <Box className="sentiment-distribution">    
      <Box className="chart-container">
        <RadarChart outerRadius="80%" width={400} height={400} data={chartData}>
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

export default SentimentDistribution;
