import { useCallback, useContext, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import {
  addChannels,
  addChannel,
  setChannel,
  removeChannel,
  updateChannel,
} from '../slices/channelsSlice';
import {
  addMessages,
  removeMessages,
  addMessage,
} from '../slices/messagesSlice';
import { AuthContext } from '../contexts/authContext';

// const serverUrl = process.env.REACT_APP_SERVER_URL;

const useData = () => {
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext);
  const channelId = useSelector((store) => store.channels.currentChannelId);
  const navigate = useNavigate();

  const headers = useMemo(() => {
    if (authContext.isAuthenticated) {
      return {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      };
    }
    return {};
  }, [authContext.isAuthenticated]);

  useEffect(() => {
    const channelsRequest = axios.get('/api/v1/channels', { headers });
    const messagesRequest = axios.get('/api/v1/messages', { headers });

    Promise.all([channelsRequest, messagesRequest])
      .then(([channelsData, messagesData]) => {
        dispatch(addChannels(channelsData.data));
        dispatch(addMessages(messagesData.data));
      })
      .catch((error) => {
        if (error.statusCode === 401) {
          navigate('/login');
        }
      });
  }, [dispatch, headers, navigate]);

  const socket = useMemo(() => {
    if (authContext.isAuthenticated) {
      return io();
    }
    return null;
  }, [authContext.isAuthenticated]);

  const handleSetChannel = useCallback(
    (id) => {
      dispatch(setChannel(id));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!socket) {
      return navigate('/login');
    }
    const handleNewMessage = (message) => {
      dispatch(addMessage(message));
    };
    socket.on('newMessage', handleNewMessage);

    const handleNewChannel = (channel) => {
      dispatch(addChannel(channel));
    };
    socket.on('newChannel', handleNewChannel);

    const handleRemoveChannel = (channel) => {
      dispatch(removeChannel(channel.id));
      handleSetChannel('1');
      dispatch(removeMessages(channel.id));
    };
    socket.on('removeChannel', handleRemoveChannel);

    const handleEditChannel = ({ id, name }) => {
      dispatch(updateChannel({ id, name }));
    };
    socket.on('renameChannel', handleEditChannel);

    return () => {
      socket.off('newMessage', handleNewMessage);
      socket.off('newChannel', handleNewChannel);
      socket.off('removeChannel', handleRemoveChannel);
      socket.off('renameChannel', handleEditChannel);
    };
  }, [socket, dispatch, navigate, handleSetChannel]);

  const sendMessage = async (value) =>
    axios.post(
      '/api/v1/messages',
      {
        text: value,
        name: authContext.username,
        channelId,
      },
      { headers }
    );

  const sendChannel = async (channelName) =>
    axios.post(
      '/api/v1/channels',
      {
        name: channelName,
      },
      { headers }
    );

  const deleteChannel = async (id) =>
    axios.delete(`/api/v1/channels/${id}`, { headers });

  const renameChannel = async (id, name) =>
    axios.patch(
      `/api/v1/channels/${id}`,
      {
        id,
        name,
      },
      { headers }
    );

  return {
    sendMessage,
    sendChannel,
    handleSetChannel,
    deleteChannel,
    renameChannel,
  };
};

export default useData;
