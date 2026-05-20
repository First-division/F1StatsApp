import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/constants/api';
import type { DriverStanding } from '@/types/f1';

interface UseDriverStandingsResult {
  standings: DriverStanding[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDriverStandings(season: string = 'current'): UseDriverStandingsResult {
  const [standings, setStandings] = useState<DriverStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildApiUrl(`/${season}/driverStandings.json`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const list = data?.MRData?.StandingsTable?.StandingsLists?.[0]?.DriverStandings ?? [];
      setStandings(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch driver standings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [season]);

  return { standings, loading, error, refetch: fetchStandings };
}
