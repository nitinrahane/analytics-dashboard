import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export const fetchData = async () => {
  const response = await axios.get(`${API_BASE_URL}/data`);
  return response.data;
};

export const downloadFile = async () => {
  const response = await axios.get(`${API_BASE_URL}/download`, {
    responseType: 'blob'
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;
  a.download = 'survey_data.xlsx';
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
};
