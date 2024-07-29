import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice';
import messagesSlice from './messagesSlice';
import { usersApi } from '../api/users';
import { channelsApi } from '../api/channels';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefMiddl) =>
    getDefMiddl().concat(usersApi.middleware, channelsApi.middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
