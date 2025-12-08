import { configureStore } from '@reduxjs/toolkit';
import usersReducer, { toggleBlockUser } from '../app/store/usersSlice';

describe('usersSlice', () => {
  let store: ReturnType<typeof configureStore<{ users: ReturnType<typeof usersReducer> }>>;

  beforeEach(() => {
    store = configureStore({ reducer: { users: usersReducer } });
  });

  it('should toggle block user from false to true', () => {
    store.dispatch(toggleBlockUser('123'));
    expect(store.getState().users.blockedUsers['123']).toBe(true);
  });

  it('should toggle block user from true to false', () => {
    store.dispatch(toggleBlockUser('123'));
    store.dispatch(toggleBlockUser('123'));
    expect(store.getState().users.blockedUsers['123']).toBe(false);
  });

  it('should handle multiple users independently', () => {
    store.dispatch(toggleBlockUser('123'));
    store.dispatch(toggleBlockUser('456'));
    expect(store.getState().users.blockedUsers['123']).toBe(true);
    expect(store.getState().users.blockedUsers['456']).toBe(true);
  });
});
