import { useQuery } from '@tanstack/react-query';
import { authService } from '@/app/api/authService';

export const useUserProfile = (userId: string) => {
  return useQuery({
    queryKey: ['userProfile', userId],
    queryFn: () => authService.getUserProfile(userId),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
