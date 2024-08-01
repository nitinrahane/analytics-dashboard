import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './DataDisplay.scss';

const DataDisplay: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);

  return (
    <div className="data-display">
      <h2>Uploaded Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DataDisplay;
