import { Message, Messages } from '../../types/store';

interface Props {
  messages: Messages;
  filtered: Message[];
}
export const MessagesField = (props: Props) => {
  const { messages, filtered } = props;

  const renderMessages = (): JSX.Element[] =>
    filtered.map((message: any) => (
      <div key={message.id}>
        <b>{message.name}</b>:{message.text}
      </div>
    ));

  return (
    <div className='messages-content'>
      {messages ? renderMessages() : <span>Loading</span>}
    </div>
  );
};
