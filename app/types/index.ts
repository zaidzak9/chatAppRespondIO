export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  tags: string[];
}
