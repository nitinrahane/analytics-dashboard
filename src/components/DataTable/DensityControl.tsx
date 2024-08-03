import React from 'react';
import { Button } from '@mui/material';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';

interface DensityControlProps {
  density: 'compact' | 'normal' | 'comfortable';
  onDensityChange: () => void;
}

const DensityControl: React.FC<DensityControlProps> = ({ density, onDensityChange }) => (
  <Button
    variant="outlined"
    startIcon={<DensityMediumIcon />}
    onClick={onDensityChange}
  >
    Density ({density})
  </Button>
);

export default DensityControl;
