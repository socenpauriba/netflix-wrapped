import Papa from 'papaparse';
import { NetflixData } from '../types/netflix';
import { ValidationError } from '../types/errors';
import { parseDate, isCurrentYear } from './dateUtils';

export const parseCSVFile = (file: File): Promise<NetflixData[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        try {
          const netflixData: NetflixData[] = results.data
            .filter((row: any) => {
              if (!row.Title || !row.Date) return false;
              return isCurrentYear(row.Date);
            })
            .map((row: any) => {
              const titleParts = parseTitleParts(row.Title);
              const date = parseDate(row.Date);

              return {
                title: row.Title,
                date,
                ...titleParts
              };
            });

          if (!netflixData.length) {
            throw new ValidationError(`No s'han trobat dades del ${new Date().getFullYear()} al fitxer`);
          }

          resolve(netflixData);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => {
        reject(new ValidationError(`Error processant el fitxer: ${error.message}`));
      }
    });
  });
};

const parseTitleParts = (title: string) => {
  const parts: { series?: string; season?: string; episode?: string } = {};
  const segments = title.split(': ');

  if (segments.length > 1) {
    if (segments[1].includes('Miniserie') || segments[1].includes('Limited Series')) {
      parts.series = `${segments[0]}: ${segments[1]}`;
      parts.episode = segments[2];
    } else if (segments[1].includes('Temporada')) {
      parts.series = segments[0];
      parts.season = segments[1];
      parts.episode = segments[2];
    } else {
      parts.series = segments[0];
      parts.episode = segments[1];
    }
  }

  return parts;
};