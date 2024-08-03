import React, { useState } from 'react';
import { useAppSelector } from '@store/hooks';
import { Button } from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import { downloadFile } from '@services/apiService';
import { SurveyResponse } from '@interfaces';
import { Density } from '@constants/enums';
import ColumnToggle from './ColumnToggle';
import DensityControl from './DensityControl';
import './DataTable.scss';

const DataTable: React.FC = () => {
    const data = useAppSelector((state) => state.data.data);
    const [columnsVisible, setColumnsVisible] = useState<{ [key: string]: boolean }>({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [density, setDensity] = useState<Density>(Density.Normal);

    if (data.length === 0) {
        return <div>No data available. Please upload a file.</div>;
    }

    const columns = Object.keys(data[0]) as Array<keyof SurveyResponse>;

    const handleColumnsClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleColumnsClose = () => {
        setAnchorEl(null);
    };

    const handleToggleColumn = (column: keyof SurveyResponse) => {
        const existingState = { ...columnsVisible };
        existingState[column] = column in existingState ? !existingState[column] : false;
        setColumnsVisible(existingState);
    };

    const handleDensityChange = () => {
        setDensity((prev) =>
            prev === Density.Normal ? Density.Compact :
                prev === Density.Compact ? Density.Comfortable :
                    Density.Normal
        );
    };

    const handleExport = async () => {
        try {
            await downloadFile();
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="data-table">
            <div className="table-controls">
                <ColumnToggle
                    columns={columns}
                    columnsVisible={columnsVisible}
                    anchorEl={anchorEl}
                    onClick={handleColumnsClick}
                    onClose={handleColumnsClose}
                    onToggleColumn={handleToggleColumn}
                />
                <DensityControl density={density} onDensityChange={handleDensityChange} />
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
                            <tr key={index}>
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
