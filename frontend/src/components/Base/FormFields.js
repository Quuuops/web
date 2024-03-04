import React, {useState} from 'react';
import {Form, FormGroup, FormControl, FormLabel, Dropdown} from 'react-bootstrap';
import ImageUploading from 'react-images-uploading';

const TextComponent = ({ label, value, onChange, placeholder, name }) => {
  const handleChange = (event) => {
    const { name, value } = event.target; // Извлекаем имя и значение поля
    onChange(name, value); // Передаем имя поля и новое значение функции onChange
  };

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl
        type="text"
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};

const TextareaComponent = ({ label, value, onChange, placeholder, name }) => {
  const handleChange = (event) => {
    const { name, value } = event.target; // Извлекаем имя и значение поля
    onChange(name, value); // Передаем имя поля и новое значение функции onChange
  };

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      <FormControl
        as="textarea"
        value={value}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
      />
    </FormGroup>
  );
};


const SelectComponent = ({label, value, onChange, options, placeholder, name}) => (
    <FormGroup>
        <FormLabel>{label}</FormLabel>
        <Form.Select value={value} name={name} onChange={onChange}>
            <option value="">{placeholder}</option>
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </Form.Select>
    </FormGroup>
);

const ImageComponent = ({label, value, onChange, placeholder, name}) => {
    const [selectedImage, setSelectedImage] = useState(value);

    const handleImageChange = (imageList) => {
        const imageUrl = imageList && imageList.length > 0 ? imageList[0].data_url : null;
        setSelectedImage(imageUrl);
        onChange(name, imageUrl);
    };

    return (
        <FormGroup>
            <FormLabel>{label}</FormLabel>
            <ImageUploading
                value={selectedImage ? [{data_url: selectedImage}] : []}
                onChange={handleImageChange}
                dataURLKey="data_url"
                name={name}
                id={name}
            >
                {({onImageUpload}) => (
                    <div>
                        <button onClick={onImageUpload} name={name}>Upload Image</button>
                        {selectedImage && (
                            <img src={selectedImage} name={name} alt="Selected"
                                 style={{marginTop: '10px', maxWidth: '100%'}}/>
                        )}
                    </div>
                )}
            </ImageUploading>
        </FormGroup>
    );
};

const NumberComponent = ({label, name, placeholder, onChange, step = 1, value}) => {
    const [inputValue, setInputValue] = useState(value || ''); // Используйте value для установки начального состояния

    const handleIncrement = () => {
        setInputValue(prevValue => parseInt(prevValue) + step);
    };

    const handleDecrement = () => {
        setInputValue(prevValue => parseInt(prevValue) - step);
    };

    const handleChange = (event) => {
        const {value} = event.target;
        setInputValue(value);
    };

    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleDecrement}>-</button>
                </div>
                <input
                    type="number"
                    className="form-control"
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleChange}
                />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" onClick={handleIncrement}>+</button>
                </div>
            </div>
        </div>
    );
};
const form_field = (column, label, type, value, onChange,{
    options = [],
    placeholder = '',
    step = 1
} = {}) => {
    switch (type) {
        case 'text':
            return <TextComponent key={column} label={label} type={type} placeholder={placeholder} name={column}
                                  value={value} onChange={onChange}/>;
        case 'textarea':
            return <TextareaComponent key={column} label={label} type={type} placeholder={placeholder} name={column}
                                      value={value} onChange={onChange}/>;
        case 'select':
            if (!placeholder) {
                placeholder = `-- Please Select ${label} --`;
            }
            return <SelectComponent key={column} label={label} type={type} options={options} placeholder={placeholder}
                                    value={value} name={column} onChange={onChange}/>;
        case 'image':
            return <ImageComponent key={column} label={label} type={type} placeholder={placeholder}
                                   value={value} name={column} onChange={onChange}/>;
        case 'number':
            return <NumberComponent value={value} key={column} label={label} type={type} placeholder={placeholder}
                                    name={column} onChange={onChange} step={step}/>;
        default:
            return null;
    }
};

export default form_field;
