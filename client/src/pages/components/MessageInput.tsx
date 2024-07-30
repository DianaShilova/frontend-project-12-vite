import { useTranslation } from 'react-i18next';

interface Props {
  input: string;
  setInput: (value: string) => void;
  onSubmitMessage: (e: React.FormEvent) => Promise<void>;
}

export const MessageInput = (props: Props) => {
  const { onSubmitMessage, input, setInput } = props;
  const { t } = useTranslation();

  return (
    <form className='messages-form' onSubmit={onSubmitMessage}>
      <div className='messages-input-wrapper'>
        <input
          className='messages-input'
          aria-label='Новое сообщение'
          placeholder={t('message.messagesPlaceholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          aria-label='message-send'
          type='button'
          className='messages-send'
        />
      </div>
    </form>
  );
};
