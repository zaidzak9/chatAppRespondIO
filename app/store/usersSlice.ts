import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UsersState {
  blockedUsers: Record<string, boolean>;
}

const initialState: UsersState = {
  blockedUsers: {},
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    toggleBlockUser: (state, action: PayloadAction<string>) => {
      const userId = action.payload;
      state.blockedUsers[userId] = !state.blockedUsers[userId];
    },
  },
});

export const { toggleBlockUser } = usersSlice.actions;
export default usersSlice.reducer;
