import { commonStyles } from '@/app/components/styles/commonStyles';
import { useLocalSearchParams } from 'expo-router';
import { Image, Text, View } from 'react-native';

export default function ProfileScreen() {
  const { userName, userEmail, userPhone, userAvatar } = useLocalSearchParams();

  return (
    <View style={commonStyles.centeredContainer}>
      <Image source={{ uri: userAvatar as string }} style={commonStyles.largeAvatar} />
      <Text style={commonStyles.name}>{userName}</Text>
      <Text style={commonStyles.info}>{userEmail}</Text>
      <Text style={commonStyles.info}>{userPhone}</Text>
    </View>
  );
}
