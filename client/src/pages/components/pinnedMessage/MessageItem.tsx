// MessageItem.tsx
import React, { useState } from 'react';
import image from '../../../images/pin.png';

interface MessageItemProps {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
  setPinnedMessage: (message: any) => void;
}

const MessageItem: React.FC<MessageItemProps> = (props) => {
  const { id, content, authorId, channelId, setPinnedMessage } = props;

  const getPinnedMessages = () => {
    const pinnedMessages = localStorage.getItem('pinnedMessages');
    if (pinnedMessages) {
      return JSON.parse(pinnedMessages);
    }
    return [];
  };

  const pinnedMessages = getPinnedMessages();
  const isPinned = pinnedMessages.some(
    (msg: any) => msg.id === id && msg.channelId === channelId
  );

  const handlePin = () => {
    const pinnedMessages = getPinnedMessages();
    const parsedMessage = { id, channelId, authorId, content };

    const updatedPinnedMessages = pinnedMessages.filter(
      (msg: any) => msg.channelId !== channelId
    );
    updatedPinnedMessages.push(parsedMessage);

    localStorage.setItem(
      'pinnedMessages',
      JSON.stringify(updatedPinnedMessages)
    );
    setPinnedMessage(parsedMessage);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      id={`message-${id}`}
      className={`flex items-start message ${isPinned ? 'pinned' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='flex-grow overflow-hidden mr-2'>
        <span className='font-bold pr-[8px] dark:text-white whitespace-nowrap'>
          {authorId}:
        </span>
        <span className='break-words dark:text-white'>{content}</span>
      </div>
      {!isPinned && (
        <button
          onClick={handlePin}
          className='flex-shrink-0 mt-1 transition-opacity duration-200 dark:invert'
          aria-label='Pin message'
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <img
            src={image}
            alt='Pin'
            className='w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] object-contain'
          />
        </button>
      )}
    </div>
  );
};

export default MessageItem;
