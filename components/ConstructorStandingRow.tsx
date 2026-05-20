import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { getTeamColor, getPositionColor } from '@/constants/teamColors';
import type { ConstructorStanding } from '@/types/f1';

interface ConstructorStandingRowProps {
  standing: ConstructorStanding;
}

export function ConstructorStandingRow({ standing }: ConstructorStandingRowProps) {
  const position = parseInt(standing.position, 10);
  const teamColor = getTeamColor(standing.Constructor.constructorId);
  const positionColor = getPositionColor(position);

  return (
    <View style={styles.row}>
      <View style={[styles.positionBadge, { backgroundColor: positionColor + '22' }]}>
        <Text style={[styles.position, { color: positionColor }]}>{standing.position}</Text>
      </View>
      <View style={[styles.teamColorBar, { backgroundColor: teamColor }]} />
      <View style={styles.constructorInfo}>
        <Text style={styles.constructorName}>{standing.Constructor.name}</Text>
        <Text style={styles.nationality}>{standing.Constructor.nationality}</Text>
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
    </View>
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
  constructorInfo: {
    flex: 1,
  },
  constructorName: {
    color: Colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  nationality: {
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
