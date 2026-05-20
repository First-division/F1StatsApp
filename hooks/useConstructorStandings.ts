import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/constants/api';
import type { ConstructorStanding } from '@/types/f1';

interface UseConstructorStandingsResult {
  standings: ConstructorStanding[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useConstructorStandings(season: string = 'current'): UseConstructorStandingsResult {
  const [standings, setStandings] = useState<ConstructorStanding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildApiUrl(`/${season}/constructorStandings.json`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const list =
        data?.MRData?.StandingsTable?.StandingsLists?.[0]?.ConstructorStandings ?? [];
      setStandings(list);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch constructor standings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [season]);

  return { standings, loading, error, refetch: fetchStandings };
}
