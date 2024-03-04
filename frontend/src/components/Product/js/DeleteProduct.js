// DeleteProductButton.js
import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import productEndpoints from '../../Api/product';
import {useNavigate} from 'react-router-dom';
import {useModal} from "../../Base/ModalContext";

const DeleteProductButton = ({productId, onError}) => {

    const {openModal, closeModal} = useModal();
    const handleOpenModal = () => {
        const modalContent = {
            title: 'Delete Product',
            body: 'Are you sure you want to delete this product?',
            onSubmit: () => handleDelete(productId),
            saveButtonText: 'Delete',
            method: 'delete'
        };
        openModal(modalContent);
    };

    const navigate = useNavigate();
    const handleDelete = async (productId) => {
        try {
            await productEndpoints.deleteProduct(productId);
            navigate('/product/');
            closeModal();
        } catch (error) {
            console.error('Error deleting product:', error);
            if (onError) {
                onError(error);
            }
        }
    };


    return (
        <Button variant="danger" onClick={handleOpenModal} className="delete-button">Delete</Button>
    );
};

export default DeleteProductButton;
