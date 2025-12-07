import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { useLoadUsers } from '../../../hooks/useLoadUsers';

export default function Chats() {
  const { users, loading, loadingMore, loadMore } = useLoadUsers();

  if (loading) return <ActivityIndicator style={styles.loader} />;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.info}>
            <Text style={styles.email}>{item.name}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
        </View>
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
