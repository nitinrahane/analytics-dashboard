import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from 'react-redux';
import { setData } from '../../store/reducers/dataSlice';
import EmotionChart from '../EmotionChart/EmotionChart';
import DataTable from '../DataTable/DataTable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import WordCloud from '../WordCloud/WordCloud';
import RechartsRadarChart from '../RechartsRadarChart/RechartsRadarChart';
import { fetchData } from '../../services/apiService';
import './Home.scss';

const Home: React.FC = () => {
  const dispatch = useDispatch(); 
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('table');

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
      case 'rechartsRadarChart':
        return <RechartsRadarChart />;
      case 'emotionChart':
        return <EmotionChart />;
      case 'entityWordCloud':
        return <WordCloud type="entity" />;
      case 'themeWordCloud':
        return <WordCloud type="theme" />;
      case 'table':
        return <DataTable />;
      default:
        return <Typography>Select a view to display content.</Typography>;
    }
  };

  return (
    <Container className="home" maxWidth="xl">
      <Box className="header" display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h4">Analytics Dashboard</Typography>       
      </Box>
      <Box className="nav-buttons" display="flex" gap={2} mb={4}>        
        <Button variant="contained" onClick={() => setView('rechartsRadarChart')}>Sentimate Distrubution</Button>        
        <Button variant="contained" onClick={() => setView('emotionChart')}>Emotion Chart</Button>        
        <Button variant="contained" onClick={() => setView('entityWordCloud')}>Entity Word Cloud</Button>
        <Button variant="contained" onClick={() => setView('themeWordCloud')}>Theme Word Cloud</Button>
        <Button variant="contained" onClick={() => setView('table')}>Table</Button>
      </Box>
      <Box className="content" display="flex" justifyContent="center" alignItems="center" flexGrow={1} textAlign="center">
        {renderContent()}
      </Box>
    </Container>
  );
};

export default Home;
