import { BASE_URL } from "./api";

export const authService = {
  getUsers: async (limit = 20, offset = 0) => {
    const response = await fetch(`${BASE_URL}/users?limit=${limit}&offset=${offset}`);
    return response.json();
  },
};
