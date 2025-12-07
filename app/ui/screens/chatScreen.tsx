import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authService } from '../../api/authService';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';
import { useAppDispatch } from '../../store/hooks';
import { addPost } from '../../store/postsSlice';

export default function ChatScreen() {
  const { userId, userName } = useLocalSearchParams();
  const { posts, loading } = useGetUserPosts(Number(userId));
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

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

  if (loading) return <ActivityIndicator style={styles.loader} />;

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 110 : 0}
    >
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Title"
          placeholderTextColor="#999"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Body"
          placeholderTextColor="#999"
          value={body}
          onChangeText={setBody}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={sending}>
          <Text style={styles.sendText}>{sending ? 'Sending...' : 'Send'}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  inputContainer: { padding: 16, borderTopWidth: 1, borderTopColor: '#080808ff' },
  input: { borderWidth: 1, borderColor: '#080808ff', borderRadius: 8, padding: 12, marginBottom: 8 },
  sendButton: { backgroundColor: '#007AFF', padding: 12, borderRadius: 8, alignItems: 'center' },
  sendText: { color: '#fff', fontWeight: '600' },
});
