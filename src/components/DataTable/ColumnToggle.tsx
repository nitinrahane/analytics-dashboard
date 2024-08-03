import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { SurveyResponse } from '@interfaces';

interface ColumnToggleProps {
  columns: Array<keyof SurveyResponse>;
  columnsVisible: { [key: string]: boolean };
  anchorEl: HTMLElement | null;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onToggleColumn: (column: keyof SurveyResponse) => void;
}

const ColumnToggle: React.FC<ColumnToggleProps> = ({ columns, columnsVisible, anchorEl, onClick, onClose, onToggleColumn }) => (
  <>
    <Button
      variant="outlined"
      startIcon={<ViewColumnIcon />}
      onClick={onClick}
    >
      Columns
    </Button>
    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onClose}>
      {columns.map((column) => (
        <MenuItem key={column} onClick={() => onToggleColumn(column)}>
          <input
            type="checkbox"
            checked={columnsVisible[column] !== false}
            onChange={() => onToggleColumn(column)}
          />
          {column}
        </MenuItem>
      ))}
    </Menu>
  </>
);

export default ColumnToggle;
