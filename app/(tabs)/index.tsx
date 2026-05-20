import React from 'react';
import { View, Text, ScrollView, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useDriverStandings } from '@/hooks/useDriverStandings';
import { useConstructorStandings } from '@/hooks/useConstructorStandings';
import { useRaceSchedule } from '@/hooks/useRaceSchedule';
import { getTeamColor } from '@/constants/teamColors';
import { LoadingSpinner } from '@/components/LoadingSpinner';

function SectionHeader({ title, onSeeAll }: { title: string; onSeeAll: () => void }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <TouchableOpacity onPress={onSeeAll}>
        <Text style={styles.seeAll}>See all →</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function HomeScreen() {
  const router = useRouter();
  const { standings: driverStandings, loading: dLoading, refetch: refetchDrivers } = useDriverStandings();
  const { standings: constructorStandings, loading: cLoading, refetch: refetchConstructors } = useConstructorStandings();
  const { races, loading: rLoading, refetch: refetchRaces } = useRaceSchedule();

  const isRefreshing = dLoading || cLoading || rLoading;

  const onRefresh = () => {
    refetchDrivers();
    refetchConstructors();
    refetchRaces();
  };

  const today = new Date();
  const nextRace = races.find((r) => new Date(r.date) >= today);
  const lastRace = [...races].reverse().find((r) => new Date(r.date) < today);

  const top3Drivers = driverStandings.slice(0, 3);
  const top3Constructors = constructorStandings.slice(0, 3);

  if (dLoading && driverStandings.length === 0) {
    return <LoadingSpinner message="Loading F1 data..." />;
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={Colors.primary}
        />
      }
    >
      {/* Season Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerLeft}>
          <Text style={styles.bannerSeason}>{new Date().getFullYear()} Season</Text>
          <Text style={styles.bannerSubtitle}>Formula 1 World Championship</Text>
        </View>
        <Text style={styles.f1Logo}>F1</Text>
      </View>

      {/* Next Race */}
      {nextRace && (
        <TouchableOpacity
          style={styles.nextRaceCard}
          onPress={() => router.push(`/race/${nextRace.season}/${nextRace.round}`)}
          activeOpacity={0.8}
        >
          <View style={styles.nextRaceHeader}>
            <View style={styles.nextBadge}>
              <Text style={styles.nextBadgeText}>NEXT RACE</Text>
            </View>
            <Text style={styles.nextRaceRound}>Round {nextRace.round}</Text>
          </View>
          <Text style={styles.nextRaceName}>{nextRace.raceName}</Text>
          <Text style={styles.nextRaceLocation}>
            {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}
          </Text>
          <Text style={styles.nextRaceDate}>
            {new Date(nextRace.date).toLocaleDateString('en-US', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
        </TouchableOpacity>
      )}

      {/* Driver Standings Top 3 */}
      {top3Drivers.length > 0 && (
        <>
          <SectionHeader title="Driver Standings" onSeeAll={() => router.push('/drivers')} />
          {top3Drivers.map((s) => {
            const constructor = s.Constructors[0];
            const teamColor = constructor ? getTeamColor(constructor.constructorId) : '#fff';
            return (
              <TouchableOpacity
                key={s.Driver.driverId}
                style={styles.miniRow}
                onPress={() => router.push(`/driver/${s.Driver.driverId}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.miniPos}>{s.position}</Text>
                <View style={[styles.miniBar, { backgroundColor: teamColor }]} />
                <Text style={styles.miniName}>
                  {s.Driver.givenName[0]}. {s.Driver.familyName}
                </Text>
                <Text style={styles.miniPoints}>{s.points} PTS</Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}

      {/* Constructor Standings Top 3 */}
      {top3Constructors.length > 0 && (
        <>
          <SectionHeader title="Constructor Standings" onSeeAll={() => router.push('/constructors')} />
          {top3Constructors.map((s) => {
            const teamColor = getTeamColor(s.Constructor.constructorId);
            return (
              <View key={s.Constructor.constructorId} style={styles.miniRow}>
                <Text style={styles.miniPos}>{s.position}</Text>
                <View style={[styles.miniBar, { backgroundColor: teamColor }]} />
                <Text style={styles.miniName}>{s.Constructor.name}</Text>
                <Text style={styles.miniPoints}>{s.points} PTS</Text>
              </View>
            );
          })}
        </>
      )}

      {/* Last Race */}
      {lastRace && (
        <>
          <SectionHeader title="Last Race" onSeeAll={() => router.push('/races')} />
          <TouchableOpacity
            style={styles.lastRaceCard}
            onPress={() => router.push(`/race/${lastRace.season}/${lastRace.round}`)}
            activeOpacity={0.8}
          >
            <Text style={styles.lastRaceName}>{lastRace.raceName}</Text>
            <Text style={styles.lastRaceInfo}>
              {lastRace.Circuit.Location.locality} · Round {lastRace.round}
            </Text>
            <Text style={styles.viewResults}>View Results →</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: 32,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 16,
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  bannerLeft: {},
  bannerSeason: {
    color: Colors.text,
    fontSize: 22,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  f1Logo: {
    color: Colors.primary,
    fontSize: 36,
    fontWeight: '900',
    fontStyle: 'italic',
  },
  nextRaceCard: {
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  nextRaceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  nextBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  nextBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  nextRaceRound: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  nextRaceName: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextRaceLocation: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginBottom: 4,
  },
  nextRaceDate: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 20,
    marginBottom: 8,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  seeAll: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  miniRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 8,
    padding: 12,
    gap: 12,
  },
  miniPos: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '700',
    width: 20,
    textAlign: 'center',
  },
  miniBar: {
    width: 3,
    height: 28,
    borderRadius: 2,
  },
  miniName: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  miniPoints: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '700',
  },
  lastRaceCard: {
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  lastRaceName: {
    color: Colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  lastRaceInfo: {
    color: Colors.textMuted,
    fontSize: 13,
    marginBottom: 8,
  },
  viewResults: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
});
