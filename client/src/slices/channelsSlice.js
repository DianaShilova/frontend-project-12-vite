import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const defaultState = {
  currentChannelId: '1',
};

const initialState = channelsAdapter.getInitialState(defaultState);

const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    removeChannel: (state, { payload }) => {
      channelsAdapter.removeOne(state, payload);
    },
    updateChannel: (state, { payload }) => ({
      ...state,
      entities: {
        ...state.entities,
        [payload.id]: {
          ...state.entities[payload.id],
          name: payload.name,
        },
      },
    }),
    clearChannels: () => initialState,
    setChannel: (state, { payload }) => ({ ...state, currentChannelId: payload }),
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
