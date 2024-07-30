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
            onClick={() => onSetChannel(id)}
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

  return (
    <section className='channels-container'>
      <header className='channels-header'>
        <b>{t('channelsContainer.channel')}</b>
        <button type='button' className='channels-add' onClick={onAddChannel}>
          +
        </button>
      </header>
      {channels ? (
        <ul className='channels-list'>{renderChannels()}</ul>
      ) : (
        <span>Loading</span>
      )}
    </section>
  );
};
