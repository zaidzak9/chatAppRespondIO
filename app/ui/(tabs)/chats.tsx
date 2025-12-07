import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLoadUsers } from '../../hooks/useLoadUsers';

export default function Chats() {
  const { users, loading, loadingMore, loadMore } = useLoadUsers();
  const router = useRouter();

  if (loading) return <ActivityIndicator style={styles.loader} />;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => router.push(`/ui/screens/chatScreen?userId=${item.id}&userName=${item.name}`)}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </TouchableOpacity>
      )}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator style={styles.footer} /> : null}
    />
  );
}

const styles = StyleSheet.create({
  loader: { flex: 1, justifyContent: 'center' },
  item: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  info: { marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, color: '#666',fontWeight: '600' },
  email: { fontSize: 14, color: '#666', marginTop: 4 },
  footer: { padding: 16 },
});
