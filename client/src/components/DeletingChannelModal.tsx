import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const DeletingChannelModal = (props: IProps) => {
  const { isOpen, onClose, onSubmit } = props;
  const handleDeleteClick = () => {
    onSubmit();
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>Уверены?</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onClose}>
          Отменить
        </Button>
        <Button variant='danger' onClick={handleDeleteClick}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletingChannelModal;
