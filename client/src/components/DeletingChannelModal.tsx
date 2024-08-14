import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeletingChannelModal = (props: IProps) => {
  const { isOpen, onClose, onSubmit } = props;
  const { t } = useTranslation();

  const handleDeleteClick = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header
        closeButton
        className='dark:bg-gray-700 dark:border-[1px] dark:border-blue-300'
      >
        <Modal.Title className='dark:text-blue-300 '>
          {t('deleteModal.deleteChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='dark:bg-gray-700 dark:text-blue-100 dark:border-[1px] dark:border-blue-300'>
        {t('deleteModal.confirmation')}
      </Modal.Body>
      <Modal.Footer className='dark:bg-gray-700 dark:border-[1px] dark:border-blue-300'>
        <Button
          variant='secondary'
          onClick={onClose}
          className='dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
        >
          {t('deleteModal.cancel')}
        </Button>
        <Button
          variant='danger'
          onClick={handleDeleteClick}
          className='dark:bg-red-600 dark:hover:bg-red-700'
        >
          {t('deleteModal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletingChannelModal;
