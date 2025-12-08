import { useCommonStyles } from '@/app/components/styles/commonStyles';
import Constants from 'expo-constants';
import { StyleSheet, Text, View } from 'react-native';

export default function Settings() {
  const commonStyles = useCommonStyles();
  return (
    <View style={commonStyles.centeredContainer}>
      <Text style={[commonStyles.name, styles.name]}>Zaid Hussain</Text>
      <Text style={commonStyles.info}>App Version: {Constants.expoConfig?.version}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { marginBottom: 16 },
});
