import React from 'react';
import {Button, Form} from 'react-bootstrap';
import {useModal} from '../../Base/ModalContext';
import Fields from './Fields';

const AddProductButton = () => {
    const {openModal} = useModal();

    const handleOpenModal = () => {
        const modalContent = {
            title: 'Add Product',
            endpoint: '/product/',
            body: <Fields />,
            method: 'create',
        };
        openModal(modalContent);
    };

    return (
        <div>
            <Button variant="primary" onClick={handleOpenModal}>Add Product</Button>
        </div>
    );
};
export default AddProductButton;
