import { StyleSheet, useColorScheme } from 'react-native';

export const useCommonStyles = () => {
  const colorScheme = useColorScheme();
  const inputColor = colorScheme === 'dark' ? '#fff' : '#000';

  return StyleSheet.create({
    container: { flex: 1 },
    centeredContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
    loader: { flex: 1, justifyContent: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25 },
    largeAvatar: { width: 120, height: 120, borderRadius: 60 },
    name: { fontSize: 24, fontWeight: '600', color: inputColor  },
    title: { fontSize: 16, fontWeight: '600', color: inputColor  },
    body: { fontSize: 14, color: inputColor  },
    info: { fontSize: 16, color: inputColor  },
    smallText: { fontSize: 12,color: inputColor  },
    input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 8, color: inputColor },
    button: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
    buttonText: { fontWeight: '600' , color: inputColor },
  });
};
