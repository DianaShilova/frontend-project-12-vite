export type IChannels = {
  ids: string[];
  entities: {
    [key: string]: Channel;
  };
  currentChannelId: string;
};

export type Channel = {
  id: string;
  name: string;
  removable: boolean;
  pinnedMessage: PinnedMessage | '';
};

export type Messages = {
  ids: string[];
  entities: {
    [key: string]: Message;
  };
};

export interface PinnedMessage {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
}

export type Message = {
  id: string;
  channelId: string;
  name: string;
  text: string;
};

export type TWordMessage = {
  manyCase: string;
  singularCase: string;
  genitiveCase: string;
};

export type TEmoji =
  | '/love'
  | '/fire'
  | '/firework'
  | '/laugh'
  | '/snow'
  | '/confetti';

export type AnimationQueueItem = {
  emoji: TEmoji;
  duration: number;
};
