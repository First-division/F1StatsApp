import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/constants/api';
import type { Race } from '@/types/f1';

interface UseRaceScheduleResult {
  races: Race[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRaceSchedule(season: string = 'current'): UseRaceScheduleResult {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedule = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildApiUrl(`/${season}.json`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const list: Race[] = data?.MRData?.RaceTable?.Races ?? [];
      setRaces(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch race schedule');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [season]);

  return { races, loading, error, refetch: fetchSchedule };
}
