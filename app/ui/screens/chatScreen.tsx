import { useCommonStyles } from '@/app/components/styles/commonStyles';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authService } from '../../api/authService';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';
import { useAppDispatch } from '../../store/hooks';
import { addPost } from '../../store/postsSlice';

export default function ChatScreen() {
  const { userId, userName} = useLocalSearchParams();
  const router = useRouter();
  const { posts, loading } = useGetUserPosts(Number(userId));
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);
  const commonStyles = useCommonStyles();

  const dispatch = useAppDispatch();

  const handleSend = async () => {
    if (!title.trim() || !body.trim()) return;
    
    setSending(true);
    try {
      await authService.createPost(Number(userId), title, body);
      
      dispatch(addPost({
        id: Date.now(),
        userId: Number(userId),
        title,
        body,
        category: 'Respond.IO',
        createdAt: new Date().toISOString(),
        tags: [],
      }));
      
      setTitle('');
      setBody('');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <ActivityIndicator style={commonStyles.loader} />;

  return (
    <>
      <Stack.Screen 
        options={{
          headerShown: true,
          title: userName as string,
          headerBackTitle: 'Back',
          headerTitleStyle: { fontSize: 18 },
          animation: 'none' as const,
          headerRight: () => (
            <TouchableOpacity onPress={() => router.push(`/ui/screens/profileScreen?userId=${userId}`)}>
              <Text style={{ color: '#007AFF', fontSize: 16 }}>Profile</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <KeyboardAvoidingView 
      style={commonStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}
    >
      <FlatList
        data={posts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={[commonStyles.title, styles.title]}>{item.title}</Text>
            <Text style={[commonStyles.smallText, styles.category]}>{item.category}</Text>
            <Text style={commonStyles.body}>{item.body}</Text>
            <Text style={commonStyles.smallText}>{new Date(item.createdAt).toLocaleDateString()}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={commonStyles.input}
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={commonStyles.input}
          placeholder="Body"
          placeholderTextColor="#999"
          value={body}
          onChangeText={setBody}
        />
        <TouchableOpacity style={commonStyles.button} onPress={handleSend} disabled={sending}>
          <Text style={commonStyles.buttonText}>{sending ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  post: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { marginBottom: 4 },
  category: { marginBottom: 8 },
  inputContainer: { padding: 16, borderTopWidth: 1, borderTopColor: '#ddd' },
});
