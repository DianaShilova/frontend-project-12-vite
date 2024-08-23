import { useEffect } from 'react';
import { Message, Messages, TPinnedMessage } from '../../types/store';
import MessageItem from './pinnedMessage/MessageItem';

interface Props {
  messages: Messages;
  filtered: Message[];
  currentChannelId: string;
  setPinnedMessage: (message: TPinnedMessage) => void;
  scrollToBottom: (messageId?: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const MessagesField = (props: Props) => {
  const {
    messages,
    filtered,
    currentChannelId,
    scrollToBottom,
    setPinnedMessage,
    messagesEndRef,
  } = props;

  const pinnedMessages = JSON.parse(
    localStorage.getItem('pinnedMessages') || '[]'
  );
  const hasPinnedMessage = pinnedMessages.some(
    (msg: TPinnedMessage) => msg.channelId === currentChannelId
  );

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
        setPinnedMessage={setPinnedMessage}
      />
    ));

  return (
    <div
      className={`${
        hasPinnedMessage ? 'h-[295px]' : 'h-[335px]'
      } sm:h-full overflow-y-auto p-[4px] sm:p-[12px] dark:bg-slate-800 dark:border-[1px] dark:border-blue-300 break-all overflow-wrap-anywhere`}
    >
      {messages ? (
        renderMessages()
      ) : (
        <span className='text-gray-500'>Loading</span>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
