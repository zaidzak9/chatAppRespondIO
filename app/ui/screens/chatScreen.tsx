import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';

export default function ChatScreen() {
  const { userId, userName } = useLocalSearchParams();
  const { posts, loading } = useGetUserPosts(Number(userId));

  if (loading) return <ActivityIndicator style={styles.loader} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.body}>{item.body}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: 'center' },
  post: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#080808ff' },
  title: { fontSize: 16, fontWeight: '600', marginBottom: 4 },
  category: { fontSize: 12, color: '#080808ff', marginBottom: 8 },
  body: { fontSize: 14, color: '#080808ff', marginBottom: 8 },
  date: { fontSize: 12, color: '#080808ff' },
});
