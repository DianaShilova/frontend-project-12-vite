import React, { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from 'leo-profanity';
import useData from '../hooks/useData';
import ChannelModal from '../components/ChannelModal';
import ChannelOption from '../components/channelOption';
import DeletingChannelModal from '../components/DeletingChannelModal';
import { AuthContext } from '../contexts/authContext';

import './home.css';
import { IRootState } from '../slices';
import { Channels, Messages } from '../types/store';

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

  const channels = useSelector<IRootState, Channels>((state) => {
    if (state && state.channels) {
      return state.channels;
    }
    return {} as Channels;
  });

  const messages = useSelector<IRootState, Messages>((store) => {
    if (store && store.messages) {
      return store.messages;
    }
    return {} as Messages;
  });

  const currentChannelId = useSelector<IRootState, string | ''>((store) => {
    if (store && store.channels) {
      if (store.channels.currentChannelId) {
        return store.channels.currentChannelId;
      }
    }

    return '';
  });

  const filtered = Object.values(messages.entities).filter(
    (message) => message.channelId === currentChannelId
  );

  const messagesQuantity = filtered.length;

  type TWordMessage = {
    manyCase: string;
    singularCase: string;
    genitiveCase: string;
  };

  const wordMessage = (quantity: number, word: TWordMessage): string => {
    // getMessageFroQuantity
    const lastNumber = quantity % 10;
    if (quantity === 0) {
      return word.manyCase;
    }
    if (quantity > 4 && quantity < 21) {
      return word.manyCase;
    }
    if (lastNumber === 1) {
      return word.singularCase;
    }
    if (lastNumber > 1 && lastNumber < 5) {
      return word.genitiveCase;
    }
    return word.manyCase;
  };

  const handleOpenDeleteModal = (id: string): void => {
    setSelectedChannel(id);
    setIsOpenModalDelete(true);
  };

  const handleOpenEditModal = (selectedChannel: string): void => {
    setSelectedChannel(selectedChannel);
    setIsOpenModal(true);
  };

  const handleCloseChannelModal = (): void => {
    setIsOpenModal(false);
  };

  const renderChannels = (): JSX.Element[] =>
    channels.ids.map((id: string) => (
      <li key={id}>
        <div
          className={
            currentChannelId === id ? 'group-channel active' : 'group-channel'
          }
        >
          <button
            className={
              currentChannelId === id
                ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary'
                : 'channels-button'
            }
            name={channels.entities[id].name}
            onClick={() => handleSetChannel(id)}
            id={channels.entities[id].name}
            type='button'
          >
            <span className='me-1'>#</span>
            {channels.entities[id].name}
          </button>
          {channels.entities[id].removable && (
            <ChannelOption
              id={id}
              onDelete={() => handleOpenDeleteModal(id)}
              onEdit={() => handleOpenEditModal(id)}
            />
          )}
        </div>
      </li>
    ));

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

  const renderMessages = (): JSX.Element[] =>
    filtered.map((message: any) => (
      <div key={message.id}>
        <b>{message.name}</b>:{message.text}
      </div>
    ));

  const handleSubmitMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await sendMessage(filter.clean(input));
      setInput('');
    } catch (error) {
      console.log('error', error);
    }
  };

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
    <>
      <header>
        <nav>
          <div className='navbarcontainer'>
            <a className='nav-login' href='/login'>
              Hexlet Chat
            </a>
            <button type='button' onClick={authContext.logout}>
              {t('nav.exit')}
            </button>
          </div>
        </nav>
      </header>
      <main className='chat-body'>
        <div className='body-container shadow'>
          <section className='channels-container'>
            <header className='channels-header'>
              <b>{t('channelsContainer.channel')}</b>
              <button
                type='button'
                className='channels-add'
                onClick={handleAddChannel}
              >
                +
              </button>
            </header>
            {channels ? (
              <ul className='channels-list'>{renderChannels()}</ul>
            ) : (
              <span>Loading</span>
            )}
          </section>
          <section className='messages-container'>
            <div className='messages-header'>
              <span>
                #{' '}
                {channels.entities[currentChannelId] &&
                  channels.entities[currentChannelId].name}
                <br /> {messagesQuantity}{' '}
                {wordMessage(messagesQuantity, {
                  manyCase: t('message.numeral.manyCase'),
                  genitiveCase: t('message.numeral.genitiveCase'),
                  singularCase: t('message.numeral.nominativeCase'),
                })}
              </span>
            </div>
            <div className='messages-content'>
              {messages ? renderMessages() : <span>Loading</span>}
            </div>
            <form className='messages-form' onSubmit={handleSubmitMessage}>
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
    </>
  );
};

export default HomePage;
