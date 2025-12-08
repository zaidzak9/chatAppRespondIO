import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { toggleBlockUser } from '../app/store/usersSlice';

describe('ProfileScreen Integration', () => {
  let store: ReturnType<typeof configureStore<{ users: ReturnType<typeof usersReducer> }>>;

  beforeEach(() => {
    store = configureStore({ reducer: { users: usersReducer } });
  });

  it('should initialize with no blocked users', () => {
    expect(store.getState().users.blockedUsers).toEqual({});
  });

  it('should block a user', () => {
    store.dispatch(toggleBlockUser('user123'));
    expect(store.getState().users.blockedUsers['user123']).toBe(true);
  });

  it('should unblock a user', () => {
    store.dispatch(toggleBlockUser('user123'));
    store.dispatch(toggleBlockUser('user123'));
    expect(store.getState().users.blockedUsers['user123']).toBe(false);
  });
});
