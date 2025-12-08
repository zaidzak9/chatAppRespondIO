import { commonStyles } from '@/app/components/styles/commonStyles';
import { useUserProfile } from '@/app/hooks/useUserProfile';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { toggleBlockUser } from '@/app/store/usersSlice';
import { useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, Switch, Text, View } from 'react-native';

export default function   ProfileScreen() {
  const params = useLocalSearchParams();
  const userId = params.userId as string;
  const dispatch = useAppDispatch();
  const isBlocked = useAppSelector((state) => state.users.blockedUsers[userId] || false);

  const { data } = useUserProfile(userId);

  if (!data) return null;

  return (
    <View style={commonStyles.centeredContainer}>
      <Image source={{ uri: data.avatar }} style={commonStyles.largeAvatar} />
      <Text style={commonStyles.name}>{data.name}</Text>
      <Text style={commonStyles.info}>{data.email}</Text>
    <Text style={commonStyles.info}>{data.phone}</Text>
      <View style={styles.toggleContainer}>
        <Text style={commonStyles.info}>{isBlocked ? 'Unblock User' : 'Block User'}</Text>
        <Switch value={isBlocked} onValueChange={() => { dispatch(toggleBlockUser(userId)); }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 24 },
});
