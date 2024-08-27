import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Channel, IChannels, PinnedMessage } from '../types/store';

const initialState: IChannels = {
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
      const ids: string[] = [];
      action.payload.forEach((channel) => {
        ids.push(channel.id);
        state.entities[channel.id] = channel;
      });

      state.ids = ids;
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
    pinMessage: (
      state,
      action: PayloadAction<{
        channelId: string;
        message: PinnedMessage;
       }>
    ) => {
      const { channelId, message } = action.payload;
        
      if (state.entities[channelId]) {
        state.entities[channelId].pinnedMessage = message;
      }
    },
    unpinMessage: (state, action: PayloadAction<string>) => {
      const channelId = action.payload;
        
      if (state.entities[channelId]) {
        state.entities[channelId].pinnedMessage = '';
      }
    }
  },
});

export const {
  addChannel,
  addChannels,
  removeChannel,
  updateChannel,
  setChannel,
  clearChannels,
  pinMessage,
  unpinMessage
} = channelSlice.actions;

export default channelSlice.reducer;
