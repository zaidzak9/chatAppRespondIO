import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
  category: string;
  createdAt: string;
  tags: string[];
}

interface PostsState {
  [userId: number]: Post[];
}

const initialState: PostsState = {};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<{ userId: number; posts: Post[] }>) => {
      state[action.payload.userId] = action.payload.posts;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      const userId = action.payload.userId;
      if (!state[userId]) state[userId] = [];
      state[userId].unshift(action.payload);
    },
  },
});

export const { setPosts, addPost } = postsSlice.actions;
export default postsSlice.reducer;
