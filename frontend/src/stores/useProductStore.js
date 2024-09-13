import { create } from 'zustand';
import axios from '../lib/axios';
import toaster from 'react-hot-toast';

export const useProductStore = create((set) => ({
    products: [],
    featuredProducts: [],
    loading: false,
    checkingAuth: true,
    setProducts: (products) => set({ products }),

    createProduct: async ({ name, price, description, image, countInStock, category }) => {
        set({ loading: true });
        try {
            const res = await axios.post('/products/createProduct', { name, price, description, image, countInStock, category, });
            if (!res) {
                throw new Error;
            }

            set((preState) => ({
                products: [...preState.products, res.data.product],
                loading: false,
            }));

            toaster.success(res.data.message, { id: 'createProduct' });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'createProduct' });
        }
    },

    fetchAllProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/products');
            set({ products: res.data.products, loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchAllProducts' });
        }
    },

    fetchFeaturedProducts: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/products/featured');
            set({ featuredProducts: res.data.featuredProducts, loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchFeaturedProducts' });
        }
    },

    deleteProduct: async (productId) => {
        set({ loading: true });
        try {
            const res = await axios.delete(`/products/${productId}`);
            if (!res) {
                throw new Error;
            }

            set((preProducts) => ({
                products: preProducts.products.filter((product) => {
                    if(product._id !== productId) {
                        return product;
                    }
                }),
            
                loading: false,
            }));
            toaster.success(res.data.message || 'Product Deleted', { id: 'deleteProduct' });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'deleteProduct' });
        }
    },

    fetchProductByCategory: async (category) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/products/category/${category}`);
            if (!res) {
                throw new Error;
            }
            set({ products: res.data.products, loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchProductByCategory' });
        }
     },

    toggleFeatured: async (productId) => { 
        set({ loading: true });
        try {
            const res = await axios.put(`/products/toggleFeatured/${productId}`);
            if (!res) {
                throw new Error;
            }
           
            set((preProducts) => ({
                products: preProducts.products.map((product) => {
                    if (product._id === productId) {
                        return { ...product, isFeatured: res.data.product.isFeatured };
                    }
                    return product;
                }),
                loading: false,
            }));
            toaster.success(`${res.data.product.name} is ${res.data.product.isFeatured ? 'now Featured': 'removed from Featured'}`, { id: 'toggleFeatured' });
            
        } catch (error) {
            toaster.error(error.response.data.message || 'No response from Server', { id: 'toggleFeatured' });
        }
    },

}));
