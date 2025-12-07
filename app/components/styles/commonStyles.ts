import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  container: { flex: 1 },
  centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  loader: { flex: 1, justifyContent: 'center' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  largeAvatar: { width: 120, height: 120, borderRadius: 60 },
  name: { fontSize: 24, fontWeight: '600' },
  title: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, color: '#666' },
  info: { fontSize: 16, color: '#666' },
  smallText: { fontSize: 12, color: '#666' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 8 },
  button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600' },
});
