import { ValidationError } from '../types/errors';

export const parseDate = (dateStr: string): Date => {
  const [day, month, year] = dateStr.split('/').map(Number);
  // Convert 2-digit year to full year (24 -> 2024)
  const fullYear = year < 100 ? 2000 + year : year;
  const date = new Date(fullYear, month - 1, day);
  
  if (isNaN(date.getTime())) {
    throw new ValidationError(`Data invàlida: ${dateStr}`);
  }
  return date;
};

export const isCurrentYear = (dateStr: string): boolean => {
  const [, , year] = dateStr.split('/').map(Number);
  const fullYear = year < 100 ? 2000 + year : year;
  return fullYear === new Date().getFullYear();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ca-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};