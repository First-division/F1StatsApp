import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Pressable } from 'react-native';

import { Text, View } from '@/components/Themed';
import { constructorStandings, nextRace, seasonHighlights } from '@/constants/f1Data';

export default function TabOneScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.heroCard} lightColor="#ffffff" darkColor="#0f172a">
        <Text style={styles.eyebrow}>2026 season tracker</Text>
        <Text style={styles.title}>F1 Stats App</Text>
        <Text style={styles.description}>
          A small Expo Go app built with React Native and Expo Router v6 for quick race and
          standings snapshots.
        </Text>
        <Link href="/modal" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Why this setup?</Text>
          </Pressable>
        </Link>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Season pulse</Text>
        <View style={styles.statGrid}>
          {seasonHighlights.map((item) => (
            <View
              key={item.label}
              style={styles.statCard}
              lightColor="#ffffff"
              darkColor="#0f172a">
              <Text style={styles.statValue}>{item.value}</Text>
              <Text style={styles.statLabel}>{item.label}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Next race weekend</Text>
        <View style={styles.featureCard} lightColor="#ffffff" darkColor="#0f172a">
          <Text style={styles.featureTitle}>
            Round {nextRace.round}: {nextRace.name}
          </Text>
          <Text style={styles.featureMeta}>{nextRace.circuit}</Text>
          <Text style={styles.featureMeta}>
            {nextRace.location} • {nextRace.date}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top constructors</Text>
        <View style={styles.featureCard} lightColor="#ffffff" darkColor="#0f172a">
          {constructorStandings.map((entry, index) => (
            <View key={entry.team} style={styles.row}>
              <Text style={styles.rowLabel}>
                {index + 1}. {entry.team}
              </Text>
              <Text style={styles.rowValue}>{entry.points} pts</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 20,
  },
  heroCard: {
    borderRadius: 24,
    padding: 24,
    gap: 12,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#e10600',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  primaryButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#e10600',
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  statGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 14,
    opacity: 0.7,
  },
  featureCard: {
    borderRadius: 20,
    padding: 18,
    gap: 10,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  featureMeta: {
    fontSize: 15,
    opacity: 0.75,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 15,
    fontWeight: '700',
  },
});
