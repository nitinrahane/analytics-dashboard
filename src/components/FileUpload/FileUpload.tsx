import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { useDispatch } from 'react-redux';
import { setData } from '../../store/reducers/dataSlice';
import Button from '@mui/material/Button';
import './FileUpload.scss';

interface FileUploadProps {
  onFileSelect: (fileName: string, file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      onFileSelect(selectedFile.name, selectedFile);
    }
  };

  return (
    <div className="file-upload">
      <input
        accept=".xlsx, .xls"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        onChange={handleFileUpload}
      />
      <label htmlFor="raised-button-file">
        <Button variant="contained" component="span" size='large'>
          Upload File
        </Button>
      </label>
      {file && <p>{file.name}</p>}
    </div>
  );
};

export default FileUpload;
