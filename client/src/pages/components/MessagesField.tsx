import { useEffect, useRef } from 'react';
import { Message, Messages } from '../../types/store';
import PinnedMessage from './pinnedMessage/PinnedMessage';
import MessageItem from './pinnedMessage/MessageItem';

interface Props {
  messages: Messages;
  filtered: Message[];
  currentChannelId: string;
}

export const MessagesField = (props: Props) => {
  const { messages, filtered, currentChannelId } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filtered]);

  const renderMessages = (): JSX.Element[] =>
    filtered.map((message: Message) => (
      <MessageItem
      key={message.id}
      {...message}
      channelId={currentChannelId}
      id={message.id}
      content={message.text}
      authorId={message.name}
    />
    ));

  return (
    <div className='h-[305px] sm:h-full overflow-y-auto p-4 dark:bg-slate-800 dark:border-[1px] dark:border-blue-300 break-all overflow-wrap-anywhere'>
      <PinnedMessage channelId={currentChannelId} />
      {messages ? (
        renderMessages()
      ) : (
        <span className='text-gray-500'>Loading</span>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
