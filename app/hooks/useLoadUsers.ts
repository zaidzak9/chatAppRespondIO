import { authService } from '@/app/api/authService';
import { useEffect, useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
};

export const useLoadUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadUsers = (currentOffset: number) => {
    authService.getUsers(20, currentOffset)
      .then(data => {
        setUsers(prev => [...prev, ...data.results]);
        setHasMore(data.results.length === 20);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    loadUsers(0);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const newOffset = offset + 20;
      setOffset(newOffset);
      loadUsers(newOffset);
    }
  };

  return { users, loading, loadingMore, loadMore };
};
