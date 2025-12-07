import { useEffect, useState } from 'react';

type PaginatedResponse<T> = {
  results: T[];
};

export function usePaginatedData<T>(
  fetchFn: (limit: number, offset: number) => Promise<PaginatedResponse<T>>,
  pageSize = 20
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const loadData = (currentOffset: number) => {
    fetchFn(pageSize, currentOffset)
      .then(response => {
        setData(prev => [...prev, ...response.results]);
        setHasMore(response.results.length === pageSize);
        setLoading(false);
        setLoadingMore(false);
      })
      .catch(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  };

  useEffect(() => {
    loadData(0);
  }, []);

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      const newOffset = offset + pageSize;
      setOffset(newOffset);
      loadData(newOffset);
    }
  };

  return { data, loading, loadingMore, loadMore, hasMore };
}
