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
    <form
      className='flex items-center p-3 border-t border-gray-200'
      onSubmit={onSubmitMessage}
    >
      <div className='relative flex-grow'>
        <input
          className='w-full py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label='Новое сообщение'
          placeholder={t('message.messagesPlaceholder')}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
        <button
          aria-label='message-send'
          type='submit'
          className='absolute right-1 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
