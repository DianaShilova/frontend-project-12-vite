import { useTranslation } from 'react-i18next';
import { IChannels } from '../../types/store';
import ChannelOption from '../../components/channelOption';

interface Props {
  channels: IChannels;
  onAddChannel: () => void;
  setSelectedChannel: (id: string) => void;
  setIsOpenModal: (value: boolean) => void;
  setIsOpenModalDelete: (value: boolean) => void;
  currentChannelId: string;
  onSetChannel: (id: string) => void;
}

console.log(123);

export const Channels = (props: Props) => {
  const {
    channels,
    onAddChannel,
    setSelectedChannel,
    currentChannelId,
    setIsOpenModalDelete,
    setIsOpenModal,
    onSetChannel,
  } = props;
  const { t } = useTranslation();

  const handleOpenDeleteModal = (id: string): void => {
    setSelectedChannel(id);
    setIsOpenModalDelete(true);
  };

  const handleOpenEditModal = (selectedChannel: string): void => {
    setSelectedChannel(selectedChannel);
    setIsOpenModal(true);
  };

  const renderChannels = () =>
    channels.ids.map((id) => (
      <li key={id}>
        <div className='group-channel'>
          <button
            className={`w-full max-w-full rounded-md text-left px-3 py-2 transition-colors duration-200 truncate ${
              currentChannelId === id
                ? 'bg-blue-500 dark:bg-blue-800 text-white'
                : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-white '
            }`}
            onClick={() => onSetChannel(id)}
            type='button'
          >
            <span className='mr-1'>#</span>
            <span className='truncate'>{channels.entities[id].name}</span>
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

  return (
    <div className='dark:bg-slate-800 w-full border-r dark:border-[1px] dark:border-blue-300 sm:border-gray-200 sm:w-[350px] bg-gray-50 p-2 sm:p-4 flex flex-col h-[270px] sm:h-full'>
      <div className='flex h-[50px] justify-between items-center px-2 py-3 mb-3'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-blue-200 pt-2'>
          {t('channelsContainer.channel')}
        </h2>
        <button
          type='button'
          className='bg-blue-500 dark:bg-blue-800 text-white rounded-full p-2 hover:bg-blue-600 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200'
          onClick={onAddChannel}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-5 w-5'
            viewBox='0 0 20 20'
            fill='currentColor'
          >
            <path
              fillRule='evenodd'
              d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'
              clipRule='evenodd'
            />
          </svg>
        </button>
      </div>
      {channels ? (
        <ul className='list-none p-0 m-0 overflow-y-auto flex-grow'>
          {renderChannels()}
        </ul>
      ) : (
        <span>Loading</span>
      )}
    </div>
  );
};
