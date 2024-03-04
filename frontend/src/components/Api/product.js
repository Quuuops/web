import Api from './api';

const api = Api()

const productEndpoints = {
    getProduct: async (productId) => {
        try {
            return await api.get(`/product/${productId}/`);
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    getAllProducts: async () => {
        try {
            return await api.get('/product/');
        } catch (error) {
            console.error('Error fetching all products:', error);
            throw error;
        }
    },

    getProductOptions: async () => {
        try {
            return await api.get('/product/options/');
        } catch (error) {
            console.error('Error fetching product options:', error);
            throw error;
        }
    },

    deleteProduct: async (productId) => {
        try {
            return await api.delete(`/product/${productId}/`);
        } catch (error) {
            console.error('Error delete product:', error);
            throw error;
        }
    },

    createProduct: async (productId) => {
        try {
            return await api.delete(`/product/${productId}/`);
        } catch (error) {
            console.error('Error create product:', error);
            throw error;
        }
    },
};

export default productEndpoints;
