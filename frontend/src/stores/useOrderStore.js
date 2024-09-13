import { create } from 'zustand';
import axios from '../lib/axios';
import toaster from 'react-hot-toast';


export const useOrderStore = create((set, get) => ({
    myOrders: [],
    allOrders: [],
    order: null,
    
    loading: false,


    fetchMyOrders: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/orders');
            set({ myOrders: res.data.orders });
            set({ loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchOrders' });
        }
    },

    //for admin
    fetchAllOrders: async () => {
        set({ loading: true });
        try {
            const res = await axios.get('/orders/all');
            set({ allOrders: res.data.orders });
            set({ loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchOrders' });
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const res = await axios.delete(`/orders/${orderId}`);
            const neworder = get().allOrders.filter((order) => order._id !== orderId);
            set({ allOrders: neworder });
            toaster.success(res.data.message);
        } catch (error) {
            toaster.error(error.response.data.message || 'No response from Server', { id: 'deleteOrder' });
        }
    },

    changeOrderStatus: async (orderId, status) => {
        try {
            await axios.put(`/orders/${orderId}` , { status });
            
            if (status === 'cancelled') {
                const neworder = get().myOrders.map((order) => {
                    if (order._id === orderId) {
                        return { ...order, status: 'cancelled' };
                    } else {
                        return order;
                    }
                });
                toaster.success('Order Cancelled Successfully');
                set({ myOrders: neworder });
            }
            else {
                const neworder = get().allOrders.map((order) => {
                    if (order._id === orderId) {
                        return { ...order, status };
                    } else {
                        return order;
                    }
                });
                toaster.success(`Order is set to ${status}`);
                set({ allOrders: neworder });
            }
            
        } catch (error) {
            console.log(error);
            
        }
    },
    
    fetchOrderDetails: async (orderId) => {
        set({ loading: true });
        try {
            const res = await axios.get(`/orders/${orderId}`);
            set({ order: res.data.order });
            set({ loading: false });

        } catch (error) {
            set({ loading: false });
            toaster.error(error.response.data.message || 'No response from Server', { id: 'fetchOrderDetails' });
        }
    },



}))