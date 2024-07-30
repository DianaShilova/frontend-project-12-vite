import { IRootState } from '.';
import { Channel, IChannels, Messages } from '../types/store';

export const selectChannels = (store: IRootState) => store?.channels.entities;

export const selectChannel =
  (store: { channels: IChannels; messages: Messages }) =>
  (id: string | null): Channel | null => {
    if (id) {
      return store?.channels.entities[id];
    }

    return null;
  };

export const selectCurrentChannelId = (store: {
  channels: IChannels;
  messages: Messages;
}) => store.channels.currentChannelId;
