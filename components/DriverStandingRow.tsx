import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { getTeamColor, getPositionColor } from '@/constants/teamColors';
import type { DriverStanding } from '@/types/f1';

interface DriverStandingRowProps {
  standing: DriverStanding;
}

export function DriverStandingRow({ standing }: DriverStandingRowProps) {
  const router = useRouter();
  const position = parseInt(standing.position, 10);
  const constructor = standing.Constructors[0];
  const teamColor = constructor ? getTeamColor(constructor.constructorId) : '#ffffff';
  const positionColor = getPositionColor(position);

  const handlePress = () => {
    router.push(`/driver/${standing.Driver.driverId}`);
  };

  return (
    <TouchableOpacity style={styles.row} onPress={handlePress} activeOpacity={0.7}>
      <View style={[styles.positionBadge, { backgroundColor: positionColor + '22' }]}>
        <Text style={[styles.position, { color: positionColor }]}>{standing.position}</Text>
      </View>
      <View style={[styles.teamColorBar, { backgroundColor: teamColor }]} />
      <View style={styles.driverInfo}>
        <Text style={styles.driverName}>
          {standing.Driver.givenName}{' '}
          <Text style={styles.driverSurname}>{standing.Driver.familyName}</Text>
        </Text>
        <Text style={styles.teamName}>{constructor?.name ?? '—'}</Text>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.points}>{standing.points}</Text>
        <Text style={styles.pointsLabel}>PTS</Text>
      </View>
      {standing.wins !== '0' && (
        <View style={styles.winsBadge}>
          <Text style={styles.winsText}>🏆 {standing.wins}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 10,
    padding: 12,
    gap: 12,
  },
  positionBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontSize: 15,
    fontWeight: '700',
  },
  teamColorBar: {
    width: 3,
    height: 40,
    borderRadius: 2,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '400',
  },
  driverSurname: {
    color: Colors.text,
    fontWeight: '700',
  },
  teamName: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  points: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  pointsLabel: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
  },
  winsBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 6,
  },
  winsText: {
    color: Colors.gold,
    fontSize: 11,
    fontWeight: '600',
  },
});
