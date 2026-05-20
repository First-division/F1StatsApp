import { useState, useEffect } from 'react';
import { buildApiUrl } from '@/constants/api';
import type { Driver, Race, RaceResult } from '@/types/f1';

interface DriverDetails {
  driver: Driver | null;
  results: Array<Race & { Results: RaceResult[] }>;
}

interface UseDriverDetailsResult extends DriverDetails {
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useDriverDetails(
  driverId: string,
  season: string = 'current'
): UseDriverDetailsResult {
  const [driver, setDriver] = useState<Driver | null>(null);
  const [results, setResults] = useState<Array<Race & { Results: RaceResult[] }>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const [driverRes, resultsRes] = await Promise.all([
        fetch(buildApiUrl(`/drivers/${driverId}.json`)),
        fetch(buildApiUrl(`/${season}/drivers/${driverId}/results.json`)),
      ]);

      if (!driverRes.ok) throw new Error(`HTTP error ${driverRes.status}`);
      const driverData = await driverRes.json();
      setDriver(driverData?.MRData?.DriverTable?.Drivers?.[0] ?? null);

      if (resultsRes.ok) {
        const resultsData = await resultsRes.json();
        setResults(resultsData?.MRData?.RaceTable?.Races ?? []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch driver details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (driverId) fetchDetails();
  }, [driverId, season]);

  return { driver, results, loading, error, refetch: fetchDetails };
}
