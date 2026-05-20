import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import type { Race } from '@/types/f1';

interface RaceCardProps {
  race: Race;
  isNext?: boolean;
  isPast?: boolean;
}

function formatDate(dateStr: string, timeStr?: string): string {
  const date = new Date(timeStr ? `${dateStr}T${timeStr}` : dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

const FLAG_MAP: Record<string, string> = {
  Australia: '🇦🇺', Bahrain: '🇧🇭', 'Saudi Arabia': '🇸🇦', Japan: '🇯🇵',
  China: '🇨🇳', USA: '🇺🇸', 'United States': '🇺🇸', Italy: '🇮🇹',
  Monaco: '🇲🇨', Canada: '🇨🇦', Spain: '🇪🇸', Austria: '🇦🇹',
  UK: '🇬🇧', 'United Kingdom': '🇬🇧', Hungary: '🇭🇺', Belgium: '🇧🇪',
  Netherlands: '🇳🇱', Singapore: '🇸🇬', Azerbaijan: '🇦🇿', Mexico: '🇲🇽',
  Brazil: '🇧🇷', 'Las Vegas': '🇺🇸', Qatar: '🇶🇦', UAE: '🇦🇪',
  'United Arab Emirates': '🇦🇪',
};

function getCountryFlag(country: string): string {
  return FLAG_MAP[country] ?? '🏁';
}

export function RaceCard({ race, isNext, isPast }: RaceCardProps) {
  const router = useRouter();

  const handlePress = () => {
    router.push(`/race/${race.season}/${race.round}`);
  };

  return (
    <TouchableOpacity
      style={[styles.card, isNext && styles.nextCard, isPast && styles.pastCard]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      {isNext && (
        <View style={styles.nextBanner}>
          <Text style={styles.nextBannerText}>NEXT RACE</Text>
        </View>
      )}
      <View style={styles.header}>
        <Text style={styles.flag}>
          {getCountryFlag(race.Circuit.Location.country)}
        </Text>
        <View style={styles.headerText}>
          <Text style={[styles.raceName, isPast && styles.pastText]}>{race.raceName}</Text>
          <Text style={styles.circuit}>{race.Circuit.circuitName}</Text>
        </View>
        <View style={styles.roundBadge}>
          <Text style={styles.roundText}>R{race.round}</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.location}>
          <Text style={styles.locationText}>
            {race.Circuit.Location.locality}, {race.Circuit.Location.country}
          </Text>
        </View>
        <Text style={[styles.date, isNext && styles.nextDate]}>
          {formatDate(race.date, race.time)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  nextCard: {
    borderColor: Colors.primary,
    borderWidth: 1.5,
  },
  pastCard: {
    opacity: 0.6,
  },
  nextBanner: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginBottom: 10,
  },
  nextBannerText: {
    color: Colors.text,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  flag: {
    fontSize: 32,
  },
  headerText: {
    flex: 1,
  },
  raceName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  pastText: {
    color: Colors.textSecondary,
  },
  circuit: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  roundBadge: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  roundText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  location: {
    flex: 1,
  },
  locationText: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  date: {
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  nextDate: {
    color: Colors.primary,
    fontWeight: '700',
  },
});
