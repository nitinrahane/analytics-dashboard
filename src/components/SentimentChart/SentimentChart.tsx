import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../store/hooks';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './SentimentChart.scss';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SentimentChart: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);

  if (data.length === 0) {
    return <div>No data available for sentiment analysis.</div>;
  }

  const sentimentData = data.reduce(
    (acc, curr) => {
      if (curr.Sentiment === 'Positive') acc.positive++;
      if (curr.Sentiment === 'Neutral') acc.neutral++;
      if (curr.Sentiment === 'Negative') acc.negative++;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 }
  );

  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiments',
        data: [sentimentData.positive, sentimentData.neutral, sentimentData.negative],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
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
        text: 'Sentiment Analysis',
      },
    },
  };

  return (
    <div className="sentiment-chart">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default SentimentChart;
