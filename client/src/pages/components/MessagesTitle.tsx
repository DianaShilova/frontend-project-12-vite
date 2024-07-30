import { useTranslation } from 'react-i18next';
import { IChannels } from '../../types/store';
import { Message } from 'yup';
import { getMessageFromQuantity } from '../../utils/getMessageFromQuantity';

interface Props {
  channels: IChannels;
  currentChannelId: string;
  filtered: Message[];
}

export const MessagesTitle = (props: Props) => {
  const { channels, currentChannelId, filtered } = props;
  const { t } = useTranslation();

  const messagesQuantity = filtered.length;

  return (
    <div className='messages-header'>
      <span>
        #{' '}
        {channels.entities[currentChannelId] &&
          channels.entities[currentChannelId].name}
        <br /> {messagesQuantity}{' '}
        {getMessageFromQuantity(messagesQuantity, {
          manyCase: t('message.numeral.manyCase'),
          genitiveCase: t('message.numeral.genitiveCase'),
          singularCase: t('message.numeral.nominativeCase'),
        })}
      </span>
    </div>
  );
};
