import { useTranslation } from 'react-i18next';
import { IChannels } from '../types/store';
import { Message } from 'yup';
import { getMessageFromQuantity } from '../utils/getMessageFromQuantity';

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
    <div className='dark:bg-slate-800 border-b border-slate-200 dark:border-blue-300 p-[10px] sm:p-3'>
      <span className='text-lg font-semibold dark:text-white'>
        <span className='text-gray-600 dark:text-white mr-1'>#</span>
        {channels.entities[currentChannelId] &&
          channels.entities[currentChannelId].name}
      </span>
      <div className='text-sm text-gray-500 dark:text-light mt-1'>
        {messagesQuantity}{' '}
        {getMessageFromQuantity(messagesQuantity, {
          manyCase: t('message.numeral.manyCase'),
          genitiveCase: t('message.numeral.genitiveCase'),
          singularCase: t('message.numeral.nominativeCase'),
        })}
      </div>
    </div>
  );
};
