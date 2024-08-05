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
      <div key={message.id}>
        <b>{message.name}</b>:{message.text}
      </div>
    ));

  return (
    <div className='messages-content'>
      {messages ? renderMessages() : <span>Loading</span>}
      <div ref={messagesEndRef} />
    </div>
  );
};
