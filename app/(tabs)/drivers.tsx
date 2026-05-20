import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { useDriverStandings } from '@/hooks/useDriverStandings';
import { DriverStandingRow } from '@/components/DriverStandingRow';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorView } from '@/components/ErrorView';
import { CURRENT_SEASON } from '@/constants/api';

const SEASONS = [CURRENT_SEASON, String(Number(CURRENT_SEASON) - 1), String(Number(CURRENT_SEASON) - 2)];

export default function DriversScreen() {
  const [season, setSeason] = useState('current');
  const { standings, loading, error, refetch } = useDriverStandings(season);

  if (loading && standings.length === 0) {
    return <LoadingSpinner message="Loading driver standings..." />;
  }

  if (error && standings.length === 0) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  return (
    <View style={styles.container}>
      {/* Season Selector */}
      <View style={styles.seasonSelector}>
        {['current', ...SEASONS].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.seasonChip, season === s && styles.seasonChipActive]}
            onPress={() => setSeason(s)}
          >
            <Text style={[styles.seasonChipText, season === s && styles.seasonChipTextActive]}>
              {s === 'current' ? 'Current' : s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={standings}
        keyExtractor={(item) => item.Driver.driverId}
        renderItem={({ item }) => <DriverStandingRow standing={item} />}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={Colors.primary} />
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <Text style={styles.listHeader}>
            {standings.length} Drivers
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
  seasonSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  seasonChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  seasonChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  seasonChipText: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '600',
  },
  seasonChipTextActive: {
    color: Colors.text,
  },
  list: {
    paddingBottom: 24,
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
