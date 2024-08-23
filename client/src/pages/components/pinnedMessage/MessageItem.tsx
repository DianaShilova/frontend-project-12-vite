// MessageItem.tsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pinMessage } from '../../../slices/channelsSlice';
import { IRootState } from '../../../slices';
import image from '../../../images/pin.png';

interface MessageItemProps {
  id: string;
  content: string;
  authorId: string;
  channelId: string;
}

const MessageItem: React.FC<MessageItemProps> = ({ id, content, authorId, channelId }) => {
  const dispatch = useDispatch();
  const pinnedMessageId = useSelector((state: IRootState) => 
    state.channels.entities[channelId]?.pinnedMessage?.id ?? '');

  const handlePin = () => {
    dispatch(pinMessage({
      channelId,
      message: { id, content, authorId, channelId }
    }));
    localStorage.setItem('pinnedMessageId', id);
  };

  const isPinned = id === pinnedMessageId;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`flex items-start message ${isPinned ? 'pinned' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex-grow overflow-hidden mr-2">
        <span className='font-bold pr-[8px] whitespace-nowrap'>{authorId}:</span>
        <span className="break-words">{content}</span>
      </div>
      {!isPinned && (
        <button 
          onClick={handlePin}
          className="flex-shrink-0 mt-1 transition-opacity duration-200"
          aria-label="Pin message"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <img 
            src={image}
            alt="Pin"
            className="w-5 h-5 min-w-[20px] min-h-[20px] max-w-[20px] max-h-[20px] object-contain"
          />
        </button>
      )}
    </div>
  );
};

export default MessageItem;
