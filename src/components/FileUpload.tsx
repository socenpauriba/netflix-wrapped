import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const isValidCSVFile = (file: File) => {
    const validTypes = [
      'text/csv',
      'application/csv',
      'text/x-csv',
      'application/x-csv',
      'text/comma-separated-values',
      'text/x-comma-separated-values',
      'application/vnd.ms-excel'
    ];
    return validTypes.includes(file.type) || file.name.toLowerCase().endsWith('.csv');
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const file = e.dataTransfer.files[0];
    if (file && isValidCSVFile(file)) {
      onFileSelect(file);
    } else {
      alert('Si us plau, selecciona un fitxer CSV vàlid');
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && isValidCSVFile(file)) {
      onFileSelect(file);
      // Reset the input value to allow selecting the same file again
      e.target.value = '';
    } else if (file) {
      alert('Si us plau, selecciona un fitxer CSV vàlid');
    }
  }, [onFileSelect]);

  return (
    <div
      className="w-full max-w-md p-8 border-2 border-dashed border-[#E50914] rounded-lg 
                 hover:border-[#831010] transition-colors duration-200 cursor-pointer
                 bg-white shadow-md"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".csv"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      <label
        htmlFor="file-upload"
        className="flex flex-col items-center justify-center space-y-4 cursor-pointer"
      >
        <Upload className="w-12 h-12 text-[#E50914]" />
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            Arrossega el teu fitxer CSV aquí
          </p>
          <p className="text-xs text-[#E50914] mt-2">
            o fes clic per seleccionar-lo
          </p>
        </div>
      </label>
    </div>
  );
};