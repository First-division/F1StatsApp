import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/constants/api';
import type { RaceResult, Race } from '@/types/f1';

interface UseRaceResultsResult {
  race: (Race & { Results: RaceResult[] }) | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useRaceResults(season: string, round: string): UseRaceResultsResult {
  const [race, setRace] = useState<(Race & { Results: RaceResult[] }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = buildApiUrl(`/${season}/${round}/results.json`);
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();
      const raceData = data?.MRData?.RaceTable?.Races?.[0] ?? null;
      setRace(raceData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch race results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (season && round) fetchResults();
  }, [season, round]);

  return { race, loading, error, refetch: fetchResults };
}
