// FormWrapper.js
import React, {useState, createContext, useContext, Children, useEffect} from 'react';
import {Form} from 'react-bootstrap';
import {v4 as uuidv4} from 'uuid';

const FormDataContext = createContext(undefined);

const FormWrapper = ({formId = uuidv4(), children, onSubmit, onChange}) => {
    const [formData, setFormData] = useState({});

const handleChange = (event) => {
    if (event && event.target && event.target.name) {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
        if (typeof onChange === 'function') {
            onChange(event);
        }
    }
};


    const handleSubmit = (event) => {
        event.preventDefault();
    };

    return (
        <Form onSubmit={handleSubmit} onChange={onChange} encType="multipart/form-data">
            <FormDataContext.Provider value={formData}>
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child, {onChange: handleChange});
                    }
                    return child;
                })}
            </FormDataContext.Provider>
        </Form>
    );
};

export const useFormFormData = () => useContext(FormDataContext);

export default FormWrapper;
