import React from 'react';
import { useAppSelector } from '../../store/hooks';
import './DataTable.scss';
import { ResponseData } from '../../store/reducers/dataSlice';

const DataTable: React.FC = () => {
  const data = useAppSelector((state) => state.data.data);

  if (data.length === 0) {
    return <div>No data available. Please upload a file.</div>;
  }
    
  const columns = Object.keys(data[0]) as Array<keyof ResponseData>;

  return (
    <div className="data-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={column}>{row[column]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
