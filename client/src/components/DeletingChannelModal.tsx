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
      <Modal.Header closeButton>
        <Modal.Title>{t('deleteModal.deleteChannel')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('deleteModal.confirmation')}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          {t('deleteModal.cancel')}
        </Button>
        <Button variant='danger' onClick={handleDeleteClick}>
          {t('deleteModal.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletingChannelModal;
