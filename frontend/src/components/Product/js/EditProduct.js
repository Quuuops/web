import React from 'react';
import {Button} from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import {useModal} from "../../Base/ModalContext";
import Fields from "./Fields";

const EditProductButton = ({product, onError}) => {
    const navigate = useNavigate();
    const {openModal, closeModal} = useModal();
    const endpoint = `/product/${product.id}/`;
    const handleOpenModal = () => {
        const modalContent = {
            title: `Update ${product.name} Product`,
            body: <Fields product={product}/>,
            method: 'update',
            endpoint: endpoint,
        };
        openModal(modalContent, product);
    };

    return (
        <Button variant="primary" onClick={handleOpenModal} className="edit-button">Edit</Button>
    );
};

export default EditProductButton;
