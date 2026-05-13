import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { ExternalLink } from '@/components/ExternalLink';
import { Text, View } from '@/components/Themed';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expo Go + router setup</Text>
      <Text style={styles.body}>
        This project uses React Native, Expo, and Expo Router v6 with the tab template structure,
        so it runs in Expo Go without any native setup.
      </Text>
      <Text style={styles.body}>
        Start the dev server with <Text style={styles.code}>npm start</Text> and scan the QR code
        from Expo Go to open the app.
      </Text>
      <ExternalLink href="https://github.com/First-division/F1StatsApp" style={styles.link}>
        <Text style={styles.linkText}>Repository reference</Text>
      </ExternalLink>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  code: {
    fontWeight: '800',
  },
  link: {
    marginTop: 8,
  },
  linkText: {
    color: '#e10600',
    fontSize: 16,
    fontWeight: '700',
  },
});
