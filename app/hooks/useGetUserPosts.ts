import { useEffect, useState } from 'react';
import { authService } from '../api/authService';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  tags: string[];
}

export function useGetUserPosts(userId: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getUserPosts(userId)
      .then(data => setPosts(data.results))
      .finally(() => setLoading(false));
  }, [userId]);

  return { posts, loading };
}
