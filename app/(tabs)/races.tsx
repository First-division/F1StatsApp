import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useRaceSchedule } from '@/hooks/useRaceSchedule';
import { RaceCard } from '@/components/RaceCard';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorView } from '@/components/ErrorView';
import { CURRENT_SEASON } from '@/constants/api';

type Filter = 'all' | 'upcoming' | 'past';

export default function RacesScreen() {
  const [season] = useState('current');
  const [filter, setFilter] = useState<Filter>('all');
  const { races, loading, error, refetch } = useRaceSchedule(season);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextRaceIndex = useMemo(
    () => races.findIndex((r) => new Date(r.date) >= today),
    [races]
  );

  const filteredRaces = useMemo(() => {
    if (filter === 'upcoming') return races.filter((r) => new Date(r.date) >= today);
    if (filter === 'past') return races.filter((r) => new Date(r.date) < today);
    return races;
  }, [races, filter]);

  if (loading && races.length === 0) {
    return <LoadingSpinner message="Loading race schedule..." />;
  }

  if (error && races.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {/* Filter Tabs */}
      <View style={styles.filterRow}>
        {(['all', 'upcoming', 'past'] as Filter[]).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredRaces}
        keyExtractor={(item) => `${item.season}-${item.round}`}
        renderItem={({ item }) => {
          const raceDate = new Date(item.date);
          const isPast = raceDate < today;
          const isNext =
            filter !== 'past' &&
            races[nextRaceIndex]?.round === item.round &&
            races[nextRaceIndex]?.season === item.season;
          return <RaceCard race={item} isNext={isNext} isPast={isPast} />;
        }}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={Colors.primary} />
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            {CURRENT_SEASON} · {filteredRaces.length} Races
          </Text>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  filterTextActive: {
    color: Colors.text,
  },
  list: {
    paddingBottom: 24,
    paddingTop: 4,
  },
  listHeader: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
