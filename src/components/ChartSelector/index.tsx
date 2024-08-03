import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ChartType } from '@constants/chartTypes';
import './ChartSelector.scss';

interface ChartSelectorProps {
  chartType: ChartType;
  onChange: (event: SelectChangeEvent<ChartType>) => void;
}

export const ChartSelector: React.FC<ChartSelectorProps> = ({ chartType, onChange }) => (
  <FormControl className="chart-select">
    <InputLabel id="chart-type-label">Chart Type</InputLabel>
    <Select
      labelId="chart-type-label"
      id="chart-type"
      value={chartType}
      onChange={onChange}
      label="Chart Type"
    >
      {Object.values(ChartType).map((type) => (
        <MenuItem key={type} value={type}>
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default ChartSelector;
