import { useState, useCallback } from 'react';
import { NetflixSummary, NetflixData } from '../types/netflix';
import { parseCSVFile } from '../utils/csvParser';
import { analyzeNetflixData } from '../utils/analyzeData';
import { ValidationError } from '../types/errors';

interface UseNetflixDataReturn {
  summary: NetflixSummary | null;
  rawData: NetflixData[] | null;
  loading: boolean;
  error: string | null;
  handleFileSelect: (file: File) => Promise<void>;
  resetData: () => void;
}

export const useNetflixData = (): UseNetflixDataReturn => {
  const [summary, setSummary] = useState<NetflixSummary | null>(null);
  const [rawData, setRawData] = useState<NetflixData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = useCallback(async (file: File) => {
    setLoading(true);
    setError(null);
    try {
      const data: NetflixData[] = await parseCSVFile(file);
      const analyzedData = analyzeNetflixData(data);
      setRawData(data);
      setSummary(analyzedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperat processant el fitxer');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetData = useCallback(() => {
    setSummary(null);
    setRawData(null);
    setError(null);
  }, []);

  return {
    summary,
    rawData,
    loading,
    error,
    handleFileSelect,
    resetData
  };
};