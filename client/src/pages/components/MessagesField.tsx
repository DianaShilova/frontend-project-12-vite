import { useEffect, useRef } from 'react';
import { Message, Messages } from '../../types/store';

interface Props {
  messages: Messages;
  filtered: Message[];
}

export const MessagesField = (props: Props) => {
  const { messages, filtered } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [filtered]);

  const renderMessages = (): JSX.Element[] =>
    filtered.map((message: Message) => (
      <div key={message.id} className='mb-2'>
        <b className='font-bold mr-1'>{message.name}</b>
        <span className='text-gray-700'>{message.text}</span>
      </div>
    ));

  return (
    <div className='h-[305px] sm:h-full overflow-y-auto p-4 bg-white break-words'>
      {messages ? (
        renderMessages()
      ) : (
        <span className='text-gray-500'>Loading</span>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};
