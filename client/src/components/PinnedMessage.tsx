import { useEffect } from 'react';

interface Props {
  pinnedMessage: any;
  setPinnedMessage: (message: any) => void;
  currentChannelId: string;
}

export const PinnedMessage = (props: Props) => {
  const { pinnedMessage, setPinnedMessage, currentChannelId } = props;

  const getPinnedMessage = () => {
    const pinnedMessages = JSON.parse(
      localStorage.getItem('pinnedMessages') || '[]'
    );
    return (
      pinnedMessages.find(
        (message: any) => message.channelId === currentChannelId
      ) || null
    );
  };

  useEffect(() => {
    const message = getPinnedMessage();
    if (message) {
      setPinnedMessage(message);
    } else {
      setPinnedMessage(null);
    }
  }, [currentChannelId]);

  const handleUnpin = () => {
    const pinnedMessages = JSON.parse(
      localStorage.getItem('pinnedMessages') || '[]'
    );
    const updatedMessages = pinnedMessages.filter(
      (message: any) => message.channelId !== currentChannelId
    );
    localStorage.setItem('pinnedMessages', JSON.stringify(updatedMessages));
    setPinnedMessage(null);
  };

  if (!pinnedMessage) {
    return null;
  }

  const scrollToMessage = (messageId: string) => {
    const messageElement = document.getElementById(`message-${messageId}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleMessageClick = () => {
    if (pinnedMessage && pinnedMessage.id) {
      scrollToMessage(pinnedMessage.id);
    }
  };

  if (!pinnedMessage) {
    return null;
  }

  return (
    <div className='pinned-message flex items-center justify-between dark:border-x-[1px] dark:border-blue-300 bg-gray-100 dark:bg-slate-700 py-2 px-[12px]'>
      <button
        className='text-justify line-clamp-1 text-slate-500 hover:text-blue-900 w-full text-left'
        onClick={handleMessageClick}
        aria-label='Go to pinned message'
      >
        <span className='text-slate-700 dark:text-white'>
          {pinnedMessage.authorId}:{' '}
        </span>
        <span className='text-slate-500 dark:text-slate-300 break-all max-w-full pl-[3px]'>
          {pinnedMessage.content}
        </span>
      </button>
      <button
        className='flex ml-2 text-slate-500 dark:text-slate-200'
        onClick={handleUnpin}
        aria-label='Unpin message'
      >
        <svg
          className='w-5 h-5 '
          viewBox='0 0 24 24'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <circle
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='2'
          />
          <path
            d='M15 9L9 15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
          <path
            d='M9 9L15 15'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
          />
        </svg>
      </button>
    </div>
  );
};
