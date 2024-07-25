import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

interface IProps {
  id: string;
  onDelete: () => void;
  onEdit: () => void;
}
const ChannelOption = (props: IProps) => {
  const { id, onDelete, onEdit } = props;
  return (
    <Dropdown>
      <Dropdown.Toggle variant="Secondary" id={id}>
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => onDelete()}>Удалить</Dropdown.Item>
        <Dropdown.Item onClick={() => onEdit()}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ChannelOption;
