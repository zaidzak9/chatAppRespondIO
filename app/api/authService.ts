import { BASE_URL } from "./api";

export const authService = {
  getUsers: async (limit = 20, offset = 0) => {
    const response = await fetch(`${BASE_URL}/users?limit=${limit}&offset=${offset}`);
    return response.json();
  },
  getUserPosts: async (userId: number) => {
    const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
    return response.json();
  },
  createPost: async (userId: number, title: string, body: string) => {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, title, body })
    });
    return response.json();
  },
  getUserProfile: async (userId: string) => {
    const response = await fetch(`${BASE_URL}/users/${userId}`);
    return response.json();
  },
};
