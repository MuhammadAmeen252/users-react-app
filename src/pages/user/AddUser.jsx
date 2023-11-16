import React from 'react';
import { Modal, UserForm } from '../../components'; // Import your Form component
import { useDispatch } from 'react-redux';
import { addUser } from '../../store/users/usersActions';

export const AddUser = (props) => {
  const {isOpen, onClose} = props;
  const dispatch = useDispatch();

  const closeModal = () => {
    onClose();
  };

  const handleSubmit = (formData) => {
    console.log(formData);
    dispatch(addUser(formData))
    closeModal(); 
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <UserForm onSubmit={handleSubmit} />
      </Modal>
    </div>
  );
};
