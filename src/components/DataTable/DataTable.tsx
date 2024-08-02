import React, { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Button, Menu, MenuItem, IconButton } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import GetAppIcon from '@mui/icons-material/GetApp';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import './DataTable.scss';
import { ResponseData } from '../../store/reducers/dataSlice';

const DataTable: React.FC = () => {
    const data = useAppSelector((state) => state.data.data);
    const [columnsVisible, setColumnsVisible] = useState<{ [key: string]: boolean }>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [density, setDensity] = useState<'compact' | 'normal' | 'comfortable'>('normal');

    if (data.length === 0) {
        return <div>No data available. Please upload a file.</div>;
    }

    const columns = Object.keys(data[0]) as Array<keyof ResponseData>;

    const handleColumnsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleColumnsClose = () => {
        setAnchorEl(null);
    };

    const handleToggleColumn = (column: keyof ResponseData) => {
        const existingState = { ...columnsVisible };
        existingState[column] = column in existingState ? !existingState[column] : false;
        setColumnsVisible(existingState);
    };

    const handleDensityChange = () => {
        setDensity((prev) => (prev === 'normal' ? 'compact' : prev === 'compact' ? 'comfortable' : 'normal'));
    };

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Responses');
        const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'responses.xlsx');
    };

    return (
        <div className="data-table">
            <div className="table-controls">
                <Button
                    variant="outlined"
                    startIcon={<ViewColumnIcon />}
                    className="table-button"
                    onClick={handleColumnsClick}
                >
                    Columns
                </Button>
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleColumnsClose}>
                    {columns.map((column) => (
                        <MenuItem key={column} onClick={() => handleToggleColumn(column)}>
                            <input
                                type="checkbox"
                                checked={columnsVisible[column] !== false}
                                onChange={() => handleToggleColumn(column)}
                            />
                            {column}
                        </MenuItem>
                    ))}
                </Menu>
                <Button
                    variant="outlined"
                    startIcon={<DensityMediumIcon />}
                    className="table-button"
                    onClick={handleDensityChange}
                >
                    Density
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<GetAppIcon />}
                    className="table-button"
                    onClick={handleExport}
                >
                    Export
                </Button>
            </div>
            <div className='table-container'>
                <table className={density}>
                    <thead>
                        <tr>
                            {columns.map(
                                (column) =>
                                    columnsVisible[column] !== false && <th key={column}>{column}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
                                {columns.map(
                                    (column) =>
                                        columnsVisible[column] !== false && <td key={column}>{row[column]}</td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default DataTable;
