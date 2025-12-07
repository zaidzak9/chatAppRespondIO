import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Zaid Hussain</Text>
      <Text style={styles.version}>App Version: {Constants.expoConfig?.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  name: { fontSize: 24, fontWeight: '600', marginBottom: 16 },
  version: { fontSize: 16, color: '#666' },
});
