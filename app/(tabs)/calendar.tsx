import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { upcomingRaceWeekends } from '@/constants/f1Data';

export default function CalendarScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.title}>Upcoming race weekends</Text>
      <Text style={styles.subtitle}>
        Simple sample schedule cards that render cleanly in Expo Go with the file-based router.
      </Text>

      {upcomingRaceWeekends.map((race) => (
        <View key={race.round} style={styles.card} lightColor="#ffffff" darkColor="#0f172a">
          <Text style={styles.round}>Round {race.round}</Text>
          <Text style={styles.raceName}>{race.name}</Text>
          <Text style={styles.meta}>{race.circuit}</Text>
          <Text style={styles.meta}>{race.location}</Text>
          <Text style={styles.date}>{race.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    opacity: 0.75,
    marginBottom: 4,
  },
  card: {
    borderRadius: 20,
    padding: 18,
    gap: 8,
  },
  round: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#e10600',
  },
  raceName: {
    fontSize: 20,
    fontWeight: '700',
  },
  meta: {
    fontSize: 15,
    opacity: 0.8,
  },
  date: {
    fontSize: 16,
    fontWeight: '700',
  },
});
