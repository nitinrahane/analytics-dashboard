import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setData } from '@store/reducers/dataSlice';
import EmotionChart from '@components/EmotionChart';
import DataTable from '@components/DataTable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WordCloud from '@components/WordCloud';
import SentimentDistribution from '@components/SentimentDistribution';
import { fetchData } from '@services/apiService';
import { View } from '@constants/enums';
import { COMPONENT_TITLES } from '@constants/titles';
import './Home.scss';


const Home: React.FC = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState<View>(View.Table);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchData();    
        dispatch(setData(data));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [dispatch]);

  const renderContent = () => {
    if (loading) return <Typography>Loading...</Typography>;
    switch (view) {
      case View.SentimentDistribution:
        return <SentimentDistribution />;
      case View.EmotionChart:
        return <EmotionChart />;
      case View.EntityWordCloud:
        return <WordCloud type="entity" />;
      case View.ThemeWordCloud:
        return <WordCloud type="theme" />;
      case View.Table:
        return <DataTable />;
      default:
        return <Typography>Select a view to display content.</Typography>;
    }
  };

  return (
    <Container className="home" maxWidth="xl">
      <Box className="header">
        <Typography variant="h4">Analytics Dashboard</Typography>       
      </Box>
      <Box className="nav-buttons">        
        <Button variant="contained" onClick={() => setView(View.SentimentDistribution)}>Sentiment Distribution</Button>        
        <Button variant="contained" onClick={() => setView(View.EmotionChart)}>Emotion Chart</Button>        
        <Button variant="contained" onClick={() => setView(View.EntityWordCloud)}>Entity Word Cloud</Button>
        <Button variant="contained" onClick={() => setView(View.ThemeWordCloud)}>Theme Word Cloud</Button>
        <Button variant="contained" onClick={() => setView(View.Table)}>Table</Button>
      </Box>
      <Box className="content">
        <Typography variant="h5" className="content-title">{COMPONENT_TITLES[view]}</Typography>
        {renderContent()}
      </Box>
    </Container>
  );
};

export default Home;
