import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { getTeamColor, getPositionColor } from '@/constants/teamColors';
import type { RaceResult } from '@/types/f1';

interface RaceResultRowProps {
  result: RaceResult;
}

export function RaceResultRow({ result }: RaceResultRowProps) {
  const position = parseInt(result.position, 10);
  const teamColor = getTeamColor(result.Constructor.constructorId);
  const positionColor = getPositionColor(position);
  const isFinished = result.status === 'Finished' || result.status.startsWith('+');
  const isFastestLap = result.FastestLap?.rank === '1';

  return (
    <View style={styles.row}>
      <View style={[styles.positionBadge, { backgroundColor: positionColor + '22' }]}>
        <Text style={[styles.position, { color: positionColor }]}>
          {result.positionText}
        </Text>
      </View>
      <View style={[styles.teamColorBar, { backgroundColor: teamColor }]} />
      <Text style={styles.number}>#{result.number}</Text>
      <View style={styles.driverInfo}>
        <View style={styles.driverRow}>
          <Text style={styles.driverName}>
            {result.Driver.givenName[0]}. {result.Driver.familyName}
          </Text>
          {isFastestLap && <Text style={styles.fastestLap}>⚡</Text>}
        </View>
        <Text style={styles.constructor}>{result.Constructor.name}</Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={[styles.time, !isFinished && styles.dnf]}>
          {isFinished
            ? (result.Time?.time ?? 'Finished')
            : result.status}
        </Text>
        <Text style={styles.points}>+{result.points} pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 3,
    borderRadius: 8,
    padding: 10,
    gap: 10,
  },
  positionBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontSize: 13,
    fontWeight: '700',
  },
  teamColorBar: {
    width: 3,
    height: 36,
    borderRadius: 2,
  },
  number: {
    color: Colors.textMuted,
    fontSize: 12,
    width: 28,
  },
  driverInfo: {
    flex: 1,
  },
  driverRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  driverName: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  fastestLap: {
    fontSize: 12,
  },
  constructor: {
    color: Colors.textMuted,
    fontSize: 11,
    marginTop: 1,
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  time: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
  dnf: {
    color: Colors.primary,
  },
  points: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 1,
  },
});
