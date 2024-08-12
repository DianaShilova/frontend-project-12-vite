import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';

interface IProps {
  id: string;
  onDelete: () => void;
  onEdit: () => void;
}
const ChannelOption = (props: IProps) => {
  const { id, onDelete, onEdit } = props;
  const { t } = useTranslation();

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant='Secondary'
        id={id}
        className='dark:text-white dark:hover:text-blue-600 active:text-blue-600 focus:text-blue-600 after:text-blue-600'
      >
        <span className='visually-hidden '>{t('channelMenu.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu className='dark:bg-slate-800 dark:border-[1px] dark:border-blue-300'>
        <Dropdown.Item
          className='dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white'
          onClick={() => onDelete()}
        >
          {t('channelMenu.delete')}
        </Dropdown.Item>
        <Dropdown.Item
          className='dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:hover:text-white'
          onClick={() => onEdit()}
        >
          {t('channelMenu.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelOption;
