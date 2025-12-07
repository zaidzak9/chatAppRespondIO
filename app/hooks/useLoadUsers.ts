import { authService } from '@/app/api/authService';
import { usePaginatedData } from './usePaginatedData';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
};

export const useLoadUsers = () => {
  const { data: users, ...rest } = usePaginatedData<User>(authService.getUsers);
  return { users, ...rest };
};
