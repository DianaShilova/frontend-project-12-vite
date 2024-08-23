import { useEffect } from 'react';
import image from '../../../images/pin.png';

const PinnedMessage = (props: {
  pinnedMessage: any;
  setPinnedMessage: (message: any) => void;
  currentChannelId: string;
}) => {
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
    <div className='pinned-message flex items-center justify-between dark:border-x-[1px] dark:border-blue-300 bg-gray-100 dark:bg-slate-700 p-2'>
      <button
        className='text-justify line-clamp-1 text-slate-500 hover:text-slate-700 transition-colors w-full text-left'
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
        className='flex ml-2 text-slate-500 hover:text-slate-700 transition-colors dark:invert'
        onClick={handleUnpin}
        aria-label='Unpin message'
      >
        <img
          src={image}
          alt='Pin'
          className='w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] object-contain'
        />
      </button>
    </div>
  );
};

export default PinnedMessage;
