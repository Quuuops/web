import React, {createContext, useState, useContext} from 'react';
import {Modal as BootstrapModal, Button} from 'react-bootstrap';
import Api from '../Api/api';
import FormWrapper from "./Form";

const ModalContext = createContext(undefined);
const FormContext = createContext(undefined);

export const ModalProvider = ({children}) => {
    const [modalContent, setModalContent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalError, setModalError] = useState(null);
    const [formData, setFormData] = useState({}); // Состояние для данных формы


    const openModal = (content, initialFormData = {}) => {
        setModalContent(content);
        setFormData(initialFormData); // Установите начальные значения данных формы
        setShowModal(true);
    };


    const closeModal = () => {
        setModalContent(null);
        setShowModal(false);
        setModalError(null);
        setFormData(null)
    };

    const handleChange = (event) => {
        const {name, value, type} = event.target;

        if (type === 'file') {
            const selectedFile = event.target.files[0]; // Получаем выбранный файл
            setFormData({...formData, ['images']: selectedFile});
        } else {
            setFormData({...formData, [name]: value});
        }
    };

    const handleSave = async (endpoint, method) => {
        let api;
        if (method === 'delete') {
            api = Api();
        } else {
            if (!formData) {
                setModalError('Please fill out the form.');
                return;
            }

            const hasFiles = Object.values(formData).some(value => value instanceof File);
            api = Api({multipart: hasFiles});
        }
        try {
            switch (method) {
                case 'create':
                    await api.post(endpoint, formData);
                    break;
                case 'update':
                    await api.put(endpoint, formData);
                    break;
                case 'delete':
                    await api.delete(endpoint);
                    break;
                default:
                    break;
            }
            closeModal();
            window.location.reload();
        } catch (error) {
            setModalError(error.response.request.responseText);
        }
    };

    return (
        <ModalContext.Provider value={{openModal, closeModal, modalError}}>
            <FormContext.Provider value={{handleSave}}>
                {children}
                <Modal
                    show={showModal}
                    onHide={closeModal}
                    content={modalContent}
                    onChange={handleChange}
                />
            </FormContext.Provider>
        </ModalContext.Provider>
    );
};

export const useForm = () => useContext(FormContext); // Хук для доступа к данным формы
export const useModal = () => useContext(ModalContext);

const Modal = ({show, onHide, content, onChange}) => {
    const {handleSave} = useForm();
    const {modalError} = useModal();

    if (!content) {
        return null;
    }

    const {
        title,
        body,
        onSave = () => {
        },
        saveButtonText = 'Save',
        endpoint,
        onSubmit,
        method = 'create',
    } = content;

    const handleSaveClick = async () => {
        if (onSubmit) {
            onSubmit();
        } else {
            await handleSave(endpoint, method);
        }
    };

    return (
        <BootstrapModal show={show} onHide={onHide}>
            <BootstrapModal.Header closeButton>
                <BootstrapModal.Title>{title}</BootstrapModal.Title>
            </BootstrapModal.Header>
            {modalError && <div className="error-message">{modalError}</div>}
            <BootstrapModal.Body>
                <FormWrapper onChange={onChange}>
                    {body}
                </FormWrapper>
            </BootstrapModal.Body>
            <BootstrapModal.Footer style={{justifyContent: 'space-between'}}>
                <div>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                </div>
                <div>
                    <Button variant="primary" onClick={handleSaveClick}>
                        {saveButtonText || 'Save'}
                    </Button>
                </div>
            </BootstrapModal.Footer>
        </BootstrapModal>
    );
};

export default Modal;