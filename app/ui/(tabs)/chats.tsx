import { commonStyles } from '@/app/components/styles/commonStyles';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLoadUsers } from '../../hooks/useLoadUsers';

export default function Chats() {
  const { users, loading, loadingMore, loadMore } = useLoadUsers();
  const router = useRouter();

  if (loading) return <ActivityIndicator style={commonStyles.loader} />;

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => router.push(`/ui/screens/chatScreen?userId=${item.id}&userName=${item.name}&userEmail=${item.email}&userPhone=${item.phone}&userAvatar=${item.avatar}`)}>
          <Image source={{ uri: item.avatar }} style={commonStyles.avatar} />
          <View style={styles.info}>
            <Text style={[commonStyles.body, styles.name]}>{item.name}</Text>
            <Text style={commonStyles.body}>{item.email}</Text>
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
  item: { flexDirection: 'row', padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  info: { marginLeft: 12, justifyContent: 'center' },
  name: { fontWeight: '600' },
  footer: { padding: 16 },
});
