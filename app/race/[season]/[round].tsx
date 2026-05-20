import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useRaceResults } from '@/hooks/useRaceResults';
import { RaceResultRow } from '@/components/RaceResultRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorView } from '@/components/ErrorView';

export default function RaceDetailScreen() {
  const { season, round } = useLocalSearchParams<{ season: string; round: string }>();
  const { race, loading, error, refetch } = useRaceResults(season, round);

  if (loading && !race) {
    return <LoadingSpinner message="Loading race results..." />;
  }

  if (error && !race) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  if (!race) {
    return <ErrorView message="Race results not available yet." />;
  }

  const winner = race.Results?.[0];

  return (
    <>
      <Stack.Screen options={{ title: race.raceName }} />
      <FlatList
        data={race.Results ?? []}
        keyExtractor={(item) => item.Driver.driverId}
        renderItem={({ item }) => <RaceResultRow result={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={Colors.primary} />
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            {/* Race Info */}
            <View style={styles.header}>
              <Text style={styles.season}>Round {race.round} · {race.season}</Text>
              <Text style={styles.raceName}>{race.raceName}</Text>
              <Text style={styles.circuit}>{race.Circuit.circuitName}</Text>
              <Text style={styles.location}>
                {race.Circuit.Location.locality}, {race.Circuit.Location.country}
              </Text>
              <Text style={styles.date}>
                {new Date(race.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>

            {/* Podium */}
            {winner && (
              <View style={styles.winnerCard}>
                <Text style={styles.winnerLabel}>🏆 Race Winner</Text>
                <Text style={styles.winnerName}>
                  {winner.Driver.givenName} {winner.Driver.familyName}
                </Text>
                <Text style={styles.winnerTeam}>{winner.Constructor.name}</Text>
                {winner.Time && (
                  <Text style={styles.winnerTime}>{winner.Time.time}</Text>
                )}
              </View>
            )}

            <Text style={styles.resultsTitle}>Full Results</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: Colors.background,
    paddingBottom: 32,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    marginBottom: 12,
  },
  season: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  raceName: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 4,
  },
  circuit: {
    color: Colors.textSecondary,
    fontSize: 14,
    marginBottom: 2,
  },
  location: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 4,
  },
  date: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  winnerCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
  },
  winnerLabel: {
    color: Colors.gold,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  winnerName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 2,
  },
  winnerTeam: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  winnerTime: {
    color: Colors.textMuted,
    fontSize: 13,
    fontWeight: '500',
  },
  resultsTitle: {
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
