import React, {useEffect, useState} from 'react';
import form_field from '../../Base/FormFields';
import productEndpoints from '../../Api/product';

const ProductFormFields = ({product = {}, onChange}) => {
    const defaultProduct = {
        name: '',
        description: '',
        status: '',
        price: '',
        supplier: '',
        brand: '',
        category: '',
        quantity: '',
    };

    const [options, setOptions] = useState({
        suppliers: [],
        statuses: [],
    });

    const [optionsLoaded, setOptionsLoaded] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({...defaultProduct, ...product});

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const optionsData = await productEndpoints.getProductOptions();
                if (optionsData) {
                    setOptions({
                        suppliers: optionsData.supplier_options || [],
                        statuses: optionsData.status_options || [],
                    });
                    setOptionsLoaded(true);
                }
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };

        if (!optionsLoaded) {
            fetchOptions();
        }
    }, [optionsLoaded]);

    const handleFieldChange = (name, value) => {
        setCurrentProduct((prevProduct) => ({...prevProduct, [name]: value}));
        onChange({...currentProduct, [name]: value});
    };

    return (
        <>
            {form_field('images', 'Images', 'image', currentProduct.images, handleFieldChange)}
            {form_field('name', 'Name', 'text', currentProduct.name, handleFieldChange)}
            {form_field('description', 'Description', 'textarea', currentProduct.description, handleFieldChange)}
            {form_field('price', 'Price', 'number', currentProduct.price, handleFieldChange)}
            {form_field('supplier', 'Supplier', 'select', currentProduct.supplier, (event) => handleFieldChange('supplier', event.target.value), {options: options.suppliers})}
            {form_field('status', 'Status', 'select', currentProduct.status, (event) => handleFieldChange('status', event.target.value), {options: options.statuses})}
            {form_field('brand', 'Brand', 'text', currentProduct.brand, handleFieldChange)}
            {form_field('category', 'Category', 'text', currentProduct.category, handleFieldChange)}
            {form_field('quantity', 'Quantity', 'number', currentProduct.quantity, handleFieldChange)}
        </>
    );
};

export default ProductFormFields;
