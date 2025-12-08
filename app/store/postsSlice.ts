import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post } from '../types';

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
