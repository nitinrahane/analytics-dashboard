import React, { useState, useMemo } from 'react';
import { useAppSelector } from '@store/hooks';
import { SelectChangeEvent, Box } from '@mui/material';
import { ChartType } from '@constants/chartTypes';
import { ChartSelector } from '@components/ChartSelector';
import { SurveyResponse, EmotionCount } from '@interfaces/index';
import RadarChartComponent from '@components/Charts/RadarChartComponent';
import BarChartComponent from '@components/Charts/BarChartComponent';
import LineChartComponent from '@components/Charts/LineChartComponent';
import PieChartComponent from '@components/Charts/PieChartComponent';
import RadialBarChartComponent from '@components/Charts/RadialBarChartComponent';
import AreaChartComponent from '@components/Charts/AreaChartComponent';
import './EmotionChart.scss';

const EmotionChart: React.FC = () => {
  const data = useAppSelector((state) => state.data.data) as SurveyResponse[];
  const [chartType, setChartType] = useState<ChartType>(ChartType.Radar);

  const handleChange = (event: SelectChangeEvent<ChartType>) => {
    setChartType(event.target.value as ChartType);
  };

  const emotionCounts: EmotionCount = useMemo(() => {
    const counts: EmotionCount = {
      Happiness: 0,
      Sadness: 0,
      Anger: 0,
      Other: 0,
    };

    data.forEach((item) => {
      if (item.Emotion in counts) {
        counts[item.Emotion]++;
      } else {
        counts.Other++;
      }
    });

    return counts;
  }, [data]);

  const chartData = useMemo(() => {
    return Object.keys(emotionCounts).map((emotion) => ({
      name: emotion,
      count: emotionCounts[emotion],
      fill: '#8884d8',
    }));
  }, [emotionCounts]);

  const renderChart = () => {
    switch (chartType) {
      case ChartType.Radar:
        return <RadarChartComponent data={chartData} />;
      case ChartType.Bar:
        return <BarChartComponent data={chartData} />;
      case ChartType.Line:
        return <LineChartComponent data={chartData} />;
      case ChartType.Pie:
        return <PieChartComponent data={chartData} />;
      case ChartType.RadialBar:
        return <RadialBarChartComponent data={chartData} />;
      case ChartType.Area:
        return <AreaChartComponent data={chartData} />;
      default:
        return <RadarChartComponent data={chartData} />;
    }
  };

  return (
    <Box className="emotion-chart">
      <ChartSelector chartType={chartType} onChange={handleChange} />
      <Box className="chart-container">
        {renderChart()}
      </Box>
    </Box>
  );
};

export default EmotionChart;
