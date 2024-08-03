import axios from 'axios';
import { API_BASE_URL } from '@config/index';

export const fetchData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/data`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const downloadFile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/download`, {
      responseType: 'blob',
    });
    createAndDownloadBlobFile(response.data, 'survey_data.xlsx');
  } catch (error) {
    console.error('Error downloading file:', error);
    throw error;
  }
};

const createAndDownloadBlobFile = (blobData: Blob, filename: string) => {
  const url = window.URL.createObjectURL(new Blob([blobData]));
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};