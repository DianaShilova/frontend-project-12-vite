import React, { useState, useContext, useMemo, useCallback } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useData from '../hooks/useData';
import ChannelModal from '../components/ChannelModal';
import DeletingChannelModal from '../components/DeletingChannelModal';
import { AuthContext } from '../contexts/authContext';

import './home.css';
import { IRootState } from '../slices';
import { IChannels, Messages } from '../types/store';
import { Navbar } from './components/Navbar';
import { Channels } from './components/Channels';
import { MessagesField } from './components/MessagesField';
import { MessagesTitle } from './components/MessagesTitle';
import { MessageInput } from './components/MessageInput';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const [input, setInput] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const { t } = useTranslation();

  const {
    sendMessage,
    sendChannel,
    handleSetChannel,
    deleteChannel,
    renameChannel,
  } = useData();

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
      toast.success(t('delete'));
    } catch {
      console.log('error');
    } finally {
      setSelectedChannel(null);
    }
  };

  const handleSubmitMessage = useCallback(
    async (e: React.FormEvent): Promise<void> => {
      e.preventDefault();
      try {
        await sendMessage(filter.clean(input));
        setInput('');
      } catch (error) {
        console.log('error', error);
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
        toast.success(t('add'));
      } else {
        await renameChannel(selectedChannel, filter.clean(values.channelName));
        toast.success(t('rename'));
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

      <main className='chat-body'>
        <div className='body-container flex flex-col sm:flex-row shadow'>
          <Channels
            channels={channels}
            onAddChannel={handleAddChannel}
            setSelectedChannel={setSelectedChannel}
            setIsOpenModal={setIsOpenModal}
            setIsOpenModalDelete={setIsOpenModalDelete}
            currentChannelId={currentChannelId}
            onSetChannel={handleSetChannel}
          />
          <section className='messages-container'>
            <MessagesTitle
              channels={channels}
              currentChannelId={currentChannelId}
              filtered={filtered}
            />
            <MessagesField filtered={filtered} messages={messages} />
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
