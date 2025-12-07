import { useEffect, useState } from 'react';
import { authService } from '../api/authService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setPosts } from '../store/postsSlice';

export function useGetUserPosts(userId: number) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts[userId]);
  const [loading, setLoading] = useState(!posts);

  useEffect(() => {
    if (!posts) {
      authService.getUserPosts(userId)
        .then(data => {
          dispatch(setPosts({ userId, posts: data.results }));
        })
        .finally(() => setLoading(false));
    }
  }, [userId, posts, dispatch]);

  return { posts: posts || [], loading };
}
