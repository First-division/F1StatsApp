import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useDriverDetails } from '@/hooks/useDriverDetails';
import { getTeamColor } from '@/constants/teamColors';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorView } from '@/components/ErrorView';

function StatBlock({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBlock}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

export default function DriverDetailScreen() {
  const { driverId } = useLocalSearchParams<{ driverId: string }>();
  const { driver, results, loading, error, refetch } = useDriverDetails(driverId);

  const teamColor =
    results[0]?.Results[0]?.Constructor
      ? getTeamColor(results[0].Results[0].Constructor.constructorId)
      : Colors.primary;

  if (loading && !driver) {
    return <LoadingSpinner message="Loading driver profile..." />;
  }

  if (error && !driver) {
    return <ErrorView message={error} onRetry={refetch} />;
  }

  if (!driver) {
    return <ErrorView message="Driver not found." />;
  }

  const fullName = `${driver.givenName} ${driver.familyName}`;
  const wins = results.filter((r) => r.Results[0]?.position === '1').length;
  const podiums = results.filter((r) =>
    ['1', '2', '3'].includes(r.Results[0]?.position)
  ).length;
  const totalPoints = results.reduce(
    (acc, r) => acc + parseFloat(r.Results[0]?.points ?? '0'),
    0
  );

  return (
    <>
      <Stack.Screen options={{ title: driver.code ?? fullName }} />
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} tintColor={Colors.primary} />
        }
      >
        {/* Hero */}
        <View style={[styles.hero, { borderBottomColor: teamColor }]}>
          <View style={styles.heroNumber}>
            <Text style={[styles.number, { color: teamColor }]}>
              #{driver.permanentNumber ?? '—'}
            </Text>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.firstName}>{driver.givenName}</Text>
            <Text style={styles.lastName}>{driver.familyName}</Text>
            {driver.code && (
              <Text style={[styles.code, { color: teamColor }]}>{driver.code}</Text>
            )}
          </View>
        </View>

        {/* Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nationality</Text>
            <Text style={styles.detailValue}>{driver.nationality}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Date of Birth</Text>
            <Text style={styles.detailValue}>
              {new Date(driver.dateOfBirth).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </Text>
          </View>
          {driver.url && (
            <>
              <View style={styles.separator} />
              <TouchableOpacity
                style={styles.detailRow}
                onPress={() => Linking.openURL(driver.url)}
              >
                <Text style={styles.detailLabel}>Wikipedia</Text>
                <Text style={[styles.detailValue, styles.link]}>Open →</Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Season Stats */}
        {results.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Season Stats</Text>
            <View style={styles.statsGrid}>
              <StatBlock label="Races" value={String(results.length)} />
              <StatBlock label="Wins" value={String(wins)} />
              <StatBlock label="Podiums" value={String(podiums)} />
              <StatBlock label="Points" value={String(totalPoints)} />
            </View>
          </>
        )}

        {/* Race History */}
        {results.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Race Results</Text>
            {[...results].reverse().map((race) => {
              const res = race.Results[0];
              if (!res) return null;
              const isWin = res.position === '1';
              const isPodium = ['1', '2', '3'].includes(res.position);
              return (
                <View key={`${race.season}-${race.round}`} style={styles.raceRow}>
                  <View
                    style={[
                      styles.racePos,
                      isWin && styles.winPos,
                      isPodium && !isWin && styles.podiumPos,
                    ]}
                  >
                    <Text style={styles.racePosText}>{res.positionText}</Text>
                  </View>
                  <View style={styles.raceInfo}>
                    <Text style={styles.raceName}>{race.raceName}</Text>
                    <Text style={styles.raceTeam}>{res.Constructor.name}</Text>
                  </View>
                  <View style={styles.raceStats}>
                    <Text style={styles.racePoints}>+{res.points} pts</Text>
                    <Text style={styles.raceStatus}>{res.status}</Text>
                  </View>
                </View>
              );
            })}
          </>
        )}

        <View style={styles.bottomPad} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    backgroundColor: Colors.surface,
    borderBottomWidth: 2,
    marginBottom: 16,
    gap: 16,
  },
  heroNumber: {},
  number: {
    fontSize: 52,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  heroInfo: {
    flex: 1,
  },
  firstName: {
    color: Colors.textSecondary,
    fontSize: 18,
    fontWeight: '400',
  },
  lastName: {
    color: Colors.text,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 32,
  },
  code: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 4,
  },
  detailsCard: {
    marginHorizontal: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 4,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  detailLabel: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  detailValue: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  link: {
    color: Colors.primary,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 10,
  },
  statsGrid: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  statBlock: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  statValue: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 2,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  raceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  racePos: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  winPos: {
    backgroundColor: Colors.gold + '33',
  },
  podiumPos: {
    backgroundColor: Colors.silver + '22',
  },
  racePosText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  raceInfo: {
    flex: 1,
  },
  raceName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  raceTeam: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  raceStats: {
    alignItems: 'flex-end',
  },
  racePoints: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  raceStatus: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  bottomPad: {
    height: 32,
  },
});
