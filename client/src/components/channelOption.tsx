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
      <Dropdown.Toggle variant='Secondary' id={id}>
        <span className='visually-hidden'>{t('channelMenu.control')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onDelete()}>
          {t('channelMenu.delete')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => onEdit()}>
          {t('channelMenu.rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelOption;
