import React, {
  useState,
  useContext,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useData from '../hooks/useData';
import ChannelModal from '../components/ChannelModal';
import DeletingChannelModal from '../components/DeletingChannelModal';
import { AuthContext } from '../contexts/authContext';
import PinnedMessage from '../pages/components/pinnedMessage/PinnedMessage';
import './home.css';
import { IRootState } from '../slices';
import { IChannels, Messages, TEmoji, TPinnedMessage } from '../types/store';
import { Navbar } from './components/Navbar';
import { Channels } from './components/Channels';
import { MessagesField } from './components/MessagesField';
import { MessagesTitle } from './components/MessagesTitle';
import { MessageInput } from './components/MessageInput';
import EmojiAnimation from './components/animation/EmojiAnimation';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [input, setInput] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const [emoji, setEmoji] = useState<TEmoji>('/love');
  const [pinnedMessage, setPinnedMessage] = React.useState<TPinnedMessage | ''>(
    ''
  );
  const { t } = useTranslation();
  const isDarkMode = document.documentElement.classList.contains('dark');
  const animationQueue = useRef(Promise.resolve());

  const {
    sendMessage,
    sendChannel,
    handleSetChannel,
    deleteChannel,
    renameChannel,
  } = useData();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const channels = useSelector<IRootState, IChannels>((state) => {
    if (state && state.channels) {
      return state.channels;
    }
    return {} as IChannels;
  });

  const messages = useSelector<IRootState, Messages>((store) => {
    if (store && store.messages) {
      return store.messages as Messages;
    }
    return { ids: [], entities: {} } as Messages;
  });

  const currentChannelId = useSelector<IRootState, string | ''>((store) => {
    if (store && store.channels) {
      if (store.channels.currentChannelId) {
        return store.channels.currentChannelId;
      }
    }

    return '';
  });

  const filtered = useMemo(
    () =>
      Object.values(messages.entities).filter(
        (message) => message.channelId === currentChannelId
      ),
    [currentChannelId, messages]
  );

  const handleCloseChannelModal = (): void => {
    setIsOpenModal(false);
  };

  const handleDeleteChannel = async (): Promise<void> => {
    try {
      await deleteChannel(selectedChannel);
      if (isDarkMode) {
        toast.success(t('delete'), { theme: 'dark' });
      } else {
        toast.success(t('delete'), { theme: 'light' });
      }
    } catch {
      console.log('error');
    } finally {
      setSelectedChannel(null);
    }
  };

  const runAnimation = (emojiType: TEmoji, duration: number) => {
    return new Promise<void>((resolve) => {
      setEmoji(emojiType);
      setShowEmoji(true);
      setTimeout(() => {
        setShowEmoji(false);
        setTimeout(resolve, 100);
      }, duration);
    });
  };

  const queueAnimation = (emojiType: TEmoji, duration: number) => {
    animationQueue.current = animationQueue.current.then(() =>
      runAnimation(emojiType, duration)
    );
  };

  const handleSubmitMessage = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      const trimmedInput = input.trim();

      if (trimmedInput !== '') {
        try {
          if (trimmedInput.startsWith('/')) {
            queueAnimation(trimmedInput as TEmoji, 1000);
          }

          await sendMessage(filter.clean(trimmedInput));
          setInput('');
        } catch (error) {
          console.log('error', error);
        }
      }
    },
    [input, sendMessage]
  );

  const handleSubmitChannel = async (values: {
    channelName: string;
  }): Promise<void> => {
    try {
      if (!selectedChannel) {
        const { data } = await sendChannel(filter.clean(values.channelName));
        handleSetChannel(data.id);
        if (isDarkMode) {
          toast.success(t('add'), {
            theme: 'dark',
          });
        } else {
          toast.success(t('add'), {
            theme: 'light',
          });
        }
      } else {
        await renameChannel(selectedChannel, filter.clean(values.channelName));
        if (isDarkMode) {
          toast.success(t('rename'), {
            theme: 'dark',
          });
        } else {
          toast.success(t('rename'), {
            theme: 'light',
          });
        }
      }
      handleCloseChannelModal();
      setSelectedChannel(null);
    } catch (e) {
      console.log('error:', e);
    }
  };

  const handleAddChannel = (): void => {
    setIsOpenModal(true);
  };

  const handleCloseDeleteModal = (): void => {
    setIsOpenModalDelete(false);
  };

  if (!authContext.isAuthenticated) {
    return <Navigate to='/login' />;
  }
  return (
    <div className='flex flex-col h-screen'>
      <header>
        <Navbar isLogin={true} />
      </header>

      <main className='dark:bg-slate-900 chat-body'>
        <div className='shadow-xl shadow-slate-500/40 m-[0px] sm:m-[24px] w-full flex flex-col sm:flex-row shadow'>
          {showEmoji && <EmojiAnimation command={emoji} />}
          <Channels
            channels={channels}
            onAddChannel={handleAddChannel}
            setSelectedChannel={setSelectedChannel}
            setIsOpenModal={setIsOpenModal}
            setIsOpenModalDelete={setIsOpenModalDelete}
            currentChannelId={currentChannelId}
            onSetChannel={handleSetChannel}
          />
          <section className='messages-container dark:bg-slate-900 overflow-hidden'>
            <MessagesTitle
              channels={channels}
              currentChannelId={currentChannelId}
              filtered={filtered}
            />
            <PinnedMessage
              currentChannelId={currentChannelId}
              pinnedMessage={pinnedMessage}
              setPinnedMessage={setPinnedMessage}
            />
            <MessagesField
              currentChannelId={currentChannelId}
              filtered={filtered}
              messages={messages}
              scrollToBottom={scrollToBottom}
              messagesEndRef={messagesEndRef}
              setPinnedMessage={setPinnedMessage}
            />
            <MessageInput
              input={input}
              setInput={setInput}
              onSubmitMessage={handleSubmitMessage}
            />
          </section>
        </div>
      </main>
      <ChannelModal
        onSubmit={handleSubmitChannel}
        isOpen={isOpenModal}
        onClose={handleCloseChannelModal}
        id={selectedChannel}
      />
      <DeletingChannelModal
        onSubmit={handleDeleteChannel}
        isOpen={isOpenModalDelete}
        onClose={handleCloseDeleteModal}
      />
    </div>
  );
};

export default HomePage;
