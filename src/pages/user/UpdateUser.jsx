import React, { useEffect, useState } from 'react';
import { Modal, UserForm } from '../../components'; // Import your Form component
import { useDispatch } from 'react-redux';
import { getUser, updateUser } from '../../store/users/usersActions';

export const UpdateUser = (props) => {
  const {isOpen, onClose, userId} = props;
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
  const closeModal = () => {
    onClose();
  };
  function actionOnGet (data){
    setUser(data?.user);
  }
  useEffect(() => {
    dispatch(getUser(userId,{}, actionOnGet))
  },[userId])

  const handleSubmit = (formData) => {
    console.log(formData);
    dispatch(updateUser(userId, formData));
    closeModal(); 
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <UserForm onSubmit={handleSubmit} data={user}/>
      </Modal>
    </div>
  );
};
