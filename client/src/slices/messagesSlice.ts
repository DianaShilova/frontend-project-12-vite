import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IMessage {
  ids: string[];
  entities: IEntities;
}

export interface IEntities {
  [key: string]: {
    id: string;
    channelId: string;
    text: string;
    name: string;
    removable: boolean;
  };
}

const initialState: IMessage = {
  ids: [],
  entities: {},
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IEntities[string]>) => {
      state.ids.push(action.payload.id);
      state.entities[action.payload.id] = action.payload;
    },
    addMessages: (state, action: PayloadAction<IEntities[string][]>) => {
      action.payload.forEach((message) => {
        state.ids.push(message.id);
        state.entities[message.id] = message;
      });
    },
    removeMessages: (state, action: PayloadAction<string>) => {
      const ids = state.ids.filter(
        (id) => state.entities[id].channelId !== action.payload
      );
      const entities = ids.reduce(
        (result, id) => ({ ...result, [id]: state.entities[id] }),
        {}
      );

      state.ids = ids;
      state.entities = entities;
    },
    updateMessages: (
      state,
      action: PayloadAction<{ id: string; changes: Partial<IEntities[string]> }>
    ) => {
      const { id, changes } = action.payload;
      if (state.entities[id]) {
        state.entities[id] = { ...state.entities[id], ...changes };
      }
    },
  },
});

export const { addMessage, addMessages, removeMessages, updateMessages } =
  messagesSlice.actions;
export default messagesSlice.reducer;
