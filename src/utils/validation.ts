import { ValidationError } from '../types/errors';

const CSV_MIME_TYPES = [
  'text/csv',
  'application/csv',
  'text/x-csv',
  'application/x-csv',
  'text/comma-separated-values',
  'text/x-comma-separated-values',
  'application/vnd.ms-excel'
] as const;

export const validateCSVFile = (file: File): void => {
  if (!isValidCSVFile(file)) {
    throw new ValidationError('Si us plau, selecciona un fitxer CSV vàlid');
  }
};

export const isValidCSVFile = (file: File): boolean => {
  return CSV_MIME_TYPES.includes(file.type as any) || 
         file.name.toLowerCase().endsWith('.csv');
};

export const validateDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  if (isNaN(date.getTime())) {
    throw new ValidationError(`Data invàlida: ${dateStr}`);
  }
  return date;
};