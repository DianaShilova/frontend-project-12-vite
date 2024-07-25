export interface ChannelState {
  currentChannel: string;
}

export const addChannel: (state: ChannelState, payload: any) => void;
export const removeChannel: (state: ChannelState, payload: any) => void;
export const clearChannels: () => void;
