import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel, Channels } from '../types/store';

const initialState: Channels = {
  ids: [],
  entities: {},
  currentChannelId: '1',
};

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action: PayloadAction<Channel>) => {
      state.ids.push(action.payload.id);
      state.entities[action.payload.id] = action.payload;
    },
    addChannels: (state, action: PayloadAction<Channel[]>) => {
      action.payload.forEach((channel) => {
        state.ids.push(channel.id);
        state.entities[channel.id] = channel;
      });
    },
    removeChannel: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      delete state.entities[action.payload];
    },
    updateChannel: (
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) => {
      if (state.entities[action.payload.id]) {
        state.entities[action.payload.id].name = action.payload.name;
      }
    },
    clearChannels: () => initialState,
    setChannel: (state, action: PayloadAction<string>) => {
      state.currentChannelId = action.payload;
    },
  },
});

export const {
  addChannel,
  addChannels,
  removeChannel,
  updateChannel,
  setChannel,
  clearChannels,
} = channelSlice.actions;

export default channelSlice.reducer;
