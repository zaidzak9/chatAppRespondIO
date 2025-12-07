import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { userName, userEmail, userPhone, userAvatar } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Image source={{ uri: userAvatar as string }} style={styles.avatar} />
      <Text style={styles.name}>{userName}</Text>
      <Text style={styles.info}>{userEmail}</Text>
      <Text style={styles.info}>{userPhone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginTop: 40 },
  name: { fontSize: 24, fontWeight: '600', marginTop: 16 },
  info: { fontSize: 16, color: '#666', marginTop: 8 },
});
