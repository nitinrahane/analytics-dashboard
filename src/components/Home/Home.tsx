import React, { useState } from 'react';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import * as XLSX from 'xlsx';
import { useDispatch, useSelector } from 'react-redux';
import { ResponseData, setData } from '../../store/reducers/dataSlice';
import FileUpload from '../FileUpload/FileUpload';
import SentimentChart from '../SentimentChart/SentimentChart';
import EmotionChart from '../EmotionChart/EmotionChart';
import DataTable from '../DataTable/DataTable';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import './Home.scss';
import WordCloud from '../WordCloud/WordCloud';
import DataDisplay from '../DataDisplay/DataDisplay';
import SentimateDistrubution from '../SentimateDistrubution/SentimateDistrubution';
import RechartsRadarChart from '../RechartsRadarChart/RechartsRadarChart';
import EmotionChartChartjs from '../ChartjsComponents/EmotionChart/EmotionCharts';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const data = useSelector((state: any) => state.data.data);
  const [fileName, setFileName] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [view, setView] = useState<string>(''); // State to track the current view

  const handleFileSelect = (name: string, selectedFile: File) => {
    setFileName(name);
    setFile(selectedFile);
  };

  const handleSave = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: ResponseData[] = XLSX.utils.sheet_to_json(worksheet);
        dispatch(setData(json));
        setDataLoaded(true);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const renderContent = () => {
    if (!dataLoaded) return <Typography>Please upload and save a file to display content.</Typography>;
    switch (view) {
      case 'sentimentChart':
        return <SentimentChart />;
      case 'sentimateDistrubution':
        return <SentimateDistrubution />;
      case 'rechartsRadarChart':
        return <RechartsRadarChart />;
      case 'emotionChart':
        return <EmotionChart />;
      case 'emotionChartChartjs':
        return <EmotionChartChartjs />;
      case 'entityWordCloud':
        return <WordCloud type="entity" />;
      case 'themeWordCloud':
        return <WordCloud type="theme" />;
      case 'table':
        return <DataTable />;
      case 'raw':
        return <DataDisplay />;
      default:
        return <Typography>Select a view to display content.</Typography>;
    }
  };

  return (
    <Container className="home" maxWidth="xl">
      <Box className="header" display="flex" alignItems="center" gap={2} mb={2}>
        <Typography variant="h4">Analytics Dashboard</Typography>
        <FileUpload onFileSelect={handleFileSelect} />
        {fileName && (
          <Button variant="contained" startIcon={<SaveIcon />} onClick={handleSave}>
            Save
          </Button>
        )}
      </Box>
      <Box className="nav-buttons" display="flex" gap={2} mb={4}>
        {/* <Button variant="contained" onClick={() => setView('sentimentChart')}>Sentiment Chart</Button> */}
        <Button variant="contained" onClick={() => setView('rechartsRadarChart')}>Sentimate Distrubution</Button>
        {/* <Button variant="contained" onClick={() => setView('sentimateDistrubution')}>Sentimate Distrubution (Chartjs)</Button> */}
        <Button variant="contained" onClick={() => setView('emotionChart')}>Emotion Chart</Button>
        {/* <Button variant="contained" onClick={() => setView('emotionChartChartjs')}>Emotion Chartjs</Button> */}
        <Button variant="contained" onClick={() => setView('entityWordCloud')}>Entity Word Cloud</Button>
        <Button variant="contained" onClick={() => setView('themeWordCloud')}>Theme Word Cloud</Button>
        <Button variant="contained" onClick={() => setView('table')}>Table</Button>
        {/* <Button variant="contained" onClick={() => setView('raw')}>Raw Data</Button> */}
      </Box>
      <Box className="content" display="flex" justifyContent="center" alignItems="center" flexGrow={1} textAlign="center">
        {renderContent()}
      </Box>
    </Container>
  );
};

export default Home;
