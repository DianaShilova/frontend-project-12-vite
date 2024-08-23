
// PinnedMessage.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { unpinMessage } from '../../../slices/channelsSlice'
import { IRootState } from '../../../slices';

interface PinnedMessageProps {
  channelId: string;
}

const PinnedMessage: React.FC<PinnedMessageProps> = ({ channelId }) => {
  const dispatch = useDispatch();
  const pinnedMessage = useSelector((state: IRootState) => 
    state.channels.entities[channelId]?.pinnedMessage
  );

  const handleUnpin = () => {
    dispatch(unpinMessage(channelId));
  };

  if (!pinnedMessage) {
    return null;
  }

  return (
    <div className="pinned-message flex mb-[10px] items-center justify-between bg-gray-100 p-2 rounded">
      <button 
        className='text-justify text-slate-500 hover:text-slate-700 transition-colors'
        onClick={handleUnpin}
        aria-label="Unpin message"
      >
        <span className='text-slate-700'>{pinnedMessage.authorId}: </span>
        <span className='text-slate-500'>{pinnedMessage.content}</span>
      </button>
    </div>
  );
};

export default PinnedMessage;
