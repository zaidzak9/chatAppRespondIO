import { authService } from '@/app/api/authService';
import { User } from '../types';
import { usePaginatedData } from './usePaginatedData';

export const useLoadUsers = () => {
  const { data: users, ...rest } = usePaginatedData<User>(authService.getUsers);
  return { users, ...rest };
};
